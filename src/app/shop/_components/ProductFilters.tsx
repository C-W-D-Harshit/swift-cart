"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Category, colors as colorOptions } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProductFiltersProps {
  categories: Category[];
  colors: typeof colorOptions;
  sizes: string[];
}

export default function ProductFilters({
  categories,
  colors,
  sizes,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div layout>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <motion.div key={category.name} className="space-y-2" layout>
              <h4 className="font-medium">{category.name}</h4>
              {category.subcategories.map((subcat) => (
                <motion.div key={subcat} className="flex items-center" layout>
                  <Checkbox id={`category-${subcat}`} />
                  <Label
                    htmlFor={`category-${subcat}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {subcat}
                  </Label>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div layout>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <Slider
            defaultValue={[70, 400]}
            max={1000}
            min={0}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </motion.div>

      <motion.div layout>
        <h3 className="text-lg font-semibold mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <motion.button
              key={color.name}
              className={cn(
                "w-8 h-8 rounded-full border-2",
                selectedColor === color.value
                  ? "border-primary"
                  : "border-transparent"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() =>
                setSelectedColor(
                  selectedColor === color.value ? "" : color.value
                )
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select ${color.name}`}
              aria-pressed={selectedColor === color.value}
            />
          ))}
        </div>
      </motion.div>

      <motion.div layout>
        <h3 className="text-lg font-semibold mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              className={cn(
                "px-3 py-1 text-sm border rounded-md",
                selectedSize === size
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-input hover:border-primary"
              )}
              onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedSize === size}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
