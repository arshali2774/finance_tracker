"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DUMMY_USER_ID } from "@/lib/constants";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const GET_WISHLIST = gql`
  query GetWishlistPage($userId: UUID!) {
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
    wishlistCollection(
      filter: { user_id: { eq: $userId } }
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          estimated_amount
          category_id
          priority
          url
          notes
          is_purchased
          expense_id
          created_at
        }
      }
    }
  }
`;

const INSERT_WISHLIST = gql`
  mutation InsertWishlist($input: wishlistInsertInput!) {
    insertIntowishlistCollection(objects: [$input]) {
      records {
        id
      }
    }
  }
`;

const UPDATE_WISHLIST = gql`
  mutation UpdateWishlist(
    $id: UUID!
    $userId: UUID!
    $set: wishlistUpdateInput!
  ) {
    updatewishlistCollection(
      set: $set
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const DELETE_WISHLIST = gql`
  mutation DeleteWishlist($id: UUID!, $userId: UUID!) {
    deleteFromwishlistCollection(
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

type FormState = {
  name: string;
  estimatedAmount: string;
  priority: "need" | "want" | "someday";
  category: string;
  url: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  estimatedAmount: "",
  priority: "want",
  category: "",
  url: "",
  notes: "",
};

const capitalize = (value: string) =>
  value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const formatFullDate = (value: string) =>
  value ? format(new Date(value), "dd MMM yyyy") : "—";

export default function WishlistPage() {
  const supabase = getSupabaseBrowserClient();
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState | null>(null);
  const [activeView, setActiveView] = useState<
    "all" | "need" | "want" | "purchased"
  >("all");
  const [formError, setFormError] = useState<string>("");
  const [editFormError, setEditFormError] = useState<string>("");

  const { data, loading, error, refetch } = useQuery(GET_WISHLIST, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const [insertWishlist, { loading: saving }] = useMutation(INSERT_WISHLIST);
  const [updateWishlist, { loading: updating }] = useMutation(UPDATE_WISHLIST);
  const [deleteWishlist, { loading: deleting }] = useMutation(DELETE_WISHLIST);
  const [addingToExpensesId, setAddingToExpensesId] = useState<string | null>(
    null
  );

  const categories = useMemo(() => {
    return data?.categoriesCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const categoryNames = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat: any) => {
      map[cat.id] = capitalize(cat.name);
    });
    return map;
  }, [categories]);

  const items = useMemo(() => {
    return data?.wishlistCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const filteredItems = useMemo(() => {
    if (activeView === "all") return items;
    if (activeView === "purchased") {
      return items.filter((item: any) => item.is_purchased);
    }
    const priorityKey = activeView === "need" ? "need" : "want";
    return items.filter(
      (item: any) => !item.is_purchased && item.priority === priorityKey
    );
  }, [activeView, items]);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameTrim = form.name.trim();
    const amountTrim = form.estimatedAmount.trim();
    const amountNumber = amountTrim ? parseFloat(amountTrim) : NaN;

    if (!nameTrim) {
      setFormError("Name is required.");
      return;
    }
    if (amountTrim && (Number.isNaN(amountNumber) || amountNumber <= 0)) {
      setFormError("Enter a valid amount greater than 0 or leave blank.");
      return;
    }
    setFormError("");

    try {
      await insertWishlist({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            name: nameTrim,
            estimated_amount: amountTrim || null,
            category_id: form.category || null,
            priority: form.priority,
            url: form.url || null,
            notes: form.notes || null,
            is_purchased: false,
          },
        },
      });
      setForm(initialForm);
      refetch();
      toast.success("Wishlist item added", { description: nameTrim });
    } catch (err: any) {
      toast.error("Add failed", {
        description: err?.message ?? "Could not create wishlist item",
      });
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      estimatedAmount: item.estimated_amount ?? "",
      priority: item.priority,
      category: item.category_id ?? "",
      url: item.url ?? "",
      notes: item.notes ?? "",
    });
  };

  const handleEditChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((prev) =>
        prev ? { ...prev, [field]: e.target.value } : prev
      );
    };

  const handleEditSave = async (item: any) => {
    if (!editForm) return;
    const nameTrim = editForm.name.trim();
    const amountTrim = editForm.estimatedAmount.trim();
    const amountNumber = amountTrim ? parseFloat(amountTrim) : NaN;

    if (!nameTrim) {
      setEditFormError("Name is required.");
      return;
    }
    if (amountTrim && (Number.isNaN(amountNumber) || amountNumber <= 0)) {
      setEditFormError("Enter a valid amount greater than 0 or leave blank.");
      return;
    }
    setEditFormError("");

    try {
      await updateWishlist({
        variables: {
          id: item.id,
          userId: DUMMY_USER_ID,
          set: {
            name: nameTrim,
            estimated_amount: amountTrim || null,
            category_id: editForm.category || null,
            priority: editForm.priority,
            url: editForm.url || null,
            notes: editForm.notes || null,
          },
        },
      });
      setEditingId(null);
      setEditForm(null);
      refetch();
      toast.success("Wishlist updated");
    } catch (err: any) {
      toast.error("Update failed", {
        description: err?.message ?? "Could not update wishlist item",
      });
    }
  };

  const handleDelete = async (item: any) => {
    try {
      await deleteWishlist({
        variables: { id: item.id, userId: DUMMY_USER_ID },
      });
      refetch();
      toast.success("Wishlist deleted");
    } catch (err: any) {
      toast.error("Delete failed", {
        description: err?.message ?? "Could not delete wishlist item",
      });
    }
  };

  const handleAddToExpenses = async (item: any) => {
    const amountTrim = item.estimated_amount?.toString()?.trim();
    const nameTrim = item.name?.trim();

    if (item?.is_purchased && item?.expense_id) {
      toast.error("Already added", {
        description: "This wishlist item is already marked as purchased.",
      });
      return;
    }

    if (
      !amountTrim ||
      Number.isNaN(parseFloat(amountTrim)) ||
      parseFloat(amountTrim) <= 0
    ) {
      toast.error("Cannot add", {
        description: "Estimated amount must be provided to add as expense.",
      });
      return;
    }

    const today = format(new Date(), "yyyy-MM-dd");

    try {
      setAddingToExpensesId(item.id);
      const { error: rpcError } = await supabase.rpc(
        "add_wishlist_item_to_expenses",
        {
          p_wishlist_id: item.id,
          p_expense_date: today,
        }
      );

      if (rpcError) {
        throw rpcError;
      }

      refetch();
      toast.success("Added to expenses", {
        description: `${nameTrim ?? "Wishlist item"} logged as expense`,
      });
    } catch (err: any) {
      toast.error("Add to expenses failed", {
        description: err?.message ?? "Could not create expense",
      });
    } finally {
      setAddingToExpensesId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Wishlist</h1>
          <p className="text-sm text-muted-foreground">
            Track items to buy, and add them directly into daily expenses when
            purchased.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["need", "Need to buy"],
              ["want", "Want to buy"],
              ["purchased", "Purchased"],
            ] as const
          ).map(([key, label]) => (
            <Button
              key={key}
              variant={activeView === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium">Name</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Estimated Amount (INR)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              type="number"
              step="0.01"
              value={form.estimatedAmount}
              onChange={handleChange("estimatedAmount")}
              placeholder="Optional"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Priority</span>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.priority}
              onChange={handleChange("priority")}
            >
              <option value="need">Need</option>
              <option value="want">Want</option>
              <option value="someday">Someday</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">Category (optional)</span>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.category}
              onChange={handleChange("category")}
            >
              <option value="">No category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {capitalize(cat.name)}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium">URL (optional)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.url}
              onChange={handleChange("url")}
              placeholder="Link to product"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="text-sm font-medium">Notes (optional)</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.notes}
              onChange={handleChange("notes")}
              placeholder="Any details to remember"
            />
          </label>
        </div>

        {formError && <div className="text-xs text-red-600">{formError}</div>}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add to Wishlist"}
        </Button>
      </form>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Items</h2>
          {loading && (
            <span className="text-sm text-muted-foreground">Loading...</span>
          )}
          {error && (
            <span className="text-sm text-red-500">{error.message}</span>
          )}
        </div>

        {filteredItems.length === 0 && !loading ? (
          <div className="text-sm text-muted-foreground">No items.</div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filteredItems.map((item: any) => (
              <div key={item.id} className="rounded-lg border p-4 space-y-2">
                {editingId === item.id && editForm ? (
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
                          Estimated Amount
                        </span>
                        <input
                          className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                          type="number"
                          step="0.01"
                          value={editForm.estimatedAmount}
                          onChange={handleEditChange("estimatedAmount")}
                        />
                      </label>
                      <label className="space-y-1">
                        <span className="text-sm font-medium">Priority</span>
                        <select
                          className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                          value={editForm.priority}
                          onChange={handleEditChange("priority")}
                        >
                          <option value="need">Need</option>
                          <option value="want">Want</option>
                          <option value="someday">Someday</option>
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-sm font-medium">Category</span>
                        <select
                          className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                          value={editForm.category}
                          onChange={handleEditChange("category")}
                        >
                          <option value="">No category</option>
                          {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                              {capitalize(cat.name)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-sm font-medium">URL</span>
                        <input
                          className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                          value={editForm.url}
                          onChange={handleEditChange("url")}
                        />
                      </label>
                      <label className="space-y-1 md:col-span-2">
                        <span className="text-sm font-medium">Notes</span>
                        <input
                          className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                          value={editForm.notes}
                          onChange={handleEditChange("notes")}
                        />
                      </label>
                    </div>
                    {editFormError && (
                      <div className="text-xs text-red-600">
                        {editFormError}
                      </div>
                    )}
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setEditForm(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(item)}
                        disabled={updating}
                      >
                        {updating ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Added {formatFullDate(item.created_at)}
                        </div>
                        {item.url && (
                          <a
                            className="text-xs text-primary underline"
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open link
                          </a>
                        )}
                        {item.notes && (
                          <div className="text-xs text-muted-foreground">
                            {item.notes}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-semibold">
                          {item.estimated_amount
                            ? `₹${item.estimated_amount}`
                            : "—"}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full border text-muted-foreground">
                          {capitalize(item.priority)}
                        </span>
                        {item.category_id && (
                          <span className="text-[11px] text-muted-foreground">
                            {categoryNames[item.category_id] ?? ""}
                          </span>
                        )}
                        {item.is_purchased && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            Purchased
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 justify-end">
                      {!item.is_purchased && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToExpenses(item)}
                          disabled={addingToExpensesId === item.id}
                        >
                          {addingToExpensesId === item.id
                            ? "Adding..."
                            : "Add to expenses"}
                        </Button>
                      )}
                      {!item.is_purchased && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(item)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item)}
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
