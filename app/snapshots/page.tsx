"use client";

import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { DUMMY_USER_ID } from "@/lib/constants";

const GET_SNAPSHOTS = gql`
  query GetSnapshots($userId: UUID!) {
    monthly_recordsCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: [{ year_month: DescNullsLast }]
    ) {
      edges {
        node {
          id
          year_month
          created_at
          salary_amount
          total_fixed_expenses
          disposable_income
          remaining_balance
        }
      }
    }
  }
`;

const formatMonth = (value: string) => format(new Date(value), "MMMM yyyy");
const formatFullDate = (value: string) =>
  format(new Date(value), "dd MMMM, yyyy");

export default function SnapshotsPage() {
  const { data, loading, error } = useQuery(GET_SNAPSHOTS, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const records =
    data?.monthly_recordsCollection?.edges?.map((e: any) => e.node) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Monthly Snapshots</h1>
          <p className="text-sm text-muted-foreground">
            Persisted monthly records (salary, fixed, disposable, remaining) per
            cycle.
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-muted-foreground">Loading snapshots…</div>
      )}
      {error && <div className="text-sm text-red-500">{error.message}</div>}

      {!loading && !error && records.length === 0 && (
        <div className="text-sm text-muted-foreground">No snapshots yet.</div>
      )}

      {records.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Month</th>
                <th className="px-3 py-2 text-left font-semibold">Saved On</th>
                <th className="px-3 py-2 text-left font-semibold">Salary</th>
                <th className="px-3 py-2 text-left font-semibold">Fixed</th>
                <th className="px-3 py-2 text-left font-semibold">
                  Disposable
                </th>
                <th className="px-3 py-2 text-left font-semibold">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec: any) => (
                <tr key={rec.id} className="border-t">
                  <td className="px-3 py-2 font-medium">
                    {formatMonth(rec.year_month)}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {rec.created_at ? formatFullDate(rec.created_at) : "—"}
                  </td>
                  <td className="px-3 py-2">₹{rec.salary_amount ?? "—"}</td>
                  <td className="px-3 py-2">
                    ₹{rec.total_fixed_expenses ?? "—"}
                  </td>
                  <td className="px-3 py-2">₹{rec.disposable_income ?? "—"}</td>
                  <td className="px-3 py-2">₹{rec.remaining_balance ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
