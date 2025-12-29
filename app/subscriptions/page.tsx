"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import {
  addMonths,
  addYears,
  format,
  getDaysInMonth,
  subDays,
  parseISO,
} from "date-fns";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DUMMY_USER_ID } from "@/lib/constants";
import { toast } from "sonner";

const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptionsPage($userId: UUID!) {
    subscriptionsCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: [{ status: AscNullsLast }, { created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          amount
          cadence
          billing_day
          start_date
          next_due_date
          last_paid_on
          end_date
          bank
          status
          created_at
        }
      }
    }
  }
`;

const INSERT_SUBSCRIPTION = gql`
  mutation InsertSubscriptionPage($input: subscriptionsInsertInput!) {
    insertIntosubscriptionsCollection(objects: [$input]) {
      records {
        id
        name
        status
        next_due_date
        last_paid_on
        end_date
        created_at
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscriptionPage(
    $id: UUID!
    $userId: UUID!
    $set: subscriptionsUpdateInput!
  ) {
    updatesubscriptionsCollection(
      set: $set
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
        status
        next_due_date
        last_paid_on
        end_date
      }
    }
  }
`;

const DELETE_SUBSCRIPTION = gql`
  mutation DeleteSubscription($id: UUID!, $userId: UUID!) {
    deleteFromsubscriptionsCollection(
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const INSERT_ARCHIVE = gql`
  mutation InsertArchiveSubscription($input: archiveInsertInput!) {
    insertIntoarchiveCollection(objects: [$input]) {
      records {
        id
      }
    }
  }
`;

type FormState = {
  name: string;
  amount: string;
  cadence: "monthly" | "quarterly" | "annually";
  billingDay: string;
  startDate: string;
  bank: string;
};

const initialForm: FormState = {
  name: "",
  amount: "",
  cadence: "monthly",
  billingDay: "1",
  startDate: "",
  bank: "",
};

const formatFullDate = (value?: string | null) =>
  value ? format(new Date(value), "dd MMMM, yyyy") : "—";

const nextCadenceDate = (date: Date, cadence: FormState["cadence"]): Date => {
  if (cadence === "quarterly") return addMonths(date, 3);
  if (cadence === "annually") return addYears(date, 1);
  return addMonths(date, 1);
};

const computeNextDueDate = (
  startDate?: string | null,
  billingDay?: number | null,
  cadence: FormState["cadence"] = "monthly",
  fromDate: Date = new Date()
): string | null => {
  if (!startDate) return null;
  const billDay = billingDay && billingDay > 0 ? billingDay : 1;
  const start = new Date(startDate);
  const anchor = start > fromDate ? start : fromDate;

  const makeCandidate = (base: Date) => {
    const days = getDaysInMonth(base);
    const day = Math.min(billDay, days);
    return new Date(base.getFullYear(), base.getMonth(), day);
  };

  let candidate = makeCandidate(anchor);
  if (candidate < anchor) {
    candidate = makeCandidate(nextCadenceDate(anchor, cadence));
  }

  return format(candidate, "yyyy-MM-dd");
};

export default function SubscriptionsPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState | null>(null);
  const [confirming, setConfirming] = useState<{
    sub: any;
    action: "delete" | "cancel" | "archive";
  } | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [editFormError, setEditFormError] = useState<string>("");

  const { data, loading, error, refetch } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const [insertSubscription, { loading: saving }] =
    useMutation(INSERT_SUBSCRIPTION);
  const [updateSubscription, { loading: updating }] =
    useMutation(UPDATE_SUBSCRIPTION);
  const [deleteSubscription, { loading: deleting }] =
    useMutation(DELETE_SUBSCRIPTION);
  const [insertArchive, { loading: archiving }] = useMutation(INSERT_ARCHIVE);

  const subscriptions = useMemo(() => {
    return data?.subscriptionsCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const {
    activeSubscriptions,
    notStartedSubscriptions,
    expiringSubscriptions,
    cancelledSubscriptions,
  } = useMemo(() => {
    const today = new Date();
    const active: any[] = [];
    const notStarted: any[] = [];
    const expiring: any[] = [];
    const cancelled: any[] = [];

    subscriptions.forEach((s: any) => {
      if (s.status === "active") {
        if (s.start_date && new Date(s.start_date) > today) {
          notStarted.push(s);
        } else {
          active.push(s);
        }
        return;
      }

      if (s.status === "not_started") {
        notStarted.push(s);
        return;
      }

      if (s.status === "expiring") {
        expiring.push(s);
        return;
      }

      // cancelled or any other status
      cancelled.push(s);
    });

    return {
      activeSubscriptions: active,
      notStartedSubscriptions: notStarted,
      expiringSubscriptions: expiring,
      cancelledSubscriptions: cancelled,
    };
  }, [subscriptions]);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountTrim = form.amount.trim();
    const nameTrim = form.name.trim();
    const amountNumber = parseFloat(amountTrim);
    const billingDayNumber = parseInt(form.billingDay, 10);

    if (!nameTrim) {
      setFormError("Name is required.");
      return;
    }
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setFormError("Enter a valid amount greater than 0.");
      return;
    }
    if (
      Number.isNaN(billingDayNumber) ||
      billingDayNumber < 1 ||
      billingDayNumber > 28
    ) {
      setFormError("Billing day must be between 1 and 28.");
      return;
    }
    if (!form.startDate) {
      setFormError("Start date is required.");
      return;
    }

    setFormError("");

    const status =
      new Date(form.startDate) > new Date() ? "not_started" : "active";
    try {
      await insertSubscription({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            name: nameTrim,
            amount: amountTrim, // pg_graphql BigFloat expects string input
            cadence: form.cadence,
            billing_day: billingDayNumber,
            start_date: form.startDate,
            next_due_date: computeNextDueDate(
              form.startDate,
              billingDayNumber,
              form.cadence
            ),
            last_paid_on: null,
            end_date: null,
            bank: form.bank || null,
            status,
          },
        },
      });

      setForm(initialForm);
      refetch();
      pushToast({
        title: "Subscription added",
        description: `${nameTrim} for ₹${amountTrim}`,
        variant: "success",
      });
    } catch (err: any) {
      pushToast({
        title: "Add failed",
        description: err?.message ?? "Could not add subscription",
        variant: "error",
      });
    }
  };

  const startEdit = (sub: any) => {
    setEditingId(sub.id);
    setEditForm({
      name: sub.name,
      amount: sub.amount,
      cadence: sub.cadence,
      billingDay: String(sub.billing_day ?? "1"),
      startDate: sub.start_date ?? "",
      bank: sub.bank ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((prev) =>
        prev ? { ...prev, [field]: e.target.value } : prev
      );
    };

  const handleEditSave = async (sub: any) => {
    if (!editForm) return;
    const amountTrim = editForm.amount.trim();
    const nameTrim = editForm.name.trim();
    const amountNumber = parseFloat(amountTrim);
    const billingDayNumber = parseInt(editForm.billingDay, 10);

    if (!nameTrim) {
      setEditFormError("Name is required.");
      return;
    }
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setEditFormError("Enter a valid amount greater than 0.");
      return;
    }
    if (
      Number.isNaN(billingDayNumber) ||
      billingDayNumber < 1 ||
      billingDayNumber > 28
    ) {
      setEditFormError("Billing day must be between 1 and 28.");
      return;
    }
    if (!editForm.startDate) {
      setEditFormError("Start date is required.");
      return;
    }

    setEditFormError("");

    const isCancelled = sub.status === "cancelled";
    const status = isCancelled
      ? "cancelled"
      : new Date(editForm.startDate) > new Date()
      ? "not_started"
      : "active";

    try {
      await updateSubscription({
        variables: {
          id: sub.id,
          userId: DUMMY_USER_ID,
          set: {
            name: nameTrim,
            amount: amountTrim,
            cadence: editForm.cadence,
            billing_day: billingDayNumber,
            start_date: editForm.startDate,
            next_due_date: computeNextDueDate(
              editForm.startDate,
              billingDayNumber,
              editForm.cadence
            ),
            bank: editForm.bank || null,
            status,
          },
        },
      });

      cancelEdit();
      refetch();
      pushToast({ title: "Subscription updated", variant: "success" });
    } catch (err: any) {
      pushToast({
        title: "Update failed",
        description: err?.message ?? "Could not update subscription",
        variant: "error",
      });
    }
  };

  const handleDeleteClick = (sub: any) =>
    setConfirming({ sub, action: "delete" });

  const handleCancelClick = (sub: any) =>
    setConfirming({ sub, action: "cancel" });

  const handleArchiveClick = (sub: any) =>
    setConfirming({ sub, action: "archive" });

  const handleConfirm = async () => {
    if (!confirming) return;
    const { sub, action } = confirming;
    setConfirming(null);

    if (action === "delete") {
      await deleteSubscription({
        variables: { id: sub.id, userId: DUMMY_USER_ID },
      });

      refetch();
      pushToast({
        title: "Subscription deleted",
        description: sub.name,
        variant: "success",
      });
      return;
    }

    if (action === "archive") {
      // Archive: store full record, then delete original
      const entityData = {
        id: sub.id,
        name: sub.name,
        amount: sub.amount,
        cadence: sub.cadence,
        billing_day: sub.billing_day,
        start_date: sub.start_date,
        end_date: sub.end_date,
        next_due_date: sub.next_due_date,
        last_paid_on: sub.last_paid_on,
        bank: sub.bank,
        status: sub.status,
        created_at: sub.created_at,
      };

      await insertArchive({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            entity_type: "subscription",
            entity_id: sub.id,
            entity_data: entityData,
            reason: "cancelled",
          },
        },
      });

      await deleteSubscription({
        variables: { id: sub.id, userId: DUMMY_USER_ID },
      });

      refetch();
      pushToast({
        title: "Subscription archived",
        description: sub.name,
        variant: "success",
      });
      return;
    }

    const currentDue =
      sub.next_due_date ??
      computeNextDueDate(sub.start_date, sub.billing_day, sub.cadence);

    // For prepaid subscriptions: last payment already covers usage until next_due_date
    // So end_date = next_due_date - 1 day (service ends day before next billing)
    const endDate = format(subDays(parseISO(currentDue), 1), "yyyy-MM-dd");

    await updateSubscription({
      variables: {
        id: sub.id,
        userId: DUMMY_USER_ID,
        set: {
          status: "expiring",
          next_due_date: currentDue,
          end_date: endDate,
        },
      },
    });

    refetch();
    pushToast({
      title: "Subscription marked as expiring",
      description: `${sub.name} will be cancelled on ${formatFullDate(
        endDate
      )}`,
      variant: "success",
    });
  };

  const pushToast = (t: {
    title: string;
    description?: string;
    variant?: "success" | "error";
  }) => {
    if (t.variant === "error") {
      toast.error(t.title, { description: t.description });
      return;
    }
    toast.success(t.title, { description: t.description });
  };

  const deriveEndDate = (sub: any) => {
    if (sub.status === "active" || sub.status === "not_started") return null;
    if (sub.end_date) return new Date(sub.end_date);
    const nextDueRaw =
      sub.next_due_date ??
      computeNextDueDate(sub.start_date, sub.billing_day, sub.cadence);
    const nextDue = nextDueRaw ? new Date(nextDueRaw) : null;

    if (nextDue) return nextDue;
    return sub.start_date ? new Date(sub.start_date) : null;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Subscriptions</h1>
        <p className="text-sm text-muted-foreground">
          Active subscriptions deducted on the 1st of the applicable month.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium">Name</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Amount (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={handleChange("amount")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Cadence</span>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.cadence}
              onChange={handleChange("cadence")}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Billing Day (1-28)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              min={1}
              max={28}
              value={form.billingDay}
              onChange={handleChange("billingDay")}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Start Date</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="date"
              value={form.startDate}
              onChange={handleChange("startDate")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Bank (optional)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.bank}
              onChange={handleChange("bank")}
            />
          </label>
        </div>

        {formError && <div className="text-xs text-red-600">{formError}</div>}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Subscription"}
        </Button>
      </form>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active</h2>
          {loading && (
            <span className="text-sm text-muted-foreground">Loading...</span>
          )}
          {error && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {activeSubscriptions.map((sub: any) => (
            <div key={sub.id} className="rounded-lg border p-4 space-y-1">
              {editingId === sub.id && editForm ? (
                <div className="space-y-2">
                  <div className="grid gap-2 md:grid-cols-2">
                    <label className="space-y-1 md:col-span-2">
                      <span className="text-sm font-medium">Name</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.name}
                        onChange={handleEditChange("name")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Amount</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        step="0.01"
                        value={editForm.amount}
                        onChange={handleEditChange("amount")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Cadence</span>
                      <select
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.cadence}
                        onChange={handleEditChange("cadence")}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">
                        Billing Day (1-28)
                      </span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        min={1}
                        max={28}
                        value={editForm.billingDay}
                        onChange={handleEditChange("billingDay")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Start Date</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="date"
                        value={editForm.startDate}
                        onChange={handleEditChange("startDate")}
                      />
                    </label>
                    <label className="space-y-1 md:col-span-2">
                      <span className="text-sm font-medium">Bank</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.bank}
                        onChange={handleEditChange("bank")}
                      />
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEditSave(sub)}
                      disabled={updating}
                    >
                      {updating ? "Saving..." : "Save"}
                    </Button>
                  </div>
                  {editFormError && (
                    <div className="text-xs text-red-600">{editFormError}</div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{sub.name}</span>
                    <span className="text-sm uppercase text-muted-foreground">
                      {sub.cadence}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{sub.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Start: {formatFullDate(sub.start_date)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next due date:{" "}
                    {formatFullDate(
                      sub.next_due_date ??
                        computeNextDueDate(
                          sub.start_date,
                          sub.billing_day,
                          sub.cadence
                        )
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last paid on: {formatFullDate(sub.last_paid_on)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Bank: {sub.bank || "—"}
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(sub)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelClick(sub)}
                      disabled={updating}
                    >
                      {updating ? "Cancelling..." : "Cancel"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          {activeSubscriptions.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No subscriptions yet.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Not Started</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {notStartedSubscriptions.map((sub: any) => (
            <div key={sub.id} className="rounded-lg border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{sub.name}</span>
                <span className="text-sm uppercase text-muted-foreground">
                  {sub.cadence}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">₹{sub.amount}</div>
              <div className="text-xs text-muted-foreground">
                Starts: {formatFullDate(sub.start_date)}
              </div>
              <div className="text-xs text-muted-foreground">
                Next due date:{" "}
                {formatFullDate(
                  sub.next_due_date ??
                    computeNextDueDate(
                      sub.start_date,
                      sub.billing_day,
                      sub.cadence
                    )
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Bank: {sub.bank || "—"}
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(sub)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelClick(sub)}
                  disabled={updating}
                >
                  {updating ? "Cancelling..." : "Cancel"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(sub)}
                  disabled={deleting}
                >
                  {deleting ? "Removing..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
          {notStartedSubscriptions.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No upcoming subscriptions.
            </div>
          )}
        </div>
      </div>

      {/* Expiring Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Expiring</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {expiringSubscriptions.map((sub: any) => {
            const endDate = deriveEndDate(sub);
            return (
              <div
                key={sub.id}
                className="rounded-lg border border-yellow-500/50 p-4 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{sub.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-600">
                    Expiring
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{sub.amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  Start: {formatFullDate(sub.start_date)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Expires: {formatFullDate(endDate?.toISOString())}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last paid on: {formatFullDate(sub.last_paid_on)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Bank: {sub.bank || "—"}
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(sub)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
          {expiringSubscriptions.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No expiring subscriptions.
            </div>
          )}
        </div>
      </div>

      {/* Cancelled Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cancelled</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {cancelledSubscriptions.map((sub: any) => {
            const endDate = deriveEndDate(sub);
            return (
              <div key={sub.id} className="rounded-lg border p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{sub.name}</span>
                  <span className="text-sm uppercase text-muted-foreground">
                    {sub.cadence}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{sub.amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  Start: {formatFullDate(sub.start_date)}
                </div>
                <div className="text-xs text-muted-foreground">
                  End: {formatFullDate(endDate?.toISOString())}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last paid on: {formatFullDate(sub.last_paid_on)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Bank: {sub.bank || "—"}
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(sub)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArchiveClick(sub)}
                    disabled={archiving}
                  >
                    {archiving ? "Archiving..." : "Archive"}
                  </Button>
                </div>
              </div>
            );
          })}
          {cancelledSubscriptions.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No cancelled subscriptions.
            </div>
          )}
        </div>
      </div>

      {/* Delete/Cancel/Archive confirmation modal */}
      {confirming && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-lg bg-background border shadow-lg p-4 space-y-3">
            <div className="space-y-1">
              <div className="text-lg font-semibold">
                {confirming.action === "delete"
                  ? "Delete subscription?"
                  : confirming.action === "archive"
                  ? "Archive subscription?"
                  : "Cancel subscription?"}
              </div>
              <div className="text-sm text-muted-foreground">
                {confirming.sub.name} · ₹{confirming.sub.amount}
              </div>
              {confirming.action === "archive" && (
                <div className="text-xs text-muted-foreground">
                  This will preserve the subscription data for historical
                  reference.
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setConfirming(null)}>
                Cancel
              </Button>
              <Button
                variant={
                  confirming.action === "archive" ? "default" : "destructive"
                }
                onClick={handleConfirm}
                disabled={
                  confirming.action === "delete"
                    ? deleting
                    : confirming.action === "archive"
                    ? archiving
                    : updating
                }
              >
                {confirming.action === "delete"
                  ? deleting
                    ? "Deleting..."
                    : "Delete"
                  : confirming.action === "archive"
                  ? archiving
                    ? "Archiving..."
                    : "Archive"
                  : updating
                  ? "Cancelling..."
                  : "Confirm Cancel"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
