"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { products } from "../data";
import { FilterStatus, Product, SortConfig } from "../types";
import ProductFilters from "./ProductFilters";
import ProductsTable from "./ProductsTable";
import Link from "next/link";

interface ProductFilters {
  status: FilterStatus;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export default function ProductsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [filters, setFilters] = useState<ProductFilters>({
    status: "all",
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
  });

  // Filter products based on all criteria
  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "in" && product.status === "In Stock") ||
        (filters.status === "low" && product.status === "Low Stock") ||
        (filters.status === "out" && product.status === "Out Of Stock");

      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;

      return matchesSearch && matchesStatus && matchesCategory && matchesPrice;
    });
  };

  // Sort products
  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredProducts = sortProducts(filterProducts(products));

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4 lg:mb-6">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs"
        />
        <ProductFilters products={products} onFilterChange={setFilters} />
      </div>

      <div className="flex-1 overflow-auto">
        <ProductsTable
          products={filteredProducts}
          sortConfig={sortConfig}
          onSort={setSortConfig}
        />
      </div>
    </div>
  );
}
