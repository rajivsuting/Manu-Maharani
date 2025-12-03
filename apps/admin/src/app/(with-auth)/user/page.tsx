import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense } from "react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import UserListingPage from "@/features/users/components/user-listing";
import { searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Dashboard: Users",
};

export default async function Page(props: PageProps<"/user">) {
  const searchParams = await props.searchParams;

  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading description="Manage users" title="Users" />
          <Link
            className={cn(buttonVariants(), "text-xs md:text-sm")}
            href="/user/new"
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} filterCount={2} rowCount={8} />
          }
        >
          <UserListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
