import type { DataTableConfig } from "@/config/data-table";
import type { FilterItemSchema } from "@/lib/parsers";

import type { ColumnSort, Row, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: Interface type parameters required by @tanstack/react-table
  interface ColumnMeta<TData extends RowData, TValue> {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    label?: string;
    options?: Option[];
    placeholder?: string;
    range?: [number, number];
    unit?: string;
    variant?: FilterVariant;
  }
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  variant: "delete" | "update";
}

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
  id: Extract<keyof TData, string>;
}
export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: Extract<keyof TData, string>;
}
export type FilterOperator = DataTableConfig["operators"][number];

export type FilterVariant = DataTableConfig["filterVariants"][number];

export type JoinOperator = DataTableConfig["joinOperators"][number];

export interface Option {
  count?: number;
  description?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}
