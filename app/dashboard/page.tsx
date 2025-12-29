"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { format, startOfMonth, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { GlareCard } from "@/components/ui/glare-card";
import { LoaderOne } from "@/components/ui/loader";
import { Button as StatefulButton } from "@/components/ui/stateful-button";
import { DUMMY_USER_ID } from "@/lib/constants";

const GET_DASHBOARD = gql`
  query GetDashboard($userId: UUID!, $yearMonth: Date!) {
    categoriesCollection(
      filter: {
        or: [{ user_id: { eq: $userId } }, { is_system: { eq: true } }]
      }
      orderBy: [{ is_system: DescNullsLast }, { name: AscNullsLast }]
    ) {
      edges {
        node {
          id
          name
          type
          is_system
        }
      }
    }
    monthly_recordsCollection(
      filter: { user_id: { eq: $userId }, year_month: { eq: $yearMonth } }
      first: 1
    ) {
      edges {
        node {
          id
          year_month
          salary_amount
          savings_amount
          total_fixed_expenses
          fixed_expense_details
          disposable_income
          remaining_balance
        }
      }
    }
    daily_expensesCollection(
      filter: { user_id: { eq: $userId }, year_month: { eq: $yearMonth } }
      orderBy: [{ expense_date: DescNullsLast }, { created_at: DescNullsLast }]
      first: 5
    ) {
      edges {
        node {
          id
          amount
          expense_date
          category_id
          description
        }
      }
    }
    subscriptionsCollection(filter: { user_id: { eq: $userId } }) {
      edges {
        node {
          id
          name
          amount
          cadence
          start_date
          billing_day
          next_due_date
          last_paid_on
          end_date
          status
        }
      }
    }
    emisCollection(filter: { user_id: { eq: $userId } }) {
      edges {
        node {
          id
          name
          emi_amount
          start_date
          billing_day
          next_due_date
          last_paid_on
          end_date
          total_payments
          payments_made
          status
        }
      }
    }
    savingsCollection(
      filter: {
        user_id: { eq: $userId }
        status: { in: ["active", "pausing"] }
      }
    ) {
      edges {
        node {
          id
          name
          monthly_amount
          start_date
        }
      }
    }
  }
`;

const INSERT_MONTH = gql`
  mutation InsertMonthlyRecord($input: monthly_recordsInsertInput!) {
    insertIntomonthly_recordsCollection(objects: [$input]) {
      records {
        id
        year_month
      }
    }
  }
`;

const UPDATE_MONTH = gql`
  mutation UpdateMonthlyRecord(
    $userId: UUID!
    $yearMonth: Date!
    $set: monthly_recordsUpdateInput!
  ) {
    updatemonthly_recordsCollection(
      set: $set
      filter: { user_id: { eq: $userId }, year_month: { eq: $yearMonth } }
    ) {
      records {
        id
        year_month
      }
    }
  }
`;

type FormState = {
  salaryAmount: string;
};

const initialForm: FormState = {
  salaryAmount: "",
};

const capitalizeWord = (value: string) =>
  value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const formatMonthLabel = (value: string) =>
  format(new Date(value), "MMMM yyyy");

const formatFullDate = (value: string) =>
  format(new Date(value), "dd MMMM, yyyy");

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(startOfMonth(new Date()), "yyyy-MM-dd")
  );
  const [form, setForm] = useState<FormState>(initialForm);

  const { data, error, loading, refetch } = useQuery(GET_DASHBOARD, {
    variables: { userId: DUMMY_USER_ID, yearMonth: selectedMonth },
    fetchPolicy: "cache-and-network",
  });

  const [insertMonth, { loading: savingInsert }] = useMutation(INSERT_MONTH);
  const [updateMonth, { loading: savingUpdate }] = useMutation(UPDATE_MONTH);

  const record = data?.monthly_recordsCollection?.edges?.[0]?.node;

  // Check if this is current month or past month
  const isCurrentMonth = useMemo(() => {
    const currentMonthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");
    return selectedMonth === currentMonthStart;
  }, [selectedMonth]);

  const isDateWithinMonth = (
    dateString: string | null | undefined,
    monthStart: Date,
    monthEnd: Date
  ) => {
    if (!dateString) return false;
    const d = parseISO(dateString);
    return d >= monthStart && d <= monthEnd;
  };

  // Calculate live fixed expenses for selected month.
  // Definition: include an item if a payment date falls within the month.
  const { subsTotal, emisTotal, savingsTotal } = useMemo(() => {
    const monthStart = parseISO(selectedMonth);
    const monthEnd = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      0
    );

    // Subscriptions: include if last_paid_on is in month OR next_due_date is in month and not cancelled before it
    const subsTotal =
      data?.subscriptionsCollection?.edges?.reduce((sum: number, e: any) => {
        const sub = e.node;
        const start = sub.start_date ? parseISO(sub.start_date) : null;
        if (start && start > monthEnd) return sum;

        const dueInMonth = isDateWithinMonth(
          sub.next_due_date,
          monthStart,
          monthEnd
        );
        const paidInMonth = isDateWithinMonth(
          sub.last_paid_on,
          monthStart,
          monthEnd
        );

        const cancelledBeforeNextDue =
          !!sub.end_date &&
          !!sub.next_due_date &&
          parseISO(sub.end_date) < parseISO(sub.next_due_date);

        // Fallback for very first payment if data doesn't have last_paid_on/next_due_date yet
        const firstPaymentInMonth =
          !sub.last_paid_on &&
          !sub.next_due_date &&
          !!sub.start_date &&
          isDateWithinMonth(sub.start_date, monthStart, monthEnd);

        const include =
          paidInMonth ||
          (dueInMonth && !cancelledBeforeNextDue) ||
          firstPaymentInMonth;

        return include ? sum + parseFloat(sub.amount) : sum;
      }, 0) ?? 0;

    // EMIs: include if last_paid_on is in month OR next_due_date is in month and not already complete
    const emisTotal =
      data?.emisCollection?.edges?.reduce((sum: number, e: any) => {
        const emi = e.node;
        const start = emi.start_date ? parseISO(emi.start_date) : null;
        if (start && start > monthEnd) return sum;

        const dueInMonth = isDateWithinMonth(
          emi.next_due_date,
          monthStart,
          monthEnd
        );
        const paidInMonth = isDateWithinMonth(
          emi.last_paid_on,
          monthStart,
          monthEnd
        );

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

        return include ? sum + parseFloat(emi.emi_amount) : sum;
      }, 0) ?? 0;

    // Savings: active + pausing, filtered by start_date
    const savingsTotal =
      data?.savingsCollection?.edges?.reduce((sum: number, e: any) => {
        const saving = e.node;
        const start = saving.start_date ? parseISO(saving.start_date) : null;

        // Skip if starts after this month
        if (start && start > monthEnd) return sum;

        return sum + parseFloat(saving.monthly_amount);
      }, 0) ?? 0;

    return { subsTotal, emisTotal, savingsTotal };
  }, [data, selectedMonth]);

  // For past months with frozen data, use the stored total; for current month, use live calc
  const totalFixed = useMemo(() => {
    // If past month and has frozen fixed_expense_details, use stored total
    if (!isCurrentMonth && record?.fixed_expense_details) {
      return parseFloat(record.total_fixed_expenses) || 0;
    }
    // Otherwise calculate live
    return subsTotal + emisTotal + savingsTotal;
  }, [isCurrentMonth, record, subsTotal, emisTotal, savingsTotal]);

  const categories = useMemo(() => {
    return data?.categoriesCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const categoryNames = useMemo(() => {
    const names: Record<string, string> = {};
    categories.forEach((cat: any) => {
      names[cat.id] = cat.name;
    });
    return names;
  }, [categories]);

  const expenses = useMemo(() => {
    return data?.daily_expensesCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const variableSpent = useMemo(() => {
    return expenses.reduce(
      (sum: number, ex: any) => sum + (parseFloat(ex.amount) || 0),
      0
    );
  }, [expenses]);

  const recentExpenses = useMemo(() => expenses.slice(0, 5), [expenses]);

  const categoryTotals = useMemo(() => {
    const acc: Record<string, number> = {};
    expenses.forEach((ex: any) => {
      const key = ex.category_id ?? "__none";
      const amt = parseFloat(ex.amount) || 0;
      acc[key] = (acc[key] ?? 0) + amt;
    });
    return Object.entries(acc)
      .map(([key, total]) => ({
        key,
        name: capitalizeWord(categoryNames[key] ?? "Uncategorized"),
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [expenses, categoryNames]);

  const salaryCurrent = form.salaryAmount || record?.salary_amount || "";
  const salaryNumber =
    salaryCurrent && !Number.isNaN(parseFloat(String(salaryCurrent)))
      ? parseFloat(String(salaryCurrent))
      : undefined;

  // Disposable = Salary - Fixed
  const disposableCalc =
    salaryNumber !== undefined ? salaryNumber - totalFixed : undefined;

  // For current month: always show live-calculated values
  // For past months: use stored/frozen values
  const disposableDisplay =
    isCurrentMonth || !record?.disposable_income
      ? disposableCalc
      : parseFloat(record.disposable_income);

  const remainingDisplay =
    isCurrentMonth || !record?.remaining_balance
      ? disposableCalc !== undefined
        ? disposableCalc - variableSpent
        : undefined
      : parseFloat(record.remaining_balance);

  const saveMonth = async () => {
    // Use form value if provided, otherwise use stored salary for recalc
    const salaryToSave =
      form.salaryAmount.trim() || record?.salary_amount || "";
    if (!salaryToSave) return;

    const salaryNum = parseFloat(salaryToSave);
    const disposable = salaryNum - totalFixed;
    const remaining = disposable - variableSpent;

    const payload = {
      user_id: DUMMY_USER_ID,
      year_month: selectedMonth,
      salary_amount: salaryToSave,
      savings_amount: savingsTotal.toString(),
      total_fixed_expenses: totalFixed.toString(),
      disposable_income: disposable.toString(),
      remaining_balance: remaining.toString(),
    };

    if (record?.id) {
      await updateMonth({
        variables: {
          userId: DUMMY_USER_ID,
          yearMonth: selectedMonth,
          set: payload,
        },
      });
    } else {
      await insertMonth({
        variables: { input: payload },
      });
    }

    setForm(initialForm);
    refetch();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveMonth();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Monthly Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Salary-cycle summary for {formatMonthLabel(selectedMonth)}. Fixed
            expenses are deducted on the 1st.
          </p>
        </div>
        <div className="space-y-1 space-x-2">
          <span className="text-sm font-medium">Month</span>
          <input
            className="rounded-md border px-3 py-2 bg-background text-foreground"
            type="month"
            value={selectedMonth.slice(0, 7)}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) return;
              const normalized = `${val}-01`;
              setSelectedMonth(normalized);
              setForm(initialForm);
            }}
          />
        </div>
      </div>

      {!isCurrentMonth && !record?.fixed_expense_details && (
        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
          This month has not been finalized. Fixed expenses are estimated from
          current records and may change if you edit past items.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium">Salary for this month</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.salaryAmount}
              onChange={(e) => setForm({ salaryAmount: e.target.value })}
              placeholder={record?.salary_amount ?? ""}
              required
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <StatefulButton
            type="button"
            disabled={savingInsert || savingUpdate}
            onClick={async (e) => {
              e.preventDefault();
              await saveMonth();
            }}
          >
            {record ? "Update Month" : "Save Month"}
          </StatefulButton>
          {(savingInsert || savingUpdate) && <LoaderOne />}
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlareCard containerClassName="h-full" className="h-full w-full">
          <div className="p-4 flex flex-col items-start gap-1">
            <span className="text-sm text-muted-foreground">Salary</span>
            <span className="text-2xl font-semibold">
              {salaryCurrent ? `₹${Number(salaryCurrent).toFixed(2)}` : "—"}
            </span>
          </div>
        </GlareCard>

        <GlareCard containerClassName="h-full" className="h-full w-full">
          <div className="p-4 flex flex-col items-start gap-1">
            <span className="text-sm text-muted-foreground">
              Fixed (upfront)
            </span>
            <span className="text-2xl font-semibold">
              ₹{totalFixed.toFixed(2)}
            </span>
          </div>
        </GlareCard>

        <GlareCard containerClassName="h-full" className="h-full w-full">
          <div className="p-4 flex flex-col items-start gap-1">
            <span className="text-sm text-muted-foreground">
              Variable spent
            </span>
            <span className="text-2xl font-semibold">
              ₹{variableSpent.toFixed(2)}
            </span>
          </div>
        </GlareCard>

        <GlareCard containerClassName="h-full" className="h-full w-full">
          <div className="p-4 flex flex-col items-start gap-1">
            <span className="text-sm text-muted-foreground">Remaining</span>
            <span className="text-2xl font-semibold">
              {remainingDisplay !== undefined
                ? `₹${remainingDisplay.toFixed(2)}`
                : "—"}
            </span>
          </div>
        </GlareCard>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top categories</h2>
          <span className="text-xs text-muted-foreground">
            {formatMonthLabel(selectedMonth)}
          </span>
        </div>
        {loading && categoryTotals.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <LoaderOne />
          </div>
        ) : categoryTotals.length === 0 ? (
          <div className="text-sm text-muted-foreground">No spend yet.</div>
        ) : (
          <div className="space-y-2">
            {categoryTotals.map((cat) => {
              const percent =
                variableSpent > 0 ? (cat.total / variableSpent) * 100 : 0;
              return (
                <div key={cat.key} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{cat.name}</span>
                    <span className="font-semibold">
                      ₹{cat.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {variableSpent > 0
                      ? `${percent.toFixed(1)}% of variable spend`
                      : "Awaiting expenses"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent 5 expenses</h2>
          <span className="text-xs text-muted-foreground">
            {formatMonthLabel(selectedMonth)}
          </span>
        </div>
        {loading && recentExpenses.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <LoaderOne />
          </div>
        ) : recentExpenses.length === 0 ? (
          <div className="text-sm text-muted-foreground">No expenses yet.</div>
        ) : (
          <div className="space-y-2">
            {recentExpenses.map((ex: any) => (
              <div
                key={ex.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {ex.description ?? "(No description)"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatFullDate(ex.expense_date)}
                  </span>
                </div>
                <span className="text-sm font-semibold">₹{ex.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
