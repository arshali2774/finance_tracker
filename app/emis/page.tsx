"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { addMonths, addYears, format, getDaysInMonth } from "date-fns";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DUMMY_USER_ID } from "@/lib/constants";
import { toast } from "sonner";

const GET_EMIS = gql`
  query GetEmisPage($userId: UUID!) {
    emisCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: [
        { status: AscNullsLast }
        { end_date: AscNullsLast }
        { created_at: DescNullsLast }
      ]
    ) {
      edges {
        node {
          id
          name
          emi_amount
          total_amount
          down_payment
          total_payments
          payments_made
          start_date
          end_date
          billing_day
          next_due_date
          last_paid_on
          bank
          status
          created_at
        }
      }
    }
  }
`;

const INSERT_EMI = gql`
  mutation InsertEmiPage($input: emisInsertInput!) {
    insertIntoemisCollection(objects: [$input]) {
      records {
        id
        name
        status
        next_due_date
        last_paid_on
        created_at
      }
    }
  }
`;

const UPDATE_EMI = gql`
  mutation UpdateEmiPage($id: UUID!, $userId: UUID!, $set: emisUpdateInput!) {
    updateemisCollection(
      set: $set
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
        status
        next_due_date
        last_paid_on
      }
    }
  }
`;

const DELETE_EMI = gql`
  mutation DeleteEmiPage($id: UUID!, $userId: UUID!) {
    deleteFromemisCollection(
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const INSERT_ARCHIVE = gql`
  mutation InsertArchiveEmi($input: archiveInsertInput!) {
    insertIntoarchiveCollection(objects: [$input]) {
      records {
        id
      }
    }
  }
`;

type FormState = {
  name: string;
  emiAmount: string;
  totalAmount: string;
  downPayment: string;
  totalPayments: string;
  billingDay: string;
  startDate: string;
  bank: string;
};

const initialForm: FormState = {
  name: "",
  emiAmount: "",
  totalAmount: "",
  downPayment: "",
  totalPayments: "",
  billingDay: "1",
  startDate: "",
  bank: "",
};

const formatFullDate = (value?: string | null) =>
  value ? format(new Date(value), "dd MMMM, yyyy") : "—";

const nextCadenceDate = (
  date: Date,
  cadence: "monthly" | "quarterly" | "annually"
) => {
  if (cadence === "quarterly") return addMonths(date, 3);
  if (cadence === "annually") return addYears(date, 1);
  return addMonths(date, 1);
};

const computeNextDueDate = (
  startDate?: string | null,
  billingDay?: number | null,
  cadence: "monthly" | "quarterly" | "annually" = "monthly",
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

export default function EmisPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState | null>(null);
  const [confirming, setConfirming] = useState<{
    emi: any;
    action: "delete" | "archive";
  } | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [editFormError, setEditFormError] = useState<string>("");

  const { data, loading, error, refetch } = useQuery(GET_EMIS, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const [insertEmi, { loading: saving }] = useMutation(INSERT_EMI);
  const [updateEmi, { loading: updating }] = useMutation(UPDATE_EMI);
  const [deleteEmi, { loading: deleting }] = useMutation(DELETE_EMI);
  const [insertArchive, { loading: archiving }] = useMutation(INSERT_ARCHIVE);

  const emis = useMemo(() => {
    return data?.emisCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const { activeEmis, notStartedEmis, expiredEmis } = useMemo(() => {
    const today = new Date();
    const active: any[] = [];
    const notStarted: any[] = [];
    const expired: any[] = [];

    emis.forEach((e: any) => {
      if (e.status === "expired") {
        expired.push(e);
        return;
      }
      if (e.status === "active") {
        if (e.start_date && new Date(e.start_date) > today) {
          notStarted.push(e);
        } else {
          active.push(e);
        }
        return;
      }
      if (e.status === "not_started") {
        notStarted.push(e);
        return;
      }
      expired.push(e);
    });

    return {
      activeEmis: active,
      notStartedEmis: notStarted,
      expiredEmis: expired,
    };
  }, [emis]);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emiAmountTrim = form.emiAmount.trim();
    const billingDayNumber = parseInt(form.billingDay, 10);
    const totalPaymentsNum = parseInt(form.totalPayments, 10);

    const nameTrim = form.name.trim();
    const emiAmountNumber = parseFloat(emiAmountTrim);

    if (!nameTrim) {
      setFormError("Name is required.");
      return;
    }
    if (
      !emiAmountTrim ||
      Number.isNaN(emiAmountNumber) ||
      emiAmountNumber <= 0
    ) {
      setFormError("Enter a valid EMI amount greater than 0.");
      return;
    }
    if (!form.startDate) {
      setFormError("Start date is required.");
      return;
    }
    if (!form.totalPayments) {
      setFormError("Total payments is required.");
      return;
    }
    if (
      Number.isNaN(billingDayNumber) ||
      billingDayNumber < 1 ||
      billingDayNumber > 31
    ) {
      setFormError("Billing day must be between 1 and 31.");
      return;
    }
    if (Number.isNaN(totalPaymentsNum) || totalPaymentsNum < 1) {
      setFormError("Total payments must be at least 1.");
      return;
    }

    setFormError("");

    const totalAmountTrim = form.totalAmount.trim();
    const downPaymentTrim = form.downPayment.trim();

    // Auto-calculate end_date: start_date + (total_payments - 1) months
    const startDateObj = new Date(form.startDate);
    const endDateObj = addMonths(startDateObj, totalPaymentsNum - 1);
    const endDateStr = format(endDateObj, "yyyy-MM-dd");

    const status =
      new Date(form.startDate) > new Date() ? "not_started" : "active";

    try {
      await insertEmi({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            name: nameTrim,
            emi_amount: emiAmountTrim, // BigFloat as string
            total_amount: totalAmountTrim || null,
            down_payment: downPaymentTrim || null,
            total_payments: totalPaymentsNum,
            payments_made: 0,
            start_date: form.startDate,
            end_date: endDateStr,
            billing_day: billingDayNumber,
            bank: form.bank || null,
            status,
            next_due_date: computeNextDueDate(
              form.startDate,
              billingDayNumber,
              "monthly"
            ),
            last_paid_on: null,
          },
        },
      });

      setForm(initialForm);
      refetch();
      pushToast({
        title: "EMI added",
        description: nameTrim,
        variant: "success",
      });
    } catch (err: any) {
      pushToast({
        title: "Add failed",
        description: err?.message ?? "Could not add EMI",
        variant: "error",
      });
    }
  };

  const startEdit = (emi: any) => {
    setEditingId(emi.id);
    setEditForm({
      name: emi.name,
      emiAmount: emi.emi_amount,
      totalAmount: emi.total_amount ?? "",
      downPayment: emi.down_payment ?? "",
      totalPayments: String(emi.total_payments ?? ""),
      billingDay: String(emi.billing_day ?? "1"),
      startDate: emi.start_date ?? "",
      bank: emi.bank ?? "",
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

  const handleEditSave = async (emi: any) => {
    if (!editForm) return;
    const amountTrim = editForm.emiAmount.trim();
    const billingDayNumber = parseInt(editForm.billingDay, 10);
    const totalPaymentsNum = parseInt(editForm.totalPayments, 10);
    const nameTrim = editForm.name.trim();
    const amountNumber = parseFloat(amountTrim);
    if (!nameTrim) {
      setEditFormError("Name is required.");
      return;
    }
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setEditFormError("Enter a valid EMI amount greater than 0.");
      return;
    }
    if (!editForm.startDate) {
      setEditFormError("Start date is required.");
      return;
    }
    if (!editForm.totalPayments) {
      setEditFormError("Total payments is required.");
      return;
    }
    if (
      Number.isNaN(billingDayNumber) ||
      billingDayNumber < 1 ||
      billingDayNumber > 31
    ) {
      setEditFormError("Billing day must be between 1 and 31.");
      return;
    }
    if (Number.isNaN(totalPaymentsNum) || totalPaymentsNum < 1) {
      setEditFormError("Total payments must be at least 1.");
      return;
    }

    setEditFormError("");

    // Auto-calculate end_date
    const startDateObj = new Date(editForm.startDate);
    const endDateObj = addMonths(startDateObj, totalPaymentsNum - 1);
    const endDateStr = format(endDateObj, "yyyy-MM-dd");

    const status =
      emi.status === "expired"
        ? "expired"
        : new Date(editForm.startDate) > new Date()
        ? "not_started"
        : "active";

    try {
      await updateEmi({
        variables: {
          id: emi.id,
          userId: DUMMY_USER_ID,
          set: {
            name: nameTrim,
            emi_amount: amountTrim,
            total_amount: editForm.totalAmount.trim() || null,
            down_payment: editForm.downPayment.trim() || null,
            total_payments: totalPaymentsNum,
            start_date: editForm.startDate,
            end_date: endDateStr,
            billing_day: billingDayNumber,
            bank: editForm.bank || null,
            status,
            next_due_date: computeNextDueDate(
              editForm.startDate,
              billingDayNumber,
              "monthly"
            ),
          },
        },
      });

      cancelEdit();
      refetch();
      pushToast({ title: "EMI updated", variant: "success" });
    } catch (err: any) {
      pushToast({
        title: "Update failed",
        description: err?.message ?? "Could not update EMI",
        variant: "error",
      });
    }
  };

  const handleDeleteClick = (emi: any) =>
    setConfirming({ emi, action: "delete" });

  const handleArchiveClick = (emi: any) =>
    setConfirming({ emi, action: "archive" });

  const handleConfirm = async () => {
    if (!confirming) return;
    const { emi, action } = confirming;
    setConfirming(null);

    if (action === "delete") {
      await deleteEmi({ variables: { id: emi.id, userId: DUMMY_USER_ID } });
      refetch();
      pushToast({
        title: "EMI deleted",
        description: emi.name,
        variant: "success",
      });
      return;
    }

    if (action === "archive") {
      // Archive: store full record, then delete original
      const entityData = {
        id: emi.id,
        name: emi.name,
        emi_amount: emi.emi_amount,
        total_amount: emi.total_amount,
        down_payment: emi.down_payment,
        total_payments: emi.total_payments,
        payments_made: emi.payments_made,
        start_date: emi.start_date,
        end_date: emi.end_date,
        billing_day: emi.billing_day,
        next_due_date: emi.next_due_date,
        last_paid_on: emi.last_paid_on,
        bank: emi.bank,
        status: emi.status,
        created_at: emi.created_at,
      };

      await insertArchive({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            entity_type: "emi",
            entity_id: emi.id,
            entity_data: entityData,
            reason: "expired",
          },
        },
      });

      await deleteEmi({ variables: { id: emi.id, userId: DUMMY_USER_ID } });

      refetch();
      pushToast({
        title: "EMI archived",
        description: emi.name,
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
        <h1 className="text-2xl font-semibold">EMIs</h1>
        <p className="text-sm text-muted-foreground">
          Active EMIs deducted on the 1st of the applicable month.
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
            <span className="text-sm font-medium">EMI Amount (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.emiAmount}
              onChange={handleChange("emiAmount")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Total Amount (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.totalAmount}
              onChange={handleChange("totalAmount")}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Down Payment (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.downPayment}
              onChange={handleChange("downPayment")}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Billing Day (1-31)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              min={1}
              max={31}
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
            <span className="text-sm font-medium">Total Payments</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              min={1}
              value={form.totalPayments}
              onChange={handleChange("totalPayments")}
              required
              placeholder="e.g. 24 for 2 years"
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
          {saving ? "Saving..." : "Add EMI"}
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
          {activeEmis.map((emi: any) => (
            <div key={emi.id} className="rounded-lg border p-4 space-y-1">
              {editingId === emi.id && editForm ? (
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
                      <span className="text-sm font-medium">EMI Amount</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        step="0.01"
                        value={editForm.emiAmount}
                        onChange={handleEditChange("emiAmount")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Total Amount</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        step="0.01"
                        value={editForm.totalAmount}
                        onChange={handleEditChange("totalAmount")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Down Payment</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        step="0.01"
                        value={editForm.downPayment}
                        onChange={handleEditChange("downPayment")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Billing Day</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        min={1}
                        max={31}
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
                    <label className="space-y-1">
                      <span className="text-sm font-medium">
                        Total Payments
                      </span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="number"
                        min={1}
                        value={editForm.totalPayments}
                        onChange={handleEditChange("totalPayments")}
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
                      onClick={() => handleEditSave(emi)}
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
                    <span className="font-semibold">{emi.name}</span>
                    <div className="flex items-center gap-2">
                      {emi.total_payments && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {emi.payments_made ?? 0} of {emi.total_payments} paid
                        </span>
                      )}
                      <span className="text-sm uppercase text-muted-foreground">
                        {emi.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{emi.emi_amount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Starts {formatFullDate(emi.start_date)} • Ends{" "}
                    {formatFullDate(emi.end_date)} • Billing day{" "}
                    {emi.billing_day ?? "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Bank: {emi.bank || "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total: {emi.total_amount ?? "—"} • Down:{" "}
                    {emi.down_payment ?? "—"}
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(emi)}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          {activeEmis.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">No active EMIs.</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Not Started</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {notStartedEmis.map((emi: any) => (
            <div key={emi.id} className="rounded-lg border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{emi.name}</span>
                <div className="flex items-center gap-2">
                  {emi.total_payments && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {emi.payments_made ?? 0} of {emi.total_payments} paid
                    </span>
                  )}
                  <span className="text-sm uppercase text-muted-foreground">
                    {emi.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                ₹{emi.emi_amount}
              </div>
              <div className="text-xs text-muted-foreground">
                Starts {formatFullDate(emi.start_date)} • Ends{" "}
                {formatFullDate(emi.end_date)} • Billing day{" "}
                {emi.billing_day ?? "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                Bank: {emi.bank || "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                Total: {emi.total_amount ?? "—"} • Down:{" "}
                {emi.down_payment ?? "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                Last paid on: {formatFullDate(emi.last_paid_on)}
              </div>
              <div className="text-xs text-muted-foreground">
                Next due:{" "}
                {formatFullDate(
                  emi.next_due_date ??
                    computeNextDueDate(
                      emi.start_date,
                      emi.billing_day,
                      "monthly"
                    )
                )}
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(emi)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(emi)}
                  disabled={deleting}
                >
                  {deleting ? "Removing..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
          {notStartedEmis.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No upcoming EMIs.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Expired</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {expiredEmis.map((emi: any) => (
            <div key={emi.id} className="rounded-lg border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{emi.name}</span>
                <div className="flex items-center gap-2">
                  {emi.total_payments && (
                    <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                      {emi.payments_made ?? 0} of {emi.total_payments} paid
                    </span>
                  )}
                  <span className="text-sm uppercase text-muted-foreground">
                    {emi.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                ₹{emi.emi_amount}
              </div>
              <div className="text-xs text-muted-foreground">
                Starts {formatFullDate(emi.start_date)} • Ends{" "}
                {formatFullDate(emi.end_date)} • Billing day{" "}
                {emi.billing_day ?? "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                Bank: {emi.bank || "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                Total: {emi.total_amount ?? "—"} • Down:{" "}
                {emi.down_payment ?? "—"}
              </div>
              <div className="text-xs text-muted-foreground">
                Last paid on: {formatFullDate(emi.last_paid_on)}
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(emi)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleArchiveClick(emi)}
                  disabled={archiving}
                >
                  {archiving ? "Archiving..." : "Archive"}
                </Button>
              </div>
            </div>
          ))}
          {expiredEmis.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No expired EMIs.
            </div>
          )}
        </div>
      </div>

      {/* Delete/Archive confirmation modal */}
      {confirming && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-lg bg-background border shadow-lg p-4 space-y-3">
            <div className="space-y-1">
              <div className="text-lg font-semibold">
                {confirming.action === "delete"
                  ? "Delete EMI?"
                  : "Archive EMI?"}
              </div>
              <div className="text-sm text-muted-foreground">
                {confirming.emi.name} · ₹{confirming.emi.emi_amount}
              </div>
              {confirming.action === "archive" && (
                <div className="text-xs text-muted-foreground">
                  This will preserve the EMI data for historical reference.
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
