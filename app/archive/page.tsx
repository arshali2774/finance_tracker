"use client";

import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DUMMY_USER_ID } from "@/lib/constants";

const GET_ARCHIVE = gql`
  query GetArchive($userId: UUID!) {
    archiveCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: [{ archived_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          entity_type
          entity_id
          entity_data
          reason
          archived_at
        }
      }
    }
  }
`;

type ArchiveRow = {
  id: string;
  entity_type: string;
  entity_id: string;
  entity_data: Record<string, any>;
  reason: string;
  archived_at: string;
};

const formatFullDate = (value: string) =>
  value ? format(new Date(value), "dd MMM yyyy") : "—";

const entityLabels: Record<string, string> = {
  subscription: "Subscription",
  emi: "EMI",
  savings: "Savings",
};

export default function ArchivePage() {
  const { data, loading, error, refetch } = useQuery(GET_ARCHIVE, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const rows: ArchiveRow[] =
    data?.archiveCollection?.edges?.map((e: any) => e.node) ?? [];

  const grouped = rows.reduce<Record<string, ArchiveRow[]>>((acc, row) => {
    const key = row.entity_type ?? "other";
    acc[key] = acc[key] ? [...acc[key], row] : [row];
    return acc;
  }, {});

  const renderSnapshot = (row: ArchiveRow) => {
    const payload = row.entity_data || {};
    if (row.entity_type === "subscription") {
      return `${payload.name ?? ""} • ₹${payload.amount ?? ""}`;
    }
    if (row.entity_type === "emi") {
      return `${payload.name ?? ""} • ₹${payload.emi_amount ?? ""}`;
    }
    if (row.entity_type === "savings") {
      return `${payload.name ?? ""} • ₹${payload.monthly_amount ?? ""}`;
    }
    return payload.name ?? "";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Archive</h1>
          <p className="text-sm text-muted-foreground">
            Read-only log of archived subscriptions, EMIs, and savings.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>

      {loading && (
        <div className="text-sm text-muted-foreground">Loading...</div>
      )}
      {error && <div className="text-sm text-red-500">{error.message}</div>}

      {rows.length === 0 && !loading ? (
        <div className="text-sm text-muted-foreground">
          Nothing archived yet.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([key, items]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {entityLabels[key] ?? key}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {items.length} item{items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">
                        {renderSnapshot(item)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatFullDate(item.archived_at)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reason: {item.reason}
                    </div>
                    <div className="rounded-md bg-muted px-3 py-2 text-xs overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words">
                        {JSON.stringify(item.entity_data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
