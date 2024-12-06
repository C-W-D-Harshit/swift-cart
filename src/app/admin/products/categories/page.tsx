import { Suspense } from "react";
import { TableSkeleton } from "./_components/CategoryTableLoading";
import CategoryTable from "./_components/CategoryTable";

export default function Page() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<TableSkeleton />}>
        <CategoryTable />
      </Suspense>
    </div>
  );
}
