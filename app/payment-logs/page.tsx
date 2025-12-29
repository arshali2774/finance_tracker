"use client";

import { gql, useQuery } from "@apollo/client";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useMemo, useState } from "react";
import { DUMMY_USER_ID } from "@/lib/constants";

const GET_LOGS = gql`
  query GetPaymentLogsPage($userId: UUID!, $start: Date!, $end: Date!) {
    payment_logsCollection(
      filter: {
        user_id: { eq: $userId }
        occurred_on: { gte: $start, lte: $end }
      }
      orderBy: [{ occurred_on: AscNullsLast }, { created_at: AscNullsLast }]
    ) {
      edges {
        node {
          id
          type
          ref_id
          amount
          occurred_on
          meta
        }
      }
    }
    daily_expensesCollection(
      filter: {
        user_id: { eq: $userId }
        expense_date: { gte: $start, lte: $end }
      }
      orderBy: [{ expense_date: AscNullsLast }]
    ) {
      edges {
        node {
          id
          description
          amount
          expense_date
        }
      }
    }
  }
`;

type LogRow = {
  id: string;
  date: string;
  type: string;
  amount: number;
  label: string;
  source: "payment_log" | "expense";
};

export default function PaymentLogsPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(startOfMonth(new Date()), "yyyy-MM-dd")
  );

  const monthStart = useMemo(() => new Date(selectedMonth), [selectedMonth]);
  const monthEnd = useMemo(() => endOfMonth(monthStart), [monthStart]);

  const { data, loading, error, refetch } = useQuery(GET_LOGS, {
    variables: {
      userId: DUMMY_USER_ID,
      start: format(monthStart, "yyyy-MM-dd"),
      end: format(monthEnd, "yyyy-MM-dd"),
    },
    fetchPolicy: "cache-and-network",
  });

  const rows: LogRow[] = useMemo(() => {
    const logs =
      data?.payment_logsCollection?.edges?.map((e: any) => {
        // meta might be a JSON string or already parsed object
        let meta = e.node.meta;
        if (typeof meta === "string") {
          try {
            meta = JSON.parse(meta);
          } catch {
            meta = {};
          }
        }
        return {
          id: `log-${e.node.id}`,
          date: e.node.occurred_on,
          type: e.node.type,
          amount: parseFloat(e.node.amount),
          label: meta?.name ?? e.node.type,
          source: "payment_log" as const,
        };
      }) ?? [];

    const expenses =
      data?.daily_expensesCollection?.edges?.map((e: any) => ({
        id: `exp-${e.node.id}`,
        date: e.node.expense_date,
        type: "daily_expense",
        amount: parseFloat(e.node.amount),
        label: e.node.description ?? "Expense",
        source: "expense" as const,
      })) ?? [];

    return [...logs, ...expenses].sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Payment Logs</h1>
          <p className="text-sm text-muted-foreground">
            Shows auto-logged payment events (subscriptions, EMIs, savings) and
            daily expenses for the selected month.
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
              refetch({
                userId: DUMMY_USER_ID,
                start: format(new Date(normalized), "yyyy-MM-dd"),
                end: format(endOfMonth(new Date(normalized)), "yyyy-MM-dd"),
              });
            }}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="grid grid-cols-4 px-4 py-2 text-sm font-semibold">
          <span>Date</span>
          <span>Type</span>
          <span>Label</span>
          <span className="text-right">Amount</span>
        </div>
        {loading && (
          <div className="px-4 py-3 text-sm text-muted-foreground">
            Loading...
          </div>
        )}
        {error && (
          <div className="px-4 py-3 text-sm text-red-500">{error.message}</div>
        )}
        {!loading && rows.length === 0 && (
          <div className="px-4 py-3 text-sm text-muted-foreground">
            No logs for this month.
          </div>
        )}
        <div className="divide-y">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-4 px-4 py-2 text-sm items-center"
            >
              <span>{format(new Date(row.date), "dd MMM, yyyy")}</span>
              <span className="capitalize">{row.type.replace("_", " ")}</span>
              <span>{row.label}</span>
              <span className="text-right">₹{row.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Subscription/EMI payments and savings transfers are auto-logged by the
        daily cron job. Daily expenses use their actual expense dates.
      </div>
    </div>
  );
}
