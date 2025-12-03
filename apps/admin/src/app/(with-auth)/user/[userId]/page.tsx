import { Suspense } from "react";

import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
import ProductViewPage from "@/features/products/components/product-view-page";

export const metadata = {
  title: "Dashboard : Product View",
};

export default async function Page(props: PageProps<"/user/[userId]">) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={params.userId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
