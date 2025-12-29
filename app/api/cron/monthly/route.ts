import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { format, parseISO, startOfMonth, subMonths } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const DUMMY_USER_ID = "550e8400-e29b-41d4-a716-446655440000";
const IST_TIMEZONE = "Asia/Kolkata";

interface FixedExpenseItem {
  type: "subscription" | "emi" | "savings";
  ref_id: string;
  name: string;
  amount: number;
  billing_day?: number;
  cadence?: string;
}

/**
 * Monthly Cron Job - Runs at 0 18 1 * * UTC (1st of month, 11:30 PM IST)
 *
 * 1. Freeze previous month's total_fixed_expenses in monthly_records (if not already set)
 * 2. Insert savings_transfer payment_logs for active savings (occurred_on = 1st of month)
 * 3. Create current month's monthly_records if missing with calculated fixed expenses
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

  // Get current date in IST
  const nowUtc = new Date();
  const nowIst = toZonedTime(nowUtc, IST_TIMEZONE);
  const today = format(nowIst, "yyyy-MM-dd");

  // Current month's year_month (1st of current month)
  const currentMonthStart = startOfMonth(nowIst);
  const currentYearMonth = format(currentMonthStart, "yyyy-MM-dd");

  // Previous month's year_month
  const prevMonthStart = subMonths(currentMonthStart, 1);
  const prevYearMonth = format(prevMonthStart, "yyyy-MM-dd");

  const results = {
    prevMonthSnapshot: false,
    currentMonthCreated: false,
    savingsLogsInserted: 0,
    savingsStatusFlips: {
      notStartedToActive: 0,
      pausingToPaused: 0,
      resumingToActive: 0,
      activeToCompleted: 0,
    },
    errors: [] as string[],
  };

  try {
    // ========================================
    // 1. FREEZE PREVIOUS MONTH'S FIXED EXPENSES
    // ========================================
    const { data: prevRecord, error: prevRecordError } = await supabase
      .from("monthly_records")
      .select("id, total_fixed_expenses, fixed_expense_details")
      .eq("user_id", DUMMY_USER_ID)
      .eq("year_month", prevYearMonth)
      .single();

    if (prevRecordError && prevRecordError.code !== "PGRST116") {
      // PGRST116 = no rows found, which is fine
      results.errors.push(
        `Fetch prev month record: ${prevRecordError.message}`
      );
    }

    // If previous month record exists but doesn't have frozen fixed_expense_details, freeze it
    if (prevRecord && !prevRecord.fixed_expense_details) {
      const { total, details } = await calculateFixedExpenses(
        supabase,
        prevYearMonth
      );

      const { error: updateError } = await supabase
        .from("monthly_records")
        .update({
          total_fixed_expenses: total,
          fixed_expense_details: details,
        })
        .eq("id", prevRecord.id);

      if (updateError) {
        results.errors.push(`Freeze prev month: ${updateError.message}`);
      } else {
        results.prevMonthSnapshot = true;
      }
    }

    // ========================================
    // 2. SAVINGS STATUS FLIPS
    // ========================================

    // 2a. Flip not_started → active for savings where start_date <= today
    const { data: notStartedSavings, error: notStartedError } = await supabase
      .from("savings")
      .select("id, name, start_date")
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "not_started")
      .lte("start_date", today);

    if (notStartedError) {
      results.errors.push(
        `Fetch not_started savings: ${notStartedError.message}`
      );
    } else if (notStartedSavings && notStartedSavings.length > 0) {
      for (const saving of notStartedSavings) {
        const { error } = await supabase
          .from("savings")
          .update({ status: "active" })
          .eq("id", saving.id);

        if (error) {
          results.errors.push(
            `Activate saving ${saving.name}: ${error.message}`
          );
        } else {
          results.savingsStatusFlips.notStartedToActive++;
        }
      }
    }

    // 2b. Flip pausing → paused (and log)
    const { data: pausingSavings, error: pausingError } = await supabase
      .from("savings")
      .select("id, name")
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "pausing");

    if (pausingError) {
      results.errors.push(`Fetch pausing savings: ${pausingError.message}`);
    } else if (pausingSavings && pausingSavings.length > 0) {
      for (const saving of pausingSavings) {
        const { error: updateError } = await supabase
          .from("savings")
          .update({ status: "paused" })
          .eq("id", saving.id);

        if (updateError) {
          results.errors.push(
            `Pause saving ${saving.name}: ${updateError.message}`
          );
        } else {
          results.savingsStatusFlips.pausingToPaused++;

          // Log savings_paused
          await supabase.from("payment_logs").insert({
            user_id: DUMMY_USER_ID,
            type: "savings_paused",
            ref_id: saving.id,
            amount: 0,
            occurred_on: currentYearMonth,
            meta: {
              name: saving.name,
              paused_from: format(currentMonthStart, "yyyy-MM"),
            },
          });
        }
      }
    }

    // 2c. Flip resuming → active (and log)
    const { data: resumingSavings, error: resumingError } = await supabase
      .from("savings")
      .select("id, name")
      .eq("user_id", DUMMY_USER_ID)
      .eq("status", "resuming");

    if (resumingError) {
      results.errors.push(`Fetch resuming savings: ${resumingError.message}`);
    } else if (resumingSavings && resumingSavings.length > 0) {
      for (const saving of resumingSavings) {
        const { error: updateError } = await supabase
          .from("savings")
          .update({ status: "active" })
          .eq("id", saving.id);

        if (updateError) {
          results.errors.push(
            `Resume saving ${saving.name}: ${updateError.message}`
          );
        } else {
          results.savingsStatusFlips.resumingToActive++;

          // Log savings_resumed
          await supabase.from("payment_logs").insert({
            user_id: DUMMY_USER_ID,
            type: "savings_resumed",
            ref_id: saving.id,
            amount: 0,
            occurred_on: currentYearMonth,
            meta: {
              name: saving.name,
              resumed_from: format(currentMonthStart, "yyyy-MM"),
            },
          });
        }
      }
    }

    // ========================================
    // 3. INSERT SAVINGS TRANSFER LOGS & INCREMENT transfers_made
    // ========================================
    const { data: activeSavings, error: savingsError } = await supabase
      .from("savings")
      .select(
        "id, name, monthly_amount, source_bank, destination_bank, target_months, transfers_made"
      )
      .eq("user_id", DUMMY_USER_ID)
      .in("status", ["active", "pausing"]); // Include pausing - they still transfer this month

    if (savingsError) {
      results.errors.push(`Fetch savings: ${savingsError.message}`);
    } else if (activeSavings && activeSavings.length > 0) {
      // Check if we already inserted savings logs for this month (idempotency)
      const { data: existingLogs, error: existingLogsError } = await supabase
        .from("payment_logs")
        .select("ref_id")
        .eq("user_id", DUMMY_USER_ID)
        .eq("type", "savings_transfer")
        .eq("occurred_on", currentYearMonth);

      if (existingLogsError) {
        results.errors.push(
          `Check existing savings logs: ${existingLogsError.message}`
        );
      }

      const existingRefIds = new Set((existingLogs || []).map((l) => l.ref_id));

      for (const saving of activeSavings) {
        // Skip if already logged this month
        if (existingRefIds.has(saving.id)) {
          continue;
        }

        const newTransfersMade = (saving.transfers_made ?? 0) + 1;

        const { error: logError } = await supabase.from("payment_logs").insert({
          user_id: DUMMY_USER_ID,
          type: "savings_transfer",
          ref_id: saving.id,
          amount: saving.monthly_amount,
          occurred_on: currentYearMonth, // 1st of current month
          meta: {
            name: saving.name,
            source_bank: saving.source_bank,
            destination_bank: saving.destination_bank,
          },
        });

        if (logError) {
          results.errors.push(
            `Insert savings log ${saving.name}: ${logError.message}`
          );
          continue;
        }

        // Check if this completes the savings goal
        const isComplete =
          saving.target_months && newTransfersMade >= saving.target_months;

        // Update savings: increment transfers_made, set last_transferred_on, optionally complete
        const { error: updateError } = await supabase
          .from("savings")
          .update({
            transfers_made: newTransfersMade,
            last_transferred_on: currentYearMonth,
            ...(isComplete ? { status: "completed" } : {}),
          })
          .eq("id", saving.id);

        if (updateError) {
          results.errors.push(
            `Update saving ${saving.name}: ${updateError.message}`
          );
        } else {
          results.savingsLogsInserted++;
          if (isComplete) {
            results.savingsStatusFlips.activeToCompleted++;
          }
        }
      }
    }

    // ========================================
    // 4. CREATE CURRENT MONTH'S RECORD
    // ========================================
    const { data: currentRecord, error: currentRecordError } = await supabase
      .from("monthly_records")
      .select("id")
      .eq("user_id", DUMMY_USER_ID)
      .eq("year_month", currentYearMonth)
      .single();

    if (currentRecordError && currentRecordError.code !== "PGRST116") {
      results.errors.push(
        `Fetch current month record: ${currentRecordError.message}`
      );
    }

    // If no record for current month, create one with calculated fixed expenses
    if (!currentRecord) {
      const { total, details } = await calculateFixedExpenses(
        supabase,
        currentYearMonth
      );

      const { error: insertError } = await supabase
        .from("monthly_records")
        .insert({
          user_id: DUMMY_USER_ID,
          year_month: currentYearMonth,
          total_fixed_expenses: total,
          fixed_expense_details: details,
          savings_amount: details
            .filter((d) => d.type === "savings")
            .reduce((sum, d) => sum + d.amount, 0),
        });

      if (insertError) {
        results.errors.push(
          `Create current month record: ${insertError.message}`
        );
      } else {
        results.currentMonthCreated = true;
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: nowIst.toISOString(),
      currentMonth: currentYearMonth,
      prevMonth: prevYearMonth,
      results,
    });
  } catch (error) {
    console.error("Monthly cron error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Calculate total fixed expenses for a given month.
 *
 * Definition: include an item if a payment is due in the month (next_due_date)
 * or was paid in the month (last_paid_on). This matches the dashboard's
 * "actual charge-month" model.
 */
async function calculateFixedExpenses(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  yearMonth: string
): Promise<{ total: number; details: FixedExpenseItem[] }> {
  const monthStart = startOfMonth(parseISO(yearMonth));
  const monthEnd = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    0
  );

  const isDateWithinMonth = (dateString: string | null | undefined) => {
    if (!dateString) return false;
    const d = parseISO(dateString);
    return d >= monthStart && d <= monthEnd;
  };

  const details: FixedExpenseItem[] = [];

  // ========================================
  // SUBSCRIPTIONS
  // ========================================
  const { data: subs } = await supabase
    .from("subscriptions")
    .select(
      "id, name, amount, cadence, billing_day, start_date, end_date, status, next_due_date, last_paid_on"
    )
    .eq("user_id", DUMMY_USER_ID);

  if (subs) {
    for (const sub of subs) {
      const startDate = sub.start_date ? parseISO(sub.start_date) : null;
      if (startDate && startDate > monthEnd) continue;

      const dueInMonth = isDateWithinMonth(sub.next_due_date);
      const paidInMonth = isDateWithinMonth(sub.last_paid_on);

      const cancelledBeforeNextDue =
        !!sub.end_date &&
        !!sub.next_due_date &&
        parseISO(sub.end_date) < parseISO(sub.next_due_date);

      const firstPaymentInMonth =
        !sub.last_paid_on &&
        !sub.next_due_date &&
        !!sub.start_date &&
        isDateWithinMonth(sub.start_date);

      const include =
        paidInMonth ||
        (dueInMonth && !cancelledBeforeNextDue) ||
        firstPaymentInMonth;

      if (!include) continue;

      details.push({
        type: "subscription",
        ref_id: sub.id,
        name: sub.name,
        amount: Number(sub.amount),
        billing_day: sub.billing_day,
        cadence: sub.cadence,
      });
    }
  }

  // ========================================
  // EMIs
  // ========================================
  const { data: emis } = await supabase
    .from("emis")
    .select(
      "id, name, emi_amount, billing_day, start_date, end_date, status, next_due_date, last_paid_on, total_payments, payments_made"
    )
    .eq("user_id", DUMMY_USER_ID);

  if (emis) {
    for (const emi of emis) {
      const startDate = emi.start_date ? parseISO(emi.start_date) : null;
      if (startDate && startDate > monthEnd) continue;

      const dueInMonth = isDateWithinMonth(emi.next_due_date);
      const paidInMonth = isDateWithinMonth(emi.last_paid_on);

      const totalPayments =
        emi.total_payments !== null && emi.total_payments !== undefined
          ? Number(emi.total_payments)
          : null;
      const paymentsMade =
        emi.payments_made !== null && emi.payments_made !== undefined
          ? Number(emi.payments_made)
          : 0;
      const isComplete =
        totalPayments !== null ? paymentsMade >= totalPayments : false;

      const include = paidInMonth || (dueInMonth && !isComplete);
      if (!include) continue;

      details.push({
        type: "emi",
        ref_id: emi.id,
        name: emi.name,
        amount: Number(emi.emi_amount),
        billing_day: emi.billing_day,
      });
    }
  }

  // ========================================
  // SAVINGS (active or pausing - they count until actually paused)
  // ========================================
  const { data: savings } = await supabase
    .from("savings")
    .select("id, name, monthly_amount, start_date")
    .eq("user_id", DUMMY_USER_ID)
    .in("status", ["active", "pausing"]);

  if (savings) {
    for (const saving of savings) {
      // Skip if saving starts after this month
      if (saving.start_date) {
        const startDate = parseISO(saving.start_date);
        if (startDate > monthStart) {
          continue;
        }
      }

      details.push({
        type: "savings",
        ref_id: saving.id,
        name: saving.name,
        amount: Number(saving.monthly_amount),
      });
    }
  }

  const total = details.reduce((sum, item) => sum + item.amount, 0);

  return { total, details };
}
