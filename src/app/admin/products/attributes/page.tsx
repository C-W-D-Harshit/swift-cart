import { Suspense } from "react";

import CreateAttributeDialog from "./_components/CreateAttributeDialog";
import AttributesTable from "./_components/AttributesTable";
import api, { ApiResponse } from "@/lib/api";

function AttributesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Attributes</h1>
        <p className="text-muted-foreground">Manage product attributes</p>
      </div>
      <CreateAttributeDialog />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-10 bg-muted rounded mb-4"></div>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded"></div>
        ))}
      </div>
    </div>
  );
}

async function AttributeTableSuspense() {
  const { data }: { data: ApiResponse } = await api.get("/attributes");
  if (!data.success) {
    throw new Error(data.error);
  }

  return <AttributesTable attributes={data.data} />;
}

export default function AttributesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AttributesHeader />
      <Suspense fallback={<TableSkeleton />}>
        <AttributeTableSuspense />
      </Suspense>
    </div>
  );
}
