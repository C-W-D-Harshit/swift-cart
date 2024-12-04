"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const newArrivals = [
  {
    id: 1,
    name: "Summer Collection",
    description: "Discover the latest trends",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    name: "Accessories",
    description: "Complete your look",
    image: "/placeholder.svg?height=600&width=800",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          New Arrivals
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {newArrivals.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-none">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      fill
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/30" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                        {item.name}
                      </h3>
                      <p className="text-foreground/90 mb-4">
                        {item.description}
                      </p>
                      <Button
                        variant="secondary"
                        className="hover:bg-secondary/90"
                      >
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
