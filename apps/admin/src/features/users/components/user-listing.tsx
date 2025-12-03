import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth-utils';
import { searchParamsCache } from '@/lib/searchparams';
import { getUsers } from '@repo/actions/users/user-actions.server';

import { UserTable } from './user-tables';
import { columns } from './user-tables/columns';

import type { TGetUsersFilters } from "@repo/actions/users/user-actions.types";

export default async function UserListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("perPage");
  const roles = searchParamsCache.get("roles");

  const filters: TGetUsersFilters = {
    limit: pageLimit,
    page,
    ...(search && { search }),
    ...(roles && { roles }),
  };

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { total, users } = await getUsers(filters);

  console.log("users", total);

  return <UserTable columns={columns} data={[]} totalItems={0} />;
}
