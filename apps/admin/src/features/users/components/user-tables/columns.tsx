import { Mail, Text, UserCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';

import { getUserRoles } from '../../users.utils';
import { CellAction } from './cell-action';

import type { TUser } from "@repo/db/schema/auth.schema";
import type { Column, ColumnDef } from "@tanstack/react-table";

const rolesMap: Record<string, string> = {
  admin: "Admin",
  super_admin: "Super Admin",
  user: "User",
};

const rolesVariantMap = {
  admin: "secondary",
  super_admin: "destructive",
  user: "outline",
} as const;

export const columns: ColumnDef<TUser>[] = [
  {
    cell: ({ row }) => {
      const user = row.original;
      const initials =
        `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

      return (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
          {initials || <UserCheck className="h-4 w-4 text-primary" />}
        </div>
      );
    },
    header: "",
    id: "avatar",
    size: 40,
  },
  {
    accessorKey: "first_name",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex flex-col">
          <div className={`font-medium flex items-center gap-2`}>
            {user.firstName} {user.lastName}
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
    header: ({ column }: { column: Column<TUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    id: "name",
    meta: {
      icon: Text,
      label: "Name",
      placeholder: "Search by name...",
      variant: "text",
    },
  },
  {
    accessorKey: "email",
    cell: ({ cell }) => {
      const email = cell.getValue<string>();
      return (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm">{email}</span>
        </div>
      );
    },
    enableColumnFilter: true,
    header: ({ column }: { column: Column<TUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    id: "email",
    meta: {
      icon: Mail,
      label: "Email",
      placeholder: "Search by email...",
      variant: "text",
    },
  },
  {
    accessorKey: "role",
    cell: ({ cell }) => {
      const roleValue = cell.row.original.userRole;

      return (
        <Badge
          variant={rolesVariantMap[roleValue as keyof typeof rolesVariantMap]}
        >
          {rolesMap[roleValue]}
        </Badge>
      );
    },
    enableColumnFilter: true,
    header: ({ column }: { column: Column<TUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    id: "role",
    meta: {
      label: "Role",
      options: getUserRoles().map((role) => ({
        label: role.label,
        value: role.value.toString(),
      })),
      variant: "select",
    },
  },
  {
    accessorKey: "created_at",
    cell: ({ cell }) => {
      const date = cell.getValue<string>();
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
    header: ({ column }: { column: Column<TUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    id: "created_at",
  },
  {
    accessorKey: "updated_at",
    cell: ({ cell }) => {
      const date = cell.getValue<string>();
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
    header: ({ column }: { column: Column<TUser, unknown> }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    id: "updated_at",
  },
  {
    cell: ({ row }) => <CellAction data={row.original} />,
    id: "actions",
  },
];
