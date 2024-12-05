export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  image: string;
}

export interface Category {
  name: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    name: "Tops",
    subcategories: [
      "Printed T-shirts",
      "Plain T-shirts",
      "Tank",
      "Blouses",
      "Full-sleeve T-shirts",
      "Hoodies",
      "Jumpers",
    ],
  },
  {
    name: "Dress Style",
    subcategories: [
      "Classic",
      "Casual",
      "Business",
      "Sport",
      "Elegant",
      "Formal (evening)",
    ],
  },
];

export const colors = [
  { name: "Purple", value: "#9333EA" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Navy", value: "#1E40AF" },
  { name: "Brown", value: "#92400E" },
  { name: "Green", value: "#22C55E" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Gray", value: "#6B7280" },
  { name: "Pink", value: "#EC4899" },
  { name: "Blue", value: "#3B82F6" },
];

export const sizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  {
    id: "1",
    name: "Black Sweatshirt with Logo",
    description: "Comfortable black sweatshirt with embroidered logo",
    price: 122.0,
    brand: "Nike's Brand",
    category: "Hoodies",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "White T-shirt",
    description: "Classic white t-shirt made from premium cotton",
    price: 31.0,
    brand: "Adidas Brand",
    category: "Plain T-shirts",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Lavender Hoodie with Print",
    description: "Soft lavender hoodie with front print design",
    price: 178.0,
    brand: "Nike's Brand",
    category: "Hoodies",
    image: "/placeholder.svg?height=400&width=400",
  },
  // Add more products as needed
];
