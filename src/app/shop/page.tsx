import { Suspense } from "react";
import { Metadata } from "next";
import { products, categories, colors, sizes } from "@/lib/products";
import ProductFilters from "./_components/ProductFilters";
import MobileFilters from "./_components/MobileFilters";
import ProductSort from "./_components/ProductSort";
import ProductGrid from "./_components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop | BR.",
  description: "Browse our collection of products",
};

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <ProductFilters
            categories={categories}
            colors={colors}
            sizes={sizes}
          />
        </aside>
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <MobileFilters categories={categories} />
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
            <ProductSort />
          </div>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
