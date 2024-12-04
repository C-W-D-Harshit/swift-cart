"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const categories = [
  { name: "Women", image: "/placeholder.svg?height=600&width=400" },
  { name: "Men", image: "/placeholder.svg?height=600&width=400" },
  { name: "Kids", image: "/placeholder.svg?height=600&width=400" },
  { name: "Sports", image: "/placeholder.svg?height=600&width=400" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${category.name.toLowerCase()}`}>
                <Card className="overflow-hidden border-none">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5] sm:aspect-[2/3]">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                        <h3 className="text-base sm:text-xl font-semibold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
