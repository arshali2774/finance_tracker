-- Finance Tracker Supabase schema
-- Run in Supabase SQL Editor. Includes dummy single-user setup and RLS.
-- When enabling Supabase Auth later, follow the notes at the bottom.

-- ================================================================
-- 0) Extensions and helper for dummy user
-- ================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') THEN
    CREATE EXTENSION pgcrypto;
  END IF;
END$$;

-- Dummy single-user UUID (matches NEXT_PUBLIC_DUMMY_USER_ID).
-- Replace this UUID everywhere if you choose a different dummy user.
CREATE OR REPLACE FUNCTION public.current_dummy_user_id()
RETURNS uuid AS $$
  SELECT '550e8400-e29b-41d4-a716-446655440000'::uuid;
$$ LANGUAGE sql IMMUTABLE;

-- ================================================================
-- 1) Tables
-- ================================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid, -- NULL = system category
  name text NOT NULL,
  type text NOT NULL DEFAULT 'both' CHECK (type IN ('expense','wishlist','both')),
  icon text,
  color text,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.monthly_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  year_month date NOT NULL,
  salary_amount numeric(12,2),
  salary_credited_date date,
  savings_amount numeric(12,2) DEFAULT 0,
  total_fixed_expenses numeric(12,2) DEFAULT 0,
  fixed_expense_details jsonb,  -- [{type, ref_id, name, amount, billing_day, cadence?}]
  disposable_income numeric(12,2) DEFAULT 0,
  remaining_balance numeric(12,2) DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT monthly_records_user_month_unique UNIQUE (user_id, year_month)
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  amount numeric(10,2) NOT NULL,
  cadence text NOT NULL CHECK (cadence IN ('monthly','quarterly','annually')),
  billing_day int CHECK (billing_day BETWEEN 1 AND 31),
  start_date date NOT NULL,
  next_due_date date,
  last_paid_on date,
  end_date date,
  bank text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','not_started','expiring','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.emis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  emi_amount numeric(10,2) NOT NULL,
  total_amount numeric(12,2),
  down_payment numeric(10,2),
  total_payments int NOT NULL,
  payments_made int NOT NULL DEFAULT 0,
  start_date date NOT NULL,
  end_date date NOT NULL,
  billing_day int CHECK (billing_day BETWEEN 1 AND 31),
  next_due_date date,
  last_paid_on date,
  bank text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','not_started','expired')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.savings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  monthly_amount numeric(10,2) NOT NULL,
  source_bank text,
  destination_bank text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','not_started','pausing','paused','resuming','completed')),
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  target_months int,
  transfers_made int NOT NULL DEFAULT 0,
  last_transferred_on date,
  pause_requested_on date,
  resume_requested_on date,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create wishlist first (without expense_id FK to avoid circular dependency)
CREATE TABLE IF NOT EXISTS public.wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  estimated_amount numeric(10,2),
  category_id uuid REFERENCES public.categories(id),
  priority text NOT NULL DEFAULT 'want' CHECK (priority IN ('need','want','someday')),
  url text,
  notes text,
  is_purchased boolean NOT NULL DEFAULT false,
  expense_id uuid, -- FK added after daily_expenses exists
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.daily_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  year_month date NOT NULL,
  expense_date date NOT NULL,
  category_id uuid REFERENCES public.categories(id),
  description text,
  amount numeric(10,2) NOT NULL,
  wishlist_id uuid REFERENCES public.wishlist(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Now add the FK from wishlist.expense_id to daily_expenses.id
ALTER TABLE public.wishlist
  DROP CONSTRAINT IF EXISTS wishlist_expense_id_fkey,
  ADD CONSTRAINT wishlist_expense_id_fkey FOREIGN KEY (expense_id) REFERENCES public.daily_expenses(id);

CREATE TABLE IF NOT EXISTS public.payment_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (
    type IN ('subscription','emi','savings_transfer','savings_paused','savings_resumed')
  ),
  ref_id uuid NOT NULL,
  amount numeric(10,2) NOT NULL,
  occurred_on date NOT NULL,
  meta jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.archive (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  entity_type text NOT NULL CHECK (entity_type IN ('subscription','emi','savings')),
  entity_id uuid NOT NULL,
  entity_data jsonb NOT NULL,
  reason text NOT NULL CHECK (reason IN ('cancelled','completed','expired','paused')),
  archived_at timestamptz NOT NULL DEFAULT now()
);

-- ================================================================
-- 1b) Atomic operations
-- ================================================================

-- Adds a wishlist item to daily expenses and updates wishlist + monthly balance
-- atomically (all-or-nothing) in a single transaction.
--
-- Notes:
-- - Uses current_dummy_user_id() to match the project's current single-user setup.
-- - If the item was already converted earlier, returns the existing expense_id
--   without double-deducting the monthly remaining_balance.
CREATE OR REPLACE FUNCTION public.add_wishlist_item_to_expenses(
  p_wishlist_id uuid,
  p_expense_date date DEFAULT CURRENT_DATE
)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  w record;
  inserted_expense_id uuid;
  ym date;
BEGIN
  SELECT *
    INTO w
    FROM public.wishlist
   WHERE id = p_wishlist_id
     AND user_id = current_dummy_user_id()
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Wishlist item not found';
  END IF;

  -- Idempotency: if already converted, return the existing expense_id.
  IF w.is_purchased IS TRUE AND w.expense_id IS NOT NULL THEN
    RETURN w.expense_id;
  END IF;

  IF w.estimated_amount IS NULL OR w.estimated_amount <= 0 THEN
    RAISE EXCEPTION 'Estimated amount must be set to add as expense';
  END IF;

  ym := date_trunc('month', p_expense_date)::date;

  INSERT INTO public.daily_expenses (
    user_id,
    year_month,
    expense_date,
    category_id,
    description,
    amount,
    wishlist_id
  )
  VALUES (
    current_dummy_user_id(),
    ym,
    p_expense_date,
    w.category_id,
    w.name,
    w.estimated_amount,
    w.id
  )
  RETURNING id INTO inserted_expense_id;

  UPDATE public.wishlist
     SET is_purchased = TRUE,
         expense_id = inserted_expense_id
   WHERE id = w.id
     AND user_id = current_dummy_user_id();

  -- remaining_balance = remaining_balance - amount
  INSERT INTO public.monthly_records (
    user_id,
    year_month,
    salary_amount,
    savings_amount,
    total_fixed_expenses,
    disposable_income,
    remaining_balance
  )
  VALUES (
    current_dummy_user_id(),
    ym,
    0,
    0,
    0,
    0,
    0 - w.estimated_amount
  )
  ON CONFLICT (user_id, year_month)
  DO UPDATE
    SET remaining_balance = COALESCE(public.monthly_records.remaining_balance, 0)
                        + EXCLUDED.remaining_balance;

  RETURN inserted_expense_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.add_wishlist_item_to_expenses(uuid, date)
  TO anon, authenticated;

-- ================================================================
-- 2) Indexes and uniqueness
-- ================================================================
-- Unique category name per user (system categories share NULL user_id bucket)
CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_user_name_unique
  ON public.categories ((COALESCE(user_id, '00000000-0000-0000-0000-000000000000'::uuid)), lower(name));

CREATE INDEX IF NOT EXISTS idx_monthly_records_user_month ON public.monthly_records(user_id, year_month);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_emis_user ON public.emis(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_user ON public.savings(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_expenses_user_date ON public.daily_expenses(user_id, expense_date);
CREATE INDEX IF NOT EXISTS idx_payment_logs_user_occurred ON public.payment_logs(user_id, occurred_on);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_user ON public.categories(user_id);

-- ================================================================
-- 3) Seed system categories
-- ================================================================
INSERT INTO public.categories (user_id, name, type, is_system)
VALUES
  (NULL, 'food', 'both', true),
  (NULL, 'shopping', 'both', true),
  (NULL, 'travel', 'both', true),
  (NULL, 'skincare', 'both', true),
  (NULL, 'haircare', 'both', true),
  (NULL, 'electronics', 'both', true),
  (NULL, 'subscriptions', 'both', true),
  (NULL, 'utilities', 'both', true)
ON CONFLICT DO NOTHING;

-- ================================================================
-- 4) Enable RLS
-- ================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- 5) Temporary single-user policies (dummy UUID)
--    When enabling auth, replace current_dummy_user_id() with auth.uid()
-- ================================================================

-- Categories: allow reading system categories or own; writes only own non-system
CREATE POLICY categories_select_self_or_system ON public.categories
  FOR SELECT USING (user_id IS NULL OR user_id = current_dummy_user_id());
CREATE POLICY categories_insert_self ON public.categories
  FOR INSERT WITH CHECK (user_id = current_dummy_user_id());
CREATE POLICY categories_update_self ON public.categories
  FOR UPDATE USING (user_id = current_dummy_user_id() AND NOT is_system);
CREATE POLICY categories_delete_self ON public.categories
  FOR DELETE USING (user_id = current_dummy_user_id() AND NOT is_system);

-- Apply standard self-only policies to user-owned tables
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'monthly_records','subscriptions','emis','savings','daily_expenses','payment_logs','archive','wishlist'
  ]) LOOP
    EXECUTE format(
      'CREATE POLICY %I_select_self ON public.%I FOR SELECT USING (user_id = current_dummy_user_id());',
      tbl, tbl
    );
    EXECUTE format(
      'CREATE POLICY %I_insert_self ON public.%I FOR INSERT WITH CHECK (user_id = current_dummy_user_id());',
      tbl, tbl
    );
    EXECUTE format(
      'CREATE POLICY %I_update_self ON public.%I FOR UPDATE USING (user_id = current_dummy_user_id());',
      tbl, tbl
    );
    EXECUTE format(
      'CREATE POLICY %I_delete_self ON public.%I FOR DELETE USING (user_id = current_dummy_user_id());',
      tbl, tbl
    );
  END LOOP;
END$$;

-- ================================================================
-- Notes for switching to real auth later
-- ------------------------------------------------
-- 1) Replace function current_dummy_user_id() usages with auth.uid() in all policies.
-- 2) Drop the helper function if no longer needed: DROP FUNCTION current_dummy_user_id;
-- 3) Ensure your app sends the Supabase Auth JWT so RLS can match auth.uid().
-- ================================================================
