"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Women", href: "/women" },
  { name: "Men", href: "/men" },
  { name: "Kids", href: "/kids" },
  { name: "Sports", href: "/sports" },
  { name: "Brands", href: "/brands" },
  { name: "New", href: "/new" },
  { name: "Sale", href: "/sale" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      className="border-b py-4 bg-white"
      // initial={{ opacity: 0, y: -10 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/" className="text-2xl font-bold">
              Swift-Cart
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium hover:text-black/70 transition-colors ${
                    item.name === "Sale"
                      ? "text-red-500 hover:text-red-600"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <form className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search"
                className="w-[200px] pl-9 pr-4 py-2 text-sm bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-black"
              />
            </form>

            <div className="flex items-center space-x-2">
              {[ShoppingCart, Heart, User].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={
                      index === 2
                        ? "/account"
                        : index === 1
                        ? "/wishlist"
                        : "/cart"
                    }
                    className="block"
                  >
                    <Button variant="ghost" size="icon" className="relative">
                      <Icon className="h-5 w-5" />
                      {Icon === ShoppingCart && (
                        <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                          2
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium hover:text-black/70 transition-colors ${
                      item.name === "Sale"
                        ? "text-red-500 hover:text-red-600"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <form className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-black"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
