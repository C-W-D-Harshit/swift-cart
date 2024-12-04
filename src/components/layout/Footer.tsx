"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "About BR.",
    content:
      "Your destination for premium sportswear and accessories. Quality meets style in every product.",
  },
  {
    title: "Quick Links",
    links: ["Products", "About Us", "Contact", "FAQ"],
  },
  {
    title: "Follow Us",
    links: ["Facebook", "Twitter", "Instagram"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold mb-4">{section.title}</h3>
              {section.content && (
                <p className="text-sm text-gray-600">{section.content}</p>
              )}
              {section.links && (
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-600 hover:text-black"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 border-none focus-visible:ring-1 focus-visible:ring-black"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-gray-800 transition-colors"
                >
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 pt-8 border-t text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} BR. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
