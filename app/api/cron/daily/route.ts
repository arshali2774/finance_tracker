import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addMonths, addQuarters, addYears, format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const DUMMY_USER_ID = "550e8400-e29b-41d4-a716-446655440000";
const IST_TIMEZONE = "Asia/Kolkata";

/**
 * Daily Cron Job - Runs at 0 18 * * * UTC (11:30 PM IST)
 *
 * 1. Flip not_started → active for subs/EMIs where start_date <= today
 * 2. Auto-pay active subs where next_due_date <= today
 * 3. Auto-pay active EMIs where next_due_date <= today && next_due_date <= end_date
 * 4. Flip expiring → cancelled for subs where end_date < today
 * 5. Flip active → expired for EMIs where end_date < today
 */
export async function GET(request: NextRequest) {
  // Verify cron secret in production
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  // Get today's date in IST
  const nowUtc = new Date();
  const nowIst = toZonedTime(nowUtc, IST_TIMEZONE);
  const today = format(nowIst, "yyyy-MM-dd");

  const results = {
    subscriptions: { activated: 0, paid: 0, cancelled: 0 },
    emis: { activated: 0, paid: 0, expired: 0 },
    errors: [] as string[],
  };

  try {
    // ========================================
    // SUBSCRIPTIONS
    // ========================================

    // 1. Flip not_started → active where start_date <= today
    const { data: notStartedSubs, error: notStartedSubsError } = await supabase
      .from("subscriptions")
      .select("id, name, start_date, billing_day, cadence")
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "not_started")
      .lte("start_date", today);

    if (notStartedSubsError) {
      results.errors.push(
        `Fetch not_started subs: ${notStartedSubsError.message}`
      );
    } else if (notStartedSubs && notStartedSubs.length > 0) {
      for (const sub of notStartedSubs) {
        const nextDueDate = computeNextDueDate(
          sub.start_date,
          sub.billing_day,
          sub.cadence,
          today
        );
        const { error } = await supabase
          .from("subscriptions")
          .update({ status: "active", next_due_date: nextDueDate })
          .eq("id", sub.id);

        if (error) {
          results.errors.push(`Activate sub ${sub.name}: ${error.message}`);
        } else {
          results.subscriptions.activated++;
        }
      }
    }

    // 2. Auto-pay active subs where next_due_date <= today
    const { data: dueSubs, error: dueSubsError } = await supabase
      .from("subscriptions")
      .select("id, name, amount, cadence, billing_day, next_due_date, end_date")
      .eq("user_id", DUMMY_USER_ID)
      .in("status", ["active", "expiring"])
      .lte("next_due_date", today);

    if (dueSubsError) {
      results.errors.push(`Fetch due subs: ${dueSubsError.message}`);
    } else if (dueSubs && dueSubs.length > 0) {
      for (const sub of dueSubs) {
        // Skip if end_date exists and next_due_date > end_date (shouldn't pay past end)
        if (sub.end_date && sub.next_due_date > sub.end_date) {
          continue;
        }

        const currentDue = sub.next_due_date;
        const nextDue = advanceDueDate(currentDue, sub.cadence);

        // Insert payment log
        const { error: logError } = await supabase.from("payment_logs").insert({
          user_id: DUMMY_USER_ID,
          type: "subscription",
          ref_id: sub.id,
          amount: sub.amount,
          occurred_on: currentDue,
          meta: { name: sub.name, cadence: sub.cadence },
        });

        if (logError) {
          results.errors.push(
            `Payment log sub ${sub.name}: ${logError.message}`
          );
          continue;
        }

        // Update subscription
        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({ last_paid_on: currentDue, next_due_date: nextDue })
          .eq("id", sub.id);

        if (updateError) {
          results.errors.push(`Update sub ${sub.name}: ${updateError.message}`);
        } else {
          results.subscriptions.paid++;
        }
      }
    }

    // 3. Flip expiring → cancelled where end_date < today
    const { data: expiringSubs, error: expiringSubsError } = await supabase
      .from("subscriptions")
      .select("id, name")
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "expiring")
      .lt("end_date", today);

    if (expiringSubsError) {
      results.errors.push(`Fetch expiring subs: ${expiringSubsError.message}`);
    } else if (expiringSubs && expiringSubs.length > 0) {
      for (const sub of expiringSubs) {
        const { error } = await supabase
          .from("subscriptions")
          .update({ status: "cancelled" })
          .eq("id", sub.id);

        if (error) {
          results.errors.push(`Cancel sub ${sub.name}: ${error.message}`);
        } else {
          results.subscriptions.cancelled++;
        }
      }
    }

    // ========================================
    // EMIs
    // ========================================

    // 4. Flip not_started → active where start_date <= today
    const { data: notStartedEmis, error: notStartedEmisError } = await supabase
      .from("emis")
      .select("id, name, start_date, billing_day")
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "not_started")
      .lte("start_date", today);

    if (notStartedEmisError) {
      results.errors.push(
        `Fetch not_started emis: ${notStartedEmisError.message}`
      );
    } else if (notStartedEmis && notStartedEmis.length > 0) {
      for (const emi of notStartedEmis) {
        const nextDueDate = computeNextDueDate(
          emi.start_date,
          emi.billing_day,
          "monthly",
          today
        );
        const { error } = await supabase
          .from("emis")
          .update({ status: "active", next_due_date: nextDueDate })
          .eq("id", emi.id);

        if (error) {
          results.errors.push(`Activate emi ${emi.name}: ${error.message}`);
        } else {
          results.emis.activated++;
        }
      }
    }

    // 5. Auto-pay active EMIs where next_due_date <= today
    const { data: dueEmis, error: dueEmisError } = await supabase
      .from("emis")
      .select(
        "id, name, emi_amount, billing_day, next_due_date, end_date, total_payments, payments_made"
      )
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "active")
      .lte("next_due_date", today);

    if (dueEmisError) {
      results.errors.push(`Fetch due emis: ${dueEmisError.message}`);
    } else if (dueEmis && dueEmis.length > 0) {
      for (const emi of dueEmis) {
        // Skip if all payments already made
        if (
          emi.total_payments &&
          (emi.payments_made ?? 0) >= emi.total_payments
        ) {
          continue;
        }

        const currentDue = emi.next_due_date;
        const nextDue = advanceDueDate(currentDue, "monthly");
        const newPaymentsMade = (emi.payments_made ?? 0) + 1;

        // Insert payment log
        const { error: logError } = await supabase.from("payment_logs").insert({
          user_id: DUMMY_USER_ID,
          type: "emi",
          ref_id: emi.id,
          amount: emi.emi_amount,
          occurred_on: currentDue,
          meta: { name: emi.name },
        });

        if (logError) {
          results.errors.push(
            `Payment log emi ${emi.name}: ${logError.message}`
          );
          continue;
        }

        // Check if this was the final payment
        const isComplete =
          emi.total_payments && newPaymentsMade >= emi.total_payments;

        // Update EMI
        const { error: updateError } = await supabase
          .from("emis")
          .update({
            last_paid_on: currentDue,
            next_due_date: nextDue,
            payments_made: newPaymentsMade,
            ...(isComplete ? { status: "expired" } : {}),
          })
          .eq("id", emi.id);

        if (updateError) {
          results.errors.push(`Update emi ${emi.name}: ${updateError.message}`);
        } else {
          results.emis.paid++;
          if (isComplete) {
            results.emis.expired++;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: nowIst.toISOString(),
      today,
      results,
    });
  } catch (error) {
    console.error("Daily cron error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Compute the next due date based on start_date and billing_day
 */
function computeNextDueDate(
  startDate: string,
  billingDay: number | null,
  cadence: string,
  today: string
): string {
  const start = parseISO(startDate);
  const todayDate = parseISO(today);
  const day = billingDay ?? start.getDate();

  // Start from the start_date's month
  let candidate = new Date(start.getFullYear(), start.getMonth(), day);

  // If candidate is before start_date, move to next cycle
  if (candidate < start) {
    candidate = advanceDate(candidate, cadence);
  }

  // Advance until candidate >= today
  while (candidate < todayDate) {
    candidate = advanceDate(candidate, cadence);
  }

  return format(candidate, "yyyy-MM-dd");
}

/**
 * Advance a due date by one cadence period
 */
function advanceDueDate(dueDate: string, cadence: string): string {
  const date = parseISO(dueDate);
  return format(advanceDate(date, cadence), "yyyy-MM-dd");
}

function advanceDate(date: Date, cadence: string): Date {
  switch (cadence) {
    case "quarterly":
      return addQuarters(date, 1);
    case "annually":
      return addYears(date, 1);
    default:
      return addMonths(date, 1);
  }
}
