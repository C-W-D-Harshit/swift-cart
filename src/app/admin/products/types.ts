export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out Of Stock" | "Overflow Stock";
  image: string;
  addedDate: string;
}

export type SortConfig = {
  key: keyof Product;
  direction: "asc" | "desc";
};

export type FilterStatus = "all" | "in" | "low" | "out";
