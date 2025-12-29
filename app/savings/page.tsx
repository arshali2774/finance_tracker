"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { addMonths, format } from "date-fns";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DUMMY_USER_ID } from "@/lib/constants";
import { toast } from "sonner";

const GET_SAVINGS = gql`
  query GetSavings($userId: UUID!) {
    savingsCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: [{ status: AscNullsLast }, { created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          monthly_amount
          source_bank
          destination_bank
          status
          start_date
          end_date
          target_months
          transfers_made
          last_transferred_on
          pause_requested_on
          resume_requested_on
          created_at
        }
      }
    }
  }
`;

const INSERT_SAVINGS = gql`
  mutation InsertSavingsPage($input: savingsInsertInput!) {
    insertIntosavingsCollection(objects: [$input]) {
      records {
        id
        name
        status
        created_at
      }
    }
  }
`;

const UPDATE_SAVINGS = gql`
  mutation UpdateSavings(
    $id: UUID!
    $userId: UUID!
    $set: savingsUpdateInput!
  ) {
    updatesavingsCollection(
      set: $set
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const DELETE_SAVINGS = gql`
  mutation DeleteSavings($id: UUID!, $userId: UUID!) {
    deleteFromsavingsCollection(
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const INSERT_ARCHIVE = gql`
  mutation InsertArchiveSavings($input: archiveInsertInput!) {
    insertIntoarchiveCollection(objects: [$input]) {
      records {
        id
      }
    }
  }
`;

type FormState = {
  name: string;
  monthlyAmount: string;
  sourceBank: string;
  destinationBank: string;
  startDate: string;
  targetMonths: string;
};

const initialForm: FormState = {
  name: "",
  monthlyAmount: "",
  sourceBank: "",
  destinationBank: "",
  startDate: "",
  targetMonths: "",
};

const formatFullDate = (value?: string | null) =>
  value ? format(new Date(value), "dd MMMM, yyyy") : "—";

const getNextMonthName = () => {
  const next = addMonths(new Date(), 1);
  return format(next, "MMMM");
};

export default function SavingsPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState | null>(null);
  const [confirming, setConfirming] = useState<{
    savings: any;
    action: "delete" | "archive";
  } | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [editFormError, setEditFormError] = useState<string>("");

  const { data, loading, error, refetch } = useQuery(GET_SAVINGS, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const [insertSavings, { loading: saving }] = useMutation(INSERT_SAVINGS);
  const [updateSavings, { loading: updating }] = useMutation(UPDATE_SAVINGS);
  const [deleteSavings, { loading: deleting }] = useMutation(DELETE_SAVINGS);
  const [insertArchive, { loading: archiving }] = useMutation(INSERT_ARCHIVE);

  const savings = useMemo(() => {
    return data?.savingsCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const {
    activeSavings,
    notStartedSavings,
    pausingSavings,
    pausedSavings,
    resumingSavings,
    completedSavings,
  } = useMemo(() => {
    const today = new Date();
    const active: any[] = [];
    const notStarted: any[] = [];
    const pausing: any[] = [];
    const paused: any[] = [];
    const resuming: any[] = [];
    const completed: any[] = [];

    savings.forEach((s: any) => {
      if (s.status === "completed") {
        completed.push(s);
        return;
      }
      if (s.status === "paused") {
        paused.push(s);
        return;
      }
      if (s.status === "pausing") {
        pausing.push(s);
        return;
      }
      if (s.status === "resuming") {
        resuming.push(s);
        return;
      }
      if (s.status === "not_started") {
        notStarted.push(s);
        return;
      }
      if (s.status === "active") {
        if (s.start_date && new Date(s.start_date) > today) {
          notStarted.push(s);
        } else {
          active.push(s);
        }
        return;
      }
      active.push(s);
    });

    return {
      activeSavings: active,
      notStartedSavings: notStarted,
      pausingSavings: pausing,
      pausedSavings: paused,
      resumingSavings: resuming,
      completedSavings: completed,
    };
  }, [savings]);

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountTrim = form.monthlyAmount.trim();
    const nameTrim = form.name.trim();
    const amountNumber = parseFloat(amountTrim);
    if (!nameTrim) {
      setFormError("Name is required.");
      return;
    }
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setFormError("Enter a valid amount greater than 0.");
      return;
    }
    if (!form.startDate) {
      setFormError("Start date is required.");
      return;
    }

    const targetMonthsNum = form.targetMonths
      ? parseInt(form.targetMonths, 10)
      : null;
    if (
      form.targetMonths &&
      (Number.isNaN(targetMonthsNum) || targetMonthsNum! < 1)
    ) {
      setFormError("Target months must be at least 1 if provided.");
      return;
    }

    setFormError("");

    // Auto-calculate end_date if target_months is set
    let endDateStr: string | null = null;
    if (targetMonthsNum) {
      const startDateObj = new Date(form.startDate);
      const endDateObj = addMonths(startDateObj, targetMonthsNum - 1);
      endDateStr = format(endDateObj, "yyyy-MM-dd");
    }

    const status =
      new Date(form.startDate) > new Date() ? "not_started" : "active";

    try {
      await insertSavings({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            name: nameTrim,
            monthly_amount: amountTrim,
            source_bank: form.sourceBank || null,
            destination_bank: form.destinationBank || null,
            status,
            start_date: form.startDate,
            end_date: endDateStr,
            target_months: targetMonthsNum,
            transfers_made: 0,
          },
        },
      });

      setForm(initialForm);
      refetch();
      pushToast({
        title: "Savings added",
        description: nameTrim,
        variant: "success",
      });
    } catch (err: any) {
      pushToast({
        title: "Add failed",
        description: err?.message ?? "Could not add savings",
        variant: "error",
      });
    }
  };

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setEditForm({
      name: s.name,
      monthlyAmount: s.monthly_amount,
      sourceBank: s.source_bank ?? "",
      destinationBank: s.destination_bank ?? "",
      startDate: s.start_date ?? "",
      targetMonths: s.target_months ? String(s.target_months) : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditForm((prev) =>
        prev ? { ...prev, [field]: e.target.value } : prev
      );
    };

  const handleEditSave = async (s: any) => {
    if (!editForm) return;
    const amountTrim = editForm.monthlyAmount.trim();
    const nameTrim = editForm.name.trim();
    const amountNumber = parseFloat(amountTrim);
    if (!nameTrim) {
      setEditFormError("Name is required.");
      return;
    }
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setEditFormError("Enter a valid amount greater than 0.");
      return;
    }
    if (!editForm.startDate) {
      setEditFormError("Start date is required.");
      return;
    }

    const targetMonthsNum = editForm.targetMonths
      ? parseInt(editForm.targetMonths, 10)
      : null;
    if (
      editForm.targetMonths &&
      (Number.isNaN(targetMonthsNum) || targetMonthsNum! < 1)
    ) {
      setEditFormError("Target months must be at least 1 if provided.");
      return;
    }

    setEditFormError("");

    // Auto-calculate end_date if target_months is set
    let endDateStr: string | null = null;
    if (targetMonthsNum) {
      const startDateObj = new Date(editForm.startDate);
      const endDateObj = addMonths(startDateObj, targetMonthsNum - 1);
      endDateStr = format(endDateObj, "yyyy-MM-dd");
    }

    const status =
      s.status === "completed"
        ? "completed"
        : new Date(editForm.startDate) > new Date()
        ? "not_started"
        : "active";

    try {
      await updateSavings({
        variables: {
          id: s.id,
          userId: DUMMY_USER_ID,
          set: {
            name: nameTrim,
            monthly_amount: amountTrim,
            source_bank: editForm.sourceBank || null,
            destination_bank: editForm.destinationBank || null,
            start_date: editForm.startDate,
            end_date: endDateStr,
            target_months: targetMonthsNum,
            status,
          },
        },
      });

      cancelEdit();
      refetch();
      pushToast({ title: "Savings updated", variant: "success" });
    } catch (err: any) {
      pushToast({
        title: "Update failed",
        description: err?.message ?? "Could not update savings",
        variant: "error",
      });
    }
  };

  const handlePause = async (s: any) => {
    await updateSavings({
      variables: {
        id: s.id,
        userId: DUMMY_USER_ID,
        set: {
          status: "pausing",
          pause_requested_on: format(new Date(), "yyyy-MM-dd"),
        },
      },
    });
    refetch();
    pushToast({
      title: "Savings will be paused",
      description: `${s.name} will be paused from ${getNextMonthName()}`,
      variant: "success",
    });
  };

  const handleResume = async (s: any) => {
    await updateSavings({
      variables: {
        id: s.id,
        userId: DUMMY_USER_ID,
        set: {
          status: "resuming",
          resume_requested_on: format(new Date(), "yyyy-MM-dd"),
        },
      },
    });
    refetch();
    pushToast({
      title: "Savings will be resumed",
      description: `${s.name} will resume from ${getNextMonthName()}`,
      variant: "success",
    });
  };

  const handleDeleteClick = (s: any) =>
    setConfirming({ savings: s, action: "delete" });

  const handleArchiveClick = (s: any) =>
    setConfirming({ savings: s, action: "archive" });

  const handleConfirm = async () => {
    if (!confirming) return;
    const { savings: s, action } = confirming;
    setConfirming(null);

    if (action === "delete") {
      await deleteSavings({ variables: { id: s.id, userId: DUMMY_USER_ID } });
      refetch();
      pushToast({
        title: "Savings deleted",
        description: s.name,
        variant: "success",
      });
      return;
    }

    if (action === "archive") {
      // Archive: store full record, then delete original
      const entityData = {
        id: s.id,
        name: s.name,
        monthly_amount: s.monthly_amount,
        source_bank: s.source_bank,
        destination_bank: s.destination_bank,
        status: s.status,
        start_date: s.start_date,
        end_date: s.end_date,
        target_months: s.target_months,
        transfers_made: s.transfers_made,
        last_transferred_on: s.last_transferred_on,
        pause_requested_on: s.pause_requested_on,
        resume_requested_on: s.resume_requested_on,
        created_at: s.created_at,
      };

      // Determine reason based on status
      const reason = s.status === "paused" ? "paused" : "completed";

      await insertArchive({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            entity_type: "savings",
            entity_id: s.id,
            entity_data: entityData,
            reason,
          },
        },
      });

      await deleteSavings({ variables: { id: s.id, userId: DUMMY_USER_ID } });

      refetch();
      pushToast({
        title: "Savings archived",
        description: s.name,
        variant: "success",
      });
      return;
    }
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Savings</h1>
        <p className="text-sm text-muted-foreground">
          Monthly savings allocations are deducted first on the 1st.
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
            <span className="text-sm font-medium">Monthly Amount (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.monthlyAmount}
              onChange={handleChange("monthlyAmount")}
              required
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
            <span className="text-sm font-medium">
              Target Months (optional)
            </span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              min={1}
              value={form.targetMonths}
              onChange={handleChange("targetMonths")}
              placeholder="e.g. 12 for 1 year"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Source Bank</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.sourceBank}
              onChange={handleChange("sourceBank")}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Destination Bank</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.destinationBank}
              onChange={handleChange("destinationBank")}
            />
          </label>
        </div>

        {formError && <div className="text-xs text-red-600">{formError}</div>}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Savings"}
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
          {activeSavings.map((s: any) => (
            <div key={s.id} className="rounded-lg border p-4 space-y-1">
              {editingId === s.id && editForm ? (
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
                      <span className="text-sm font-medium">
                        Monthly Amount
                      </span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        step="0.01"
                        value={editForm.monthlyAmount}
                        onChange={handleEditChange("monthlyAmount")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Target Months</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        min={1}
                        value={editForm.targetMonths}
                        onChange={handleEditChange("targetMonths")}
                        placeholder="Optional"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Source Bank</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.sourceBank}
                        onChange={handleEditChange("sourceBank")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">
                        Destination Bank
                      </span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.destinationBank}
                        onChange={handleEditChange("destinationBank")}
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
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEditSave(s)}
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
                    <span className="font-semibold">{s.name}</span>
                    <div className="flex items-center gap-2">
                      {s.target_months && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {s.transfers_made ?? 0} of {s.target_months} months
                        </span>
                      )}
                      <span className="text-sm uppercase text-muted-foreground">
                        {s.status?.replace("_", " ") ?? "ACTIVE"}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{s.monthly_amount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    From {s.source_bank || "—"} to {s.destination_bank || "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Starts {formatFullDate(s.start_date)}
                    {s.end_date && <> • Ends {formatFullDate(s.end_date)}</>}
                  </div>
                  {s.last_transferred_on && (
                    <div className="text-xs text-muted-foreground">
                      Last transferred: {formatFullDate(s.last_transferred_on)}
                    </div>
                  )}
                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(s)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePause(s)}
                    >
                      Pause
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          {activeSavings.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No active savings.
            </div>
          )}
        </div>
      </div>

      {/* Not Started Savings */}
      {notStartedSavings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Not Started</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {notStartedSavings.map((s: any) => (
              <div key={s.id} className="rounded-lg border p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <div className="flex items-center gap-2">
                    {s.target_months && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        0 of {s.target_months} months
                      </span>
                    )}
                    <span className="text-sm uppercase text-muted-foreground">
                      NOT STARTED
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{s.monthly_amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  From {s.source_bank || "—"} to {s.destination_bank || "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Starts {formatFullDate(s.start_date)}
                  {s.end_date && <> • Ends {formatFullDate(s.end_date)}</>}
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(s)}
                    disabled={deleting}
                  >
                    {deleting ? "Removing..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pausing Savings */}
      {pausingSavings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Pausing</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {pausingSavings.map((s: any) => (
              <div key={s.id} className="rounded-lg border p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <div className="flex items-center gap-2">
                    {s.target_months && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {s.transfers_made ?? 0} of {s.target_months} months
                      </span>
                    )}
                    <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full">
                      Pausing from {getNextMonthName()}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{s.monthly_amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  From {s.source_bank || "—"} to {s.destination_bank || "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Starts {formatFullDate(s.start_date)}
                  {s.end_date && <> • Ends {formatFullDate(s.end_date)}</>}
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Pausing...
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resuming Savings */}
      {resumingSavings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Resuming</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {resumingSavings.map((s: any) => (
              <div key={s.id} className="rounded-lg border p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <div className="flex items-center gap-2">
                    {s.target_months && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {s.transfers_made ?? 0} of {s.target_months} months
                      </span>
                    )}
                    <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">
                      Resuming from {getNextMonthName()}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{s.monthly_amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  From {s.source_bank || "—"} to {s.destination_bank || "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Starts {formatFullDate(s.start_date)}
                  {s.end_date && <> • Ends {formatFullDate(s.end_date)}</>}
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Resuming...
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paused Savings */}
      {pausedSavings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Paused</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {pausedSavings.map((s: any) => (
              <div key={s.id} className="rounded-lg border p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <div className="flex items-center gap-2">
                    {s.target_months && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {s.transfers_made ?? 0} of {s.target_months} months
                      </span>
                    )}
                    <span className="text-sm uppercase text-muted-foreground">
                      PAUSED
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{s.monthly_amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  From {s.source_bank || "—"} to {s.destination_bank || "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Starts {formatFullDate(s.start_date)}
                  {s.end_date && <> • Ends {formatFullDate(s.end_date)}</>}
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResume(s)}
                  >
                    Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArchiveClick(s)}
                    disabled={archiving}
                  >
                    {archiving ? "Archiving..." : "Archive"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Savings */}
      {completedSavings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Completed</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {completedSavings.map((s: any) => (
              <div key={s.id} className="rounded-lg border p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <div className="flex items-center gap-2">
                    {s.target_months && (
                      <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                        {s.transfers_made ?? 0} of {s.target_months} months
                      </span>
                    )}
                    <span className="text-sm uppercase text-muted-foreground">
                      COMPLETED
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  ₹{s.monthly_amount}
                </div>
                <div className="text-xs text-muted-foreground">
                  From {s.source_bank || "—"} to {s.destination_bank || "—"}
                </div>
                <div className="text-xs text-muted-foreground">
                  Starts {formatFullDate(s.start_date)}
                  {s.end_date && <> • Ends {formatFullDate(s.end_date)}</>}
                </div>
                {s.last_transferred_on && (
                  <div className="text-xs text-muted-foreground">
                    Last transferred: {formatFullDate(s.last_transferred_on)}
                  </div>
                )}
                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArchiveClick(s)}
                    disabled={archiving}
                  >
                    {archiving ? "Archiving..." : "Archive"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete/Archive confirmation modal */}
      {confirming && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-lg bg-background border shadow-lg p-4 space-y-3">
            <div className="space-y-1">
              <div className="text-lg font-semibold">
                {confirming.action === "delete"
                  ? "Delete savings?"
                  : "Archive savings?"}
              </div>
              <div className="text-sm text-muted-foreground">
                {confirming.savings.name} · ₹{confirming.savings.monthly_amount}
              </div>
              {confirming.action === "archive" && (
                <div className="text-xs text-muted-foreground">
                  This will preserve the savings data for historical reference.
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
                disabled={confirming.action === "delete" ? deleting : archiving}
              >
                {confirming.action === "delete"
                  ? deleting
                    ? "Deleting..."
                    : "Delete"
                  : archiving
                  ? "Archiving..."
                  : "Archive"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
