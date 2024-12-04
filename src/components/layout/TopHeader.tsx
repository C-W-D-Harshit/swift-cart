"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const promos = [
  "Free shipping on orders over $100",
  "Use code SUMMER20 for 20% off",
  "New arrivals: Shop the latest collection now",
];

export default function TopHeader() {
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      // initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      // exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black text-white py-2 px-4 text-sm font-medium"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPromo}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-xs sm:text-sm"
          >
            {promos[currentPromo]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
