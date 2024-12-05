import { Metadata } from "next";
import ProductsView from "./_components/ProductsView";

export const metadata: Metadata = {
  title: "Products | Admin Dashboard",
  description: "Manage and track products inventory",
};

export default function ProductsPage() {
  return (
    <div className="h-full flex">
      <ProductsView />
    </div>
  );
}
