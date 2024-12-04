"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const featuredProducts = [
  {
    name: "Zig Kinetica 3",
    description: "Experience unparalleled comfort and style",
    image: "/placeholder.svg?height=800&width=600",
  },
  {
    name: "Nano X3",
    description: "Versatile training shoe for any workout",
    image: "/placeholder.svg?height=800&width=600",
  },
  {
    name: "Classic Leather",
    description: "Timeless style meets modern comfort",
    image: "/placeholder.svg?height=800&width=600",
  },
];

export default function Hero() {
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Elevate Your Style
              <br />
              <motion.span
                className="text-4xl sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                This Season
              </motion.span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md">
              Discover our latest collection of trendsetting sportswear and
              accessories. Be bold, be you.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10" />
            <AnimatePresence mode="wait">
              <motion.img
                key={currentProduct}
                src={featuredProducts[currentProduct].image}
                alt={featuredProducts[currentProduct].name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                Featured: {featuredProducts[currentProduct].name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 sm:mb-3">
                {featuredProducts[currentProduct].description}
              </p>
              <Button variant="shine">
                Shop Now <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
            <div className="absolute top-4 right-4 flex space-x-2 z-20">
              {featuredProducts.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentProduct(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentProduct ? "bg-primary" : "bg-primary/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`View product ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
