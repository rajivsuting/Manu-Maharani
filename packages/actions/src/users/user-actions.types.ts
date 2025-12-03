import type { TUserRole } from "@repo/db/schema/auth.schema";

export type TGetUsersFilters = {
  limit?: number;
  page?: number;
  roles?: TUserRole[];
  search?: string;
};
