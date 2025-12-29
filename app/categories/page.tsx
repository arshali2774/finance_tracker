"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Button as StatefulButton } from "@/components/ui/stateful-button";
import { LoaderOne } from "@/components/ui/loader";
import { DUMMY_USER_ID } from "@/lib/constants";
import { toast } from "sonner";

const GET_CATEGORIES = gql`
  query GetCategoriesManage($userId: UUID!) {
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
  }
`;

const INSERT_CATEGORY = gql`
  mutation InsertCategory($input: categoriesInsertInput!) {
    insertIntocategoriesCollection(objects: [$input]) {
      records {
        id
        name
      }
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: UUID!
    $userId: UUID!
    $set: categoriesUpdateInput!
  ) {
    updatecategoriesCollection(
      set: $set
      filter: { id: { eq: $id }, user_id: { eq: $userId } }
    ) {
      records {
        id
      }
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: UUID!, $userId: UUID!) {
    deleteFromcategoriesCollection(
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
  type: "expense" | "income";
};

const initialForm: FormState = {
  name: "",
  type: "expense",
};

export default function CategoriesPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES, {
    variables: { userId: DUMMY_USER_ID },
    fetchPolicy: "cache-and-network",
  });

  const [insertCategory, { loading: saving }] = useMutation(INSERT_CATEGORY);
  const [updateCategory, { loading: updating }] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory, { loading: deleting }] = useMutation(DELETE_CATEGORY);

  const categories = useMemo(() => {
    return data?.categoriesCollection?.edges?.map((e: any) => e.node) ?? [];
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      await insertCategory({
        variables: {
          input: {
            user_id: DUMMY_USER_ID,
            name: form.name.trim(),
            type: form.type,
            is_system: false,
          },
        },
      });
      toast.success("Category added");
      setForm(initialForm);
      refetch();
    } catch (err: any) {
      toast.error("Add failed", {
        description: err?.message ?? "Could not add category",
      });
    }
  };

  const startEdit = (cat: any) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, type: cat.type ?? "expense" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((prev) =>
        prev ? { ...prev, [field]: e.target.value as any } : prev
      );
    };

  const handleEditSave = async (cat: any) => {
    if (!editForm) return;
    if (!editForm.name.trim()) return;

    try {
      await updateCategory({
        variables: {
          id: cat.id,
          userId: DUMMY_USER_ID,
          set: { name: editForm.name.trim(), type: editForm.type },
        },
      });
      toast.success("Category updated");
      cancelEdit();
      refetch();
    } catch (err: any) {
      toast.error("Update failed", {
        description: err?.message ?? "Could not update category",
      });
    }
  };

  const handleDelete = async (cat: any) => {
    if (cat.is_system) return;
    const ok = window.confirm(`Delete category "${cat.name}"?`);
    if (!ok) return;
    try {
      await deleteCategory({
        variables: { id: cat.id, userId: DUMMY_USER_ID },
      });
      toast.success("Category deleted");
      refetch();
    } catch (err: any) {
      toast.error("Delete failed", {
        description: err?.message ?? "Could not delete category",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage your custom categories. System categories cannot be edited.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium">Name</span>
            <input
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Groceries, Travel"
              required
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium">Type</span>
            <select
              className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
              value={form.type}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  type: e.target.value as FormState["type"],
                }))
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <StatefulButton
            type="button"
            disabled={saving}
            onClick={async (e) => {
              e.preventDefault();
              await handleSubmit(e as any);
            }}
          >
            Add category
          </StatefulButton>
          {saving && <LoaderOne />}
        </div>
      </form>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All categories</h2>
          {loading && <LoaderOne />}
          {error && (
            <span className="text-xs text-red-500">{error.message}</span>
          )}
        </div>

        {categories.length === 0 && !loading ? (
          <div className="text-sm text-muted-foreground">
            No categories yet.
          </div>
        ) : (
          <div className="grid gap-2">
            {categories.map((cat: any) => (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                {editingId === cat.id && editForm ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="grid gap-2 md:grid-cols-2">
                      <input
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.name}
                        onChange={handleEditChange("name")}
                      />
                      <select
                        className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                        value={editForm.type}
                        onChange={handleEditChange("type")}
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={cancelEdit}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(cat)}
                        disabled={updating}
                      >
                        {updating ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <span className="font-semibold">{cat.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {cat.type} {cat.is_system ? "• system" : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!cat.is_system && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(cat)}
                            disabled={deleting}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(cat)}
                            disabled={deleting}
                          >
                            {deleting ? "Deleting..." : "Delete"}
                          </Button>
                        </>
                      )}
                      {cat.is_system && (
                        <span className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          System
                        </span>
                      )}
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
