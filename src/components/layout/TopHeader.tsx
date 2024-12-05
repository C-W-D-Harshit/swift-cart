"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Array of promotional messages displayed in rotation
const promos = [
  "Free shipping on orders over $100",
  "Use code SUMMER20 for 20% off",
  "New arrivals: Shop the latest collection now",
];

/**
 * TopHeader Component
 * Displays an animated announcement bar with rotating promotional messages
 * Messages transition every 5 seconds with fade and slide animations
 */
export default function TopHeader() {
  // Track current promotional message index
  const [currentPromo, setCurrentPromo] = useState(0);

  // Set up rotation interval for promotional messages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      // Container animation for mounting/unmounting
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-black text-white py-2 px-4 text-sm font-medium"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        {/* AnimatePresence enables exit animations */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPromo}
            // Text slide and fade animations
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
