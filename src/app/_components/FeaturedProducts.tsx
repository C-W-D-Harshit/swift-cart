"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Reebok Zig Kinetica 3",
    price: 199.0,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.2,
  },
  {
    id: 2,
    name: "Nike Air Max Plus",
    price: 179.0,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Adidas Ultraboost",
    price: 189.0,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Puma RS-X",
    price: 159.0,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            View More
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
