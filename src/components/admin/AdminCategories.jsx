import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import React from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import PageHeader from "../../components/adminSidebaer/PageHeader";
import { useCategoriesSorted } from "../../hooks/useCategoriesSorted";
import { usePagination } from "../../hooks/usePagination";
import Pager from "../../components/loginComponents/Pager";
import { useDeleteCategory } from "../../hooks/useCategoriesMutations";
import ConfirmDialog from "../../components/loginComponents/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { localizeCategory } from "../../utils/localizeContent";

export default function AdminCategories() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();

  const [dir, setDir] = useState(params.get("dir") || "desc");
  const [pageSize, setPageSize] = useState(
    Number(params.get("pageSize") || 10)
  );
  const pageFromUrl = Math.max(1, Number(params.get("page") || 1));

  const [toDelete, setToDelete] = useState(null);

  // fetch
  const {
    data: all = [],
    isLoading,
    isError,
    error,
  } = useCategoriesSorted({
    sortBy: "createdAt",
    dir,
  });

  const {
    paginatedData,
    currentPage,
    totalPages,
    setPage,
    nextPage,
    prevPage,
    rangeStart,
    rangeEnd,
    totalItems,
  } = usePagination(all, pageSize, {
    initialPage: pageFromUrl,
    resetKeys: [dir, pageSize],
    onPageChange: (p) => {
      const next = new URLSearchParams(params.toString());
      next.set("page", String(p));
      setParams(next, { replace: true });
    },
  });

  // keep URL (except page) in sync
  useEffect(() => {
    const next = new URLSearchParams(params.toString());
    next.set("dir", dir);
    next.set("pageSize", String(pageSize));
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir, pageSize]);

  const del = useDeleteCategory();

  const actions = (
    <NavLink
      to="/admin/categories/new"
      className="inline-flex items-center gap-2 rounded-lg bg-[#f0cc17] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f0cc17]"
    >
      <FiPlus /> {t("admin.new_category")}
    </NavLink>
  );

  return (
    <>
      <PageHeader title={t("admin.categories")} actions={actions} />

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[#c8cece]">
          {t("common.total", { defaultValue: "Total" })}:{" "}
          <span className="font-semibold text-gray-900">{all.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
            title={`${t("sort.createdAt")} (${dir.toUpperCase()})`}
          >
            {dir === "asc" ? <FiArrowUp /> : <FiArrowDown />}
            <span className="sr-only">{t("sort.createdAt")}</span>
          </button>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className=" rounded-lg border border-gray-900 bg-[#464949] px-2.5 py-2 text-sm shadow-sm focus:border-[#c9f600] focus:ring-2 focus:ring-[#49BBBD]/20 focus:outline-none"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data states */}
      {isLoading && <Skeleton rows={6} />}
      {isError && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
          {t("errors.categories_load_failed")}:{" "}
          {String(error?.message || "Unknown error")}
        </div>
      )}
      {!isLoading && !isError && all.length === 0 && (
        <EmptyState
          title={t("empty.categories_title")}
          note={t("empty.create_first_category")}
        />
      )}

      {/* ===== Mobile cards ===== */}
      {!isLoading && !isError && all.length > 0 && (
        <div className="space-y-3 md:hidden">
          {paginatedData.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="truncate text-sm font-semibold text-gray-900">
                  {localizeCategory(cat, t)}
                </div>
                <div className="text-[11px] text-gray-500">
                  {formatDate(cat.createdAt)}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <NavLink
                  to={`/admin/categories/${cat.id}/edit`}
                  className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-50"
                  title="Edit"
                >
                  <FiEdit2 />
                </NavLink>
                <button
                  onClick={() => setToDelete({ id: cat.id, name: cat.name })}
                  className="rounded-md border border-gray-200 bg-white p-2 text-rose-600 shadow-sm transition hover:bg-rose-50"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== Desktop table ===== */}
      {!isLoading && !isError && all.length > 0 && (
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-50 text-left text-sm text-gray-600">
                  <Th>{t("admin.categories")}</Th>
                  <Th className="w-40">{t("sort.createdAt")}</Th>
                  <Th className="w-28 text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((cat) => (
                  <tr key={cat.id} className="group">
                    <Td>
                      <div className="font-medium text-gray-900">
                        {localizeCategory(cat, t)}
                      </div>
                    </Td>
                    <Td>{formatDate(cat.createdAt)}</Td>
                    <Td className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <NavLink
                          to={`/admin/categories/${cat.id}/edit`}
                          className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-50"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </NavLink>
                        <button
                          onClick={() =>
                            setToDelete({ id: cat.id, name: cat.name })
                          }
                          className="rounded-md border border-gray-200 bg-white p-2 text-rose-600 shadow-sm transition hover:bg-rose-50"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pager
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={prevPage}
            onNext={nextPage}
            onGo={setPage}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            totalItems={totalItems}
          />
        </div>
      )}

      {/* Confirm delete */}
      <ConfirmDialog
        open={!!toDelete}
        title={t("confirm.delete_category_title", {
          defaultValue: "Delete category?",
        })}
        message={
          toDelete
            ? t("confirm.delete_category_body", {
                defaultValue:
                  "“{{name}}” will be removed. Courses will remain but still reference this categoryId.",
                name: toDelete.name,
              })
            : ""
        }
        confirmText={t("common.delete")}
        confirmTone="danger"
        loading={del.isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          if (!toDelete) return;
          await del.mutateAsync(toDelete.id);
          setToDelete(null);
        }}
      />
    </>
  );
}

/* helpers */
function Th({ children, className = "" }) {
  return (
    <th
      className={`sticky top-0 border-b border-gray-200 px-3 py-2 first:rounded-tl-xl last:rounded-tr-xl ${className}`}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return (
    <td
      className={`border-b border-gray-100 px-3 py-3 align-middle ${className}`}
    >
      {children}
    </td>
  );
}
function formatDate(ts) {
  if (!ts) return "—";
  const ms = ts?.toMillis
    ? ts.toMillis()
    : ts?.seconds
    ? ts.seconds * 1000
    : +new Date(ts);
  return new Date(ms).toLocaleDateString();
}
function Skeleton({ rows = 6 }) {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-3 py-3">
          <div className="h-4 w-40 rounded bg-gray-100" />
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
function EmptyState({ title, note }) {
  return (
    <div className="grid place-items-center rounded-lg border border-gray-200 bg-gray-50/60 p-8 text-center">
      <div className="text-lg font-semibold text-gray-900">{title}</div>
      {note && <div className="mt-1 text-sm text-gray-600">{note}</div>}
    </div>
  );
}
