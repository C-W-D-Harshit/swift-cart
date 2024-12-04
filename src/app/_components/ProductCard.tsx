"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-md border-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-2 sm:p-4">
          <Link
            href={`/products/${product.id}`}
            className="block relative aspect-square mb-2 sm:mb-4 overflow-hidden rounded-md"
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white text-xs sm:text-sm font-medium px-2 py-1 bg-black bg-opacity-50 rounded-full">
                  View Product
                </span>
              </motion.div>
            )}
          </Link>
          <div className="flex justify-between items-start mb-1 sm:mb-2">
            <h3
              className="font-medium text-sm sm:text-base truncate pr-2 sm:pr-4"
              title={product.name}
            >
              {product.name}
            </h3>
            <motion.button
              className="text-gray-400 hover:text-red-500 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                // Add to favorites logic here
              }}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sr-only">Add to favorites</span>
            </motion.button>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm sm:text-lg">
              ${product.price.toFixed(2)}
            </p>
            <div className="text-xs sm:text-sm text-gray-500 flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              {product.rating.toFixed(1)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
