"use client";

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { deleteUser } from '@repo/actions/users/user-actions.client';
import { AppResponseHandler } from '@repo/actions/utils/app-response-handler';

import type { TUser } from "@repo/db/schema/auth.schema";

interface CellActionProps {
  data: TUser;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { user } = useAuth();
  const onConfirm = async () => {
    if (!confirm(`Are you sure you want to delete user "${data.email}"?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteUser(data.id);
      if (AppResponseHandler.isSuccess(result)) {
        toast.success("User deleted successfully");
        router.refresh();
      } else if (AppResponseHandler.isError(result)) {
        toast.error(result.error || "Failed to delete user");
      }
    });
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("User ID copied to clipboard");
  };

  const isSameUser = user!.id === data.id;
  const currentUserRole = user!.userRole;

  // Disable edit/delete if:
  // 1. Same user trying to edit themselves, OR
  // 2. Target user is super_admin AND current user is admin or user (not super_admin)
  const shouldDisableActions = isSameUser || currentUserRole !== "super_admin";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" disabled={isPending} variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" /> Copy User ID
        </DropdownMenuItem>

        {!shouldDisableActions && (
          <DropdownMenuItem onClick={() => router.push(`/users/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit User
          </DropdownMenuItem>
        )}

        {shouldDisableActions && (
          <DropdownMenuItem className="text-muted-foreground" disabled>
            <Edit className="mr-2 h-4 w-4" />
            {isSameUser ? "Cannot edit yourself" : "Cannot edit super admin"}
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {!shouldDisableActions && (
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            disabled={isPending}
            onClick={onConfirm}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete User
          </DropdownMenuItem>
        )}

        {shouldDisableActions && (
          <DropdownMenuItem className="text-muted-foreground" disabled>
            <Trash className="mr-2 h-4 w-4" />
            {isSameUser
              ? "Cannot delete yourself"
              : "Cannot delete super admin"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
