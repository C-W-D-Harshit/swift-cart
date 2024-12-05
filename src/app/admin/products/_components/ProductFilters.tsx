"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterStatus, Product } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filters: ProductFilters) => void;
}

interface ProductFilters {
  status: FilterStatus;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export default function ProductFilters({
  products,
  onFilterChange,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    status: "all",
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
  });
  const [open, setOpen] = useState(false);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleFilterChange = (
    key: keyof ProductFilters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[150px]">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Stock Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                handleFilterChange("status", value as FilterStatus)
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price-range">Price Range</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                id="min-price"
                placeholder="Min"
                className="w-20"
                value={filters.minPrice}
                onChange={(e) =>
                  handleFilterChange("minPrice", parseFloat(e.target.value))
                }
              />
              <span>-</span>
              <Input
                type="number"
                id="max-price"
                placeholder="Max"
                className="w-20"
                value={filters.maxPrice}
                onChange={(e) =>
                  handleFilterChange("maxPrice", parseFloat(e.target.value))
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
