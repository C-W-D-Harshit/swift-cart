"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Summer Sale
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get 20% off on all summer essentials. Use code: SUMMER20
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3"
            >
              Shop the Sale
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
