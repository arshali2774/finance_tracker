"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { format, startOfMonth } from "date-fns";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DUMMY_USER_ID } from "@/lib/constants";
import { toast } from "sonner";

const capitalize = (value: string) =>
  value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const formatFullDate = (value: string) =>
  format(new Date(value), "dd MMMM, yyyy");

const UNCATEGORIZED_KEY = "__none";

const GET_EXPENSES = gql`
  query GetDailyExpensesPage($userId: UUID!, $yearMonth: Date!) {
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
    daily_expensesCollection(
      filter: { user_id: { eq: $userId }, year_month: { eq: $yearMonth } }
      orderBy: [{ expense_date: DescNullsLast }, { created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          expense_date
          amount
          category_id
          description
          created_at
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
          disposable_income
          remaining_balance
        }
      }
    }
  }
`;

const INSERT_EXPENSE = gql`
  mutation InsertDailyExpensePage($input: daily_expensesInsertInput!) {
    insertIntodaily_expensesCollection(objects: [$input]) {
      records {
        id
        expense_date
      }
    }
  }
`;

const UPDATE_EXPENSE = gql`
  mutation UpdateDailyExpensePage(
    $id: UUID!
    $userId: UUID!
    $set: daily_expensesUpdateInput!
  ) {
    updatedaily_expensesCollection(
      set: $set
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const DELETE_EXPENSE = gql`
  mutation DeleteDailyExpensePage($id: UUID!, $userId: UUID!) {
    deleteFromdaily_expensesCollection(
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const INSERT_MONTH = gql`
  mutation InsertMonthForExpenses($input: monthly_recordsInsertInput!) {
    insertIntomonthly_recordsCollection(objects: [$input]) {
      records {
        id
        remaining_balance
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
  amount: string;
  date: string;
  category: string;
  description: string;
};

const initialForm: FormState = {
  amount: "",
  date: format(new Date(), "yyyy-MM-dd"),
  category: "",
  description: "",
};

const freshForm = (baseDate?: string): FormState => ({
  ...initialForm,
  // Keep date current when resetting
  date: baseDate ?? format(new Date(), "yyyy-MM-dd"),
});

export default function ExpensesPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(startOfMonth(new Date()), "yyyy-MM-dd")
  );
  const [form, setForm] = useState<FormState>(() => freshForm(selectedMonth));
  const idRef = useRef(1);
  const [confirming, setConfirming] = useState<any | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterFrom, setFilterFrom] = useState<string>("");
  const [filterTo, setFilterTo] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [editFormError, setEditFormError] = useState<string>("");

  const { data, loading, error, refetch } = useQuery(GET_EXPENSES, {
    variables: { userId: DUMMY_USER_ID, yearMonth: selectedMonth },
    fetchPolicy: "cache-and-network",
  });

  const [insertExpense, { loading: saving }] = useMutation(INSERT_EXPENSE);
  const [updateExpense, { loading: updating }] = useMutation(UPDATE_EXPENSE);
  const [deleteExpense, { loading: deleting }] = useMutation(DELETE_EXPENSE);
  const [updateMonth] = useMutation(UPDATE_MONTH);
  const [insertMonth] = useMutation(INSERT_MONTH);

  const expenses = useMemo(() => {
    return data?.daily_expensesCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const categories = useMemo(() => {
    return data?.categoriesCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const categoryNames = useMemo(() => {
    const names: Record<string, string> = {
      [UNCATEGORIZED_KEY]: "No category",
    };
    categories.forEach((cat: any) => {
      names[cat.id] = capitalize(cat.name);
    });
    return names;
  }, [categories]);

  const record = data?.monthly_recordsCollection?.edges?.[0]?.node;
  const disposable = record?.disposable_income
    ? parseFloat(record.disposable_income)
    : undefined;
  const recordRemaining = record?.remaining_balance
    ? parseFloat(record.remaining_balance)
    : undefined;

  const filteredExpenses = useMemo(() => {
    const text = filterText.trim().toLowerCase();
    const fromDate = filterFrom ? new Date(filterFrom) : null;
    const toDate = filterTo ? new Date(filterTo) : null;
    return expenses.filter((ex: any) => {
      if (filterCategory && ex.category_id !== filterCategory) return false;
      if (fromDate && new Date(ex.expense_date) < fromDate) return false;
      if (toDate && new Date(ex.expense_date) > toDate) return false;
      if (text) {
        const hay = `${ex.description ?? ""}`.toLowerCase();
        if (!hay.includes(text)) return false;
      }
      return true;
    });
  }, [expenses, filterCategory, filterFrom, filterTo, filterText]);

  const spentTotal = expenses.reduce(
    (sum: number, e: any) => sum + (parseFloat(e.amount) || 0),
    0
  );
  const spentFiltered = filteredExpenses.reduce(
    (sum: number, e: any) => sum + (parseFloat(e.amount) || 0),
    0
  );
  const remaining =
    disposable !== undefined && recordRemaining !== undefined
      ? recordRemaining
      : disposable !== undefined
      ? disposable - spentTotal
      : undefined;

  const categoryTotals = useMemo(() => {
    const acc: Record<string, { total: number; count: number }> = {};
    filteredExpenses.forEach((ex: any) => {
      const key = ex.category_id ?? UNCATEGORIZED_KEY;
      const amt = parseFloat(ex.amount) || 0;
      const current = acc[key] ?? { total: 0, count: 0 };
      acc[key] = { total: current.total + amt, count: current.count + 1 };
    });
    return Object.entries(acc)
      .map(([key, value]) => ({
        key,
        name: categoryNames[key] ?? "Unknown",
        total: value.total,
        count: value.count,
        percent: spentFiltered > 0 ? (value.total / spentFiltered) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }, [filteredExpenses, categoryNames, spentFiltered]);

  const updateExpensesCache = (
    cache: any,
    updater: (
      edges: any[],
      typenames: {
        collection: string;
        edge: string;
        node: string;
      }
    ) => any[]
  ) => {
    const existing = cache.readQuery({
      query: GET_EXPENSES,
      variables: { userId: DUMMY_USER_ID, yearMonth: selectedMonth },
    });
    if (!existing) return;

    const collectionTypename =
      existing.daily_expensesCollection?.__typename ??
      "daily_expensesConnection";
    const edgeTypename =
      existing.daily_expensesCollection?.edges?.[0]?.__typename ??
      "daily_expensesEdge";
    const nodeTypename =
      existing.daily_expensesCollection?.edges?.[0]?.node?.__typename ??
      "daily_expenses";

    const nextEdges = updater(existing.daily_expensesCollection?.edges ?? [], {
      collection: collectionTypename,
      edge: edgeTypename,
      node: nodeTypename,
    });

    cache.writeQuery({
      query: GET_EXPENSES,
      variables: { userId: DUMMY_USER_ID, yearMonth: selectedMonth },
      data: {
        ...existing,
        daily_expensesCollection: {
          __typename: collectionTypename,
          edges: nextEdges,
        },
      },
    });
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountTrim = form.amount.trim();
    const descriptionTrim = form.description.trim();
    if (!descriptionTrim) {
      setFormError("Description is required.");
      return;
    }
    const amountNumber = parseFloat(amountTrim);
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setFormError("Enter a valid amount greater than 0.");
      return;
    }
    if (!form.date) {
      setFormError("Date is required.");
      return;
    }
    setFormError("");

    const input = {
      user_id: DUMMY_USER_ID,
      year_month: selectedMonth,
      expense_date: form.date,
      amount: amountTrim, // BigFloat as string
      category_id: form.category || null,
      description: descriptionTrim,
    };

    const tempId = `temp-${idRef.current++}`;

    try {
      await insertExpense({
        variables: {
          input,
        },
        optimisticResponse: {
          insertIntodaily_expensesCollection: {
            __typename: "daily_expensesInsertResponse",
            records: [
              {
                __typename: "daily_expenses",
                id: tempId,
                expense_date: input.expense_date,
              },
            ],
          },
        },
        update: (cache, { data }) => {
          const inserted =
            data?.insertIntodaily_expensesCollection?.records?.[0];
          const payload = {
            id: inserted?.id ?? tempId,
            ...input,
            created_at: new Date().toISOString(),
          };
          updateExpensesCache(cache, (edges, typenames) => [
            {
              __typename: typenames.edge,
              node: { __typename: typenames.node, ...payload },
            },
            ...edges.filter((edge) => edge?.node?.id !== payload.id),
          ]);
        },
      });

      const { remainingBalance } = await ensureMonthRecord();
      const newRemaining = (remainingBalance ?? 0) - parseFloat(amountTrim);
      await updateMonth({
        variables: {
          userId: DUMMY_USER_ID,
          yearMonth: selectedMonth,
          set: { remaining_balance: newRemaining.toString() },
        },
      });

      setForm(freshForm(selectedMonth));
      refetch();
      pushToast({
        title: "Expense added",
        description: `${descriptionTrim} for ₹${amountTrim}`,
        variant: "success",
      });
    } catch (err: any) {
      pushToast({
        title: "Add failed",
        description: err?.message ?? "Could not add expense",
        variant: "error",
      });
    }
  };

  const handleDeleteClick = (ex: any) => {
    setConfirming(ex);
  };

  const pushToast = (t: {
    title: string;
    description?: string;
    variant?: "success" | "error";
    actionLabel?: string;
    onAction?: () => void;
    durationMs?: number;
  }) => {
    const options: Parameters<typeof toast.success>[1] = {
      description: t.description,
      duration: t.durationMs,
      action:
        t.actionLabel && t.onAction
          ? { label: t.actionLabel, onClick: t.onAction }
          : undefined,
    };

    if (t.variant === "error") {
      toast.error(t.title, options);
      return;
    }

    toast.success(t.title, options);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  const ensureMonthRecord = async (): Promise<{
    id?: string;
    remainingBalance?: number;
  }> => {
    if (record?.id) {
      return { id: record.id, remainingBalance: recordRemaining ?? 0 };
    }

    const payload = {
      user_id: DUMMY_USER_ID,
      year_month: selectedMonth,
      salary_amount: "0",
      savings_amount: "0",
      total_fixed_expenses: "0",
      disposable_income: "0",
      remaining_balance: "0",
    };

    const res = await insertMonth({ variables: { input: payload } });
    const newId =
      res.data?.insertIntomonthly_recordsCollection?.records?.[0]?.id;
    const newRemaining =
      res.data?.insertIntomonthly_recordsCollection?.records?.[0]
        ?.remaining_balance;

    return {
      id: newId,
      remainingBalance: newRemaining ? parseFloat(newRemaining) : 0,
    };
  };

  const handleDeleteConfirm = async () => {
    if (!confirming) return;
    const ex = confirming;
    setConfirming(null);

    try {
      await deleteExpense({
        variables: { id: ex.id, userId: DUMMY_USER_ID },
        optimisticResponse: {
          deleteFromdaily_expensesCollection: {
            __typename: "daily_expensesDeleteResponse",
            records: [{ __typename: "daily_expenses", id: ex.id }],
          },
        },
        update: (cache) => {
          updateExpensesCache(cache, (edges) =>
            edges.filter((edge) => edge?.node?.id !== ex.id)
          );
        },
      });

      const { remainingBalance } = await ensureMonthRecord();
      const newRemaining =
        (remainingBalance ?? 0) + (parseFloat(ex.amount) || 0);
      await updateMonth({
        variables: {
          userId: DUMMY_USER_ID,
          yearMonth: selectedMonth,
          set: { remaining_balance: newRemaining.toString() },
        },
      });

      refetch();
      pushToast({
        title: "Expense deleted",
        description: `${ex.description ?? "(No description)"} removed`,
        variant: "success",
        actionLabel: "Undo",
        onAction: () => handleUndoDelete(ex),
      });
    } catch (err: any) {
      pushToast({
        title: "Delete failed",
        description: err?.message ?? "Could not delete expense",
        variant: "error",
      });
    }
  };

  const handleUndoDelete = async (ex: any) => {
    try {
      await insertExpense({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            year_month: format(
              startOfMonth(new Date(ex.expense_date)),
              "yyyy-MM-dd"
            ),
            expense_date: ex.expense_date,
            amount: ex.amount,
            category_id: ex.category_id || null,
            description: ex.description || null,
          },
        },
        optimisticResponse: {
          insertIntodaily_expensesCollection: {
            __typename: "daily_expensesInsertResponse",
            records: [
              {
                __typename: "daily_expenses",
                id: `temp-${ex.id}`,
                expense_date: ex.expense_date,
              },
            ],
          },
        },
        update: (cache) => {
          const payload = {
            id: ex.id,
            year_month: format(
              startOfMonth(new Date(ex.expense_date)),
              "yyyy-MM-dd"
            ),
            expense_date: ex.expense_date,
            amount: ex.amount,
            category_id: ex.category_id || null,
            description: ex.description || null,
            user_id: DUMMY_USER_ID,
            created_at: new Date().toISOString(),
          };
          updateExpensesCache(cache, (edges, typenames) => [
            {
              __typename: typenames.edge,
              node: { __typename: typenames.node, ...payload },
            },
            ...edges.filter((edge) => edge?.node?.id !== payload.id),
          ]);
        },
      });

      const { remainingBalance } = await ensureMonthRecord();
      const newRemaining =
        (remainingBalance ?? 0) - (parseFloat(ex.amount) || 0);
      await updateMonth({
        variables: {
          userId: DUMMY_USER_ID,
          yearMonth: selectedMonth,
          set: { remaining_balance: newRemaining.toString() },
        },
      });

      refetch();
      pushToast({
        title: "Restored",
        description: `${ex.description ?? "(No description)"} re-added`,
        variant: "success",
      });
    } catch (err: any) {
      pushToast({
        title: "Undo failed",
        description: err?.message ?? "Could not restore expense",
        variant: "error",
      });
    }
  };

  const startEdit = (ex: any) => {
    setEditingId(ex.id);
    setEditForm({
      amount: ex.amount ?? "",
      date: ex.expense_date,
      category: ex.category_id ?? "",
      description: ex.description ?? "",
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

  const handleEditSave = async (ex: any) => {
    if (!editForm) return;
    const amountTrim = editForm.amount.trim();
    const descriptionTrim = editForm.description.trim();
    if (!descriptionTrim) {
      setEditFormError("Description is required.");
      return;
    }
    const amountNumber = parseFloat(amountTrim);
    if (!amountTrim || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setEditFormError("Enter a valid amount greater than 0.");
      return;
    }
    if (!editForm.date) {
      setEditFormError("Date is required.");
      return;
    }
    setEditFormError("");

    const oldAmount = parseFloat(ex.amount) || 0;
    const newAmount = parseFloat(amountTrim) || 0;
    const delta = oldAmount - newAmount; // positive means we reduced spend

    try {
      await updateExpense({
        variables: {
          id: ex.id,
          userId: DUMMY_USER_ID,
          set: {
            expense_date: editForm.date,
            amount: amountTrim,
            category_id: editForm.category || null,
            description: descriptionTrim,
          },
        },
        optimisticResponse: {
          updatedaily_expensesCollection: {
            __typename: "daily_expensesUpdateResponse",
            records: [{ __typename: "daily_expenses", id: ex.id }],
          },
        },
        update: (cache) => {
          const payload = {
            id: ex.id,
            expense_date: editForm.date,
            amount: amountTrim,
            category_id: editForm.category || null,
            description: descriptionTrim,
          };
          updateExpensesCache(cache, (edges, typenames) =>
            edges.map((edge) =>
              edge?.node?.id === ex.id
                ? {
                    __typename: typenames.edge,
                    node: {
                      __typename: typenames.node,
                      ...edge.node,
                      ...payload,
                    },
                  }
                : edge
            )
          );
        },
      });

      const { remainingBalance } = await ensureMonthRecord();
      const newRemaining = (remainingBalance ?? 0) + delta;
      await updateMonth({
        variables: {
          userId: DUMMY_USER_ID,
          yearMonth: selectedMonth,
          set: { remaining_balance: newRemaining.toString() },
        },
      });

      cancelEdit();
      refetch();
      pushToast({
        title: "Expense updated",
        description: `${descriptionTrim} saved`,
        variant: "success",
      });
    } catch (err: any) {
      pushToast({
        title: "Update failed",
        description: err?.message ?? "Could not update expense",
        variant: "error",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Daily Expenses</h1>
        <p className="text-sm text-muted-foreground">
          Logged against disposable income for the current salary cycle.
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-sm font-semibold">Filters</span>
            <p className="text-xs text-muted-foreground">
              Narrow results by month, category, date range, or text.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilterCategory("");
              setFilterFrom("");
              setFilterTo("");
              setFilterText("");
            }}
          >
            Clear filters
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          <label className="space-y-1 lg:col-span-2">
            <span className="text-sm font-medium">Month</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="month"
              value={selectedMonth.slice(0, 7)}
              onChange={(e) => {
                const val = e.target.value; // yyyy-MM
                if (!val) return;
                const normalized = `${val}-01`;
                setSelectedMonth(normalized);
                setForm((prev) => ({ ...prev, date: normalized }));
              }}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Category</span>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories
                .filter((cat: any) => cat.name !== "subscriptions")
                .map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {capitalize(cat.name)}
                  </option>
                ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">From</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="date"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">To</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="date"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
            />
          </label>

          <label className="space-y-1 lg:col-span-2">
            <span className="text-sm font-medium">Search</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Description"
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium">Description</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.description ?? ""}
              onChange={handleChange("description")}
              placeholder="e.g., Groceries, coffee"
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Amount (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.amount ?? ""}
              onChange={handleChange("amount")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Date</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="date"
              value={form.date ?? ""}
              onChange={handleChange("date")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Category (optional)</span>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.category ?? ""}
              onChange={handleChange("category")}
            >
              <option value="">No category</option>
              {categories
                .filter((cat: any) => cat.name !== "subscriptions")
                .map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {capitalize(cat.name)}
                  </option>
                ))}
            </select>
          </label>
        </div>

        {formError && <div className="text-xs text-red-600">{formError}</div>}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Expense"}
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            Spent this month
          </span>
          <span className="text-2xl font-semibold">
            ₹{spentFiltered.toFixed(2)}
          </span>
        </div>
        <div className="rounded-lg border p-4 flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">Remaining</span>
          <span className="text-2xl font-semibold">
            {remaining !== undefined ? `₹${remaining.toFixed(2)}` : "—"}
          </span>
        </div>
      </div>

      {expenses.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">By Category</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {categoryTotals.map((cat) => (
              <div key={cat.key} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {cat.name}
                  </span>
                  <span className="font-semibold">₹{cat.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {cat.count} item{cat.count === 1 ? "" : "s"}
                  </span>
                  <span>
                    {spentFiltered > 0
                      ? `${cat.percent.toFixed(1)}% of ₹${spentFiltered.toFixed(
                          2
                        )}`
                      : "—"}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${Math.min(cat.percent, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Expenses</h2>
          {loading && (
            <span className="text-sm text-muted-foreground">Loading...</span>
          )}
          {error && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {expenses.map((ex: any) => (
            <div key={ex.id} className="rounded-lg border p-4 space-y-1">
              {editingId === ex.id && editForm ? (
                <div className="space-y-2">
                  <div className="grid gap-2 md:grid-cols-2">
                    <label className="space-y-1 md:col-span-2">
                      <span className="text-sm font-medium">Description</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.description}
                        onChange={handleEditChange("description")}
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
                      <span className="text-sm font-medium">Date</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        type="date"
                        value={editForm.date}
                        onChange={handleEditChange("date")}
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-sm font-medium">Category</span>
                      <select
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.category}
                        onChange={handleEditChange("category")}
                      >
                        <option value="">No category</option>
                        {categories
                          .filter((cat: any) => cat.name !== "subscriptions")
                          .map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                              {capitalize(cat.name)}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label className="space-y-1 md:col-span-2">
                      <span className="text-sm font-medium">Description</span>
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.description}
                        onChange={handleEditChange("description")}
                      />
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleEditSave(ex)}
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
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {ex.description ?? "(No description)"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ₹{ex.amount}
                      </span>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] px-2 py-1 rounded-full border text-muted-foreground">
                          {capitalize(
                            categoryNames[
                              ex.category_id ?? UNCATEGORIZED_KEY
                            ] ?? "Unknown"
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatFullDate(ex.expense_date)}
                    </span>
                  </div>
                  {ex.description && (
                    <div className="text-sm text-muted-foreground">
                      {ex.description}
                    </div>
                  )}
                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(ex)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(ex)}
                      disabled={deleting}
                    >
                      {deleting ? "Removing..." : "Delete"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          {expenses.length === 0 && !loading && (
            <div className="text-sm text-muted-foreground">
              No expenses yet.
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirming && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            ref={modalRef}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            className="w-full max-w-md rounded-lg bg-background border shadow-lg p-4 space-y-3"
          >
            <div className="space-y-1">
              <div className="text-lg font-semibold">Delete expense?</div>
              <div className="text-sm text-muted-foreground">
                {confirming.description ?? "(No description)"} · ₹
                {confirming.amount} · {confirming.expense_date}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setConfirming(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
