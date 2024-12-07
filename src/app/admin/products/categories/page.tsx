import { Suspense } from "react";
import { TableSkeleton } from "./_components/CategoryTableLoading";
import CategoryTable from "./_components/CategoryTable";
import api from "@/lib/api";
import { ApiResponse } from "../../../../lib/api";

export const CategoryTableSuspense = async () => {
  const { data }: { data: ApiResponse } = await api.get("/categories");
  const categoriesData = data.data;
  return <CategoryTable categoriesData={categoriesData} />;
};

export default function Page() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<TableSkeleton />}>
        <CategoryTableSuspense />
      </Suspense>
    </div>
  );
}
