import type { TUserRole } from "@repo/db/schema/auth.schema";

export const getUserRoles = () => {
  return [
    { label: "User", value: "user" as TUserRole },
    { label: "Admin", value: "admin" as TUserRole },
    { label: "Super Admin", value: "super_admin" as TUserRole },
  ] as const;
};
