"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AdminWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="outline"
        size="icon"
        className="bg-background shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="h-4 w-4" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 bg-background rounded-lg shadow-lg p-4 w-48"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <h3 className="font-semibold mb-2">Admin Panel</h3>
            <Button className="w-full mb-2" variant="default">
              Go to Dashboard
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
