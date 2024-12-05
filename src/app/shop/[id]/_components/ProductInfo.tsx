"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductInfoProps {
  product: Product;
}

const sizes = ["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"];
const colors = [
  { name: "White", value: "#FFFFFF" },
  { name: "Gray", value: "#808080" },
  { name: "Black", value: "#000000" },
];

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=24&width=24"
            alt={product.brand}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{product.brand}</span>
        </div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < 4
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground"
              )}
            />
          ))}
          <span className="text-sm text-muted-foreground">(87 reviews)</span>
        </div>
      </div>

      <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Color</h3>
          <div className="flex gap-2">
            {colors.map((color) => (
              <motion.button
                key={color.name}
                className={cn(
                  "w-8 h-8 rounded-full border-2",
                  selectedColor === color.value
                    ? "border-primary"
                    : "border-muted"
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
              <motion.button
                key={size}
                className={cn(
                  "px-2 py-1.5 text-sm border rounded",
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-input hover:border-primary"
                )}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button size="lg" className="flex-1">
          Add to cart
        </Button>
        <Button size="lg" variant="outline">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Free delivery on orders over $50.00
      </div>
    </div>
  );
}
