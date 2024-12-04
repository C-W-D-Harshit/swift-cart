"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah L.",
    content:
      "I love the quality of BR's products. They're not only stylish but also incredibly comfortable.",
  },
  {
    name: "Michael R.",
    content:
      "The customer service at BR is top-notch! They helped me find the perfect running shoes.",
  },
  {
    name: "Emma T.",
    content:
      "BR's workout gear has become my go-to for all my fitness activities. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <p className="mb-4 italic text-muted-foreground">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <p className="text-right font-medium">- {testimonial.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
