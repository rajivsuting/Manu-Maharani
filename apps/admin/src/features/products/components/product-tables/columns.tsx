"use client";
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';

import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

import type { Product } from "@/constants/data";

import type { Column, ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "photo_url",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            alt={row.getValue("name")}
            className="rounded-lg"
            fill
            src={row.getValue("photo_url")}
          />
        </div>
      );
    },
    header: "IMAGE",
  },
  {
    accessorKey: "name",
    cell: ({ cell }) => <div>{cell.getValue<Product["name"]>()}</div>,
    enableColumnFilter: true,
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    id: "name",
    meta: {
      icon: Text,
      label: "Name",
      placeholder: "Search products...",
      variant: "text",
    },
  },
  {
    accessorKey: "category",
    cell: ({ cell }) => {
      const status = cell.getValue<Product["category"]>();
      const Icon = status === "active" ? CheckCircle2 : XCircle;

      return (
        <Badge className="capitalize" variant="outline">
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    id: "category",
    meta: {
      label: "categories",
      options: CATEGORY_OPTIONS,
      variant: "multiSelect",
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },

  {
    cell: ({ row }) => <CellAction data={row.original} />,
    id: "actions",
  },
];
