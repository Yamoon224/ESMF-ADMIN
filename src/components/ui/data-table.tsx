"use client";

import { useMemo, useState, type ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  searchText?: (row: T) => string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  toolbarExtra?: ReactNode;
}

type SortDirection = "asc" | "desc" | null;

const ALIGN_CLASSES: Record<NonNullable<DataTableColumn<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  searchPlaceholder = "Rechercher...",
  searchText,
  pageSize = 8,
  onRowClick,
  emptyMessage = "Aucun résultat.",
  toolbarExtra,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!searchText || !query.trim()) return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) => searchText(row).toLowerCase().includes(q));
  }, [data, query, searchText]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    const column = columns.find((c) => c.key === sortKey);
    if (!column?.sortValue) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = column.sortValue!(a);
      const bv = column.sortValue!(b);
      if (av === bv) return 0;
      const result = av > bv ? 1 : -1;
      return sortDir === "asc" ? result : -result;
    });
    return copy;
  }, [filtered, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(column: DataTableColumn<T>) {
    if (!column.sortValue) return;
    if (sortKey !== column.key) {
      setSortKey(column.key);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
  }

  return (
    <div className="rounded-xl border border-esmf-border bg-esmf-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-esmf-border p-3">
        {searchText ? (
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full max-w-xs rounded-md border border-esmf-border px-3 py-2 text-sm outline-none focus:border-esmf-primary"
          />
        ) : (
          <span />
        )}
        {toolbarExtra}
      </div>

      <div className="esmf-scroll overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-esmf-border bg-esmf-bg/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 font-semibold text-esmf-text-muted ${ALIGN_CLASSES[column.align ?? "left"]} ${
                    column.sortValue ? "cursor-pointer select-none hover:text-esmf-primary" : ""
                  }`}
                  onClick={() => toggleSort(column)}
                >
                  <span className="inline-flex items-center gap-1">
                    {column.header}
                    {column.sortValue && sortKey === column.key && sortDir && (
                      <span aria-hidden>{sortDir === "asc" ? "▲" : "▼"}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-esmf-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {paginated.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-esmf-border last:border-0 ${
                  onRowClick ? "cursor-pointer hover:bg-esmf-bg/70" : ""
                }`}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-3 ${ALIGN_CLASSES[column.align ?? "left"]}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-esmf-border p-3 text-xs text-esmf-text-muted">
        <span>
          {sorted.length} résultat{sorted.length > 1 ? "s" : ""} — page {currentPage}/{totalPages}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-esmf-border px-2.5 py-1 font-medium disabled:opacity-40"
          >
            Précédent
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-esmf-border px-2.5 py-1 font-medium disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
