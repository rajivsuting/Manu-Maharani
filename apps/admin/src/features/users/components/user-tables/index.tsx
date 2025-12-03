"use client";

import { parseAsInteger, useQueryState } from 'nuqs';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';

import type { ColumnDef } from "@tanstack/react-table";

interface UserTableParams<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalItems: number;
}

export function UserTable<TData, TValue>({
  columns,
  data,
  totalItems,
}: UserTableParams<TData, TValue>) {
  const [pageSize] = useQueryState("perPage", parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    columns, // User columns
    data, // User data
    debounceMs: 500,
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
