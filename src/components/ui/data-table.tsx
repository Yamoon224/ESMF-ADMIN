"use client";

import { useMemo, useState, type ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "left" | "right" | "center";
  /** Featured column shown as the card title on mobile (defaults to the first column). */
  mobilePrimary?: boolean;
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

  const primaryColumn = columns.find((c) => c.mobilePrimary) ?? columns[0];
  const secondaryColumns = columns.filter((c) => c.key !== primaryColumn?.key);

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
    <div className="rounded-2xl border border-esmf-border bg-esmf-surface shadow-sm">
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
            className="w-full max-w-xs rounded-lg border border-esmf-border px-3 py-2 text-sm outline-none focus-visible:border-esmf-primary focus-visible:ring-2 focus-visible:ring-esmf-primary/15"
          />
        ) : (
          <span />
        )}
        {toolbarExtra}
      </div>

      {/* Desktop / tablet: real table. */}
      <div className="esmf-scroll hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-esmf-border bg-esmf-bg/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-[11.5px] font-semibold tracking-wide text-esmf-text-muted uppercase ${ALIGN_CLASSES[column.align ?? "left"]} ${
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

      {/* Mobile: stacked cards — a table forced into a viewport this narrow is unreadable, not "responsive". */}
      <div className="divide-y divide-esmf-border md:hidden">
        {paginated.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-esmf-text-muted">{emptyMessage}</p>
        )}
        {paginated.map((row) => (
          <button
            type="button"
            key={rowKey(row)}
            onClick={() => onRowClick?.(row)}
            disabled={!onRowClick}
            className={`w-full px-4 py-3.5 text-left ${onRowClick ? "active:bg-esmf-bg/70" : "cursor-default"}`}
          >
            {primaryColumn && <div className="text-sm">{primaryColumn.render(row)}</div>}
            {secondaryColumns.length > 0 && (
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {secondaryColumns.map((column) => (
                  <div key={column.key} className="min-w-0">
                    <dt className="text-[10.5px] font-medium tracking-wide text-esmf-text-muted uppercase">
                      {column.header}
                    </dt>
                    <dd className="mt-0.5 truncate text-[13px] text-esmf-text">{column.render(row)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </button>
        ))}
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
            className="rounded-lg border border-esmf-border px-2.5 py-1 font-medium disabled:opacity-40"
          >
            Précédent
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border border-esmf-border px-2.5 py-1 font-medium disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
