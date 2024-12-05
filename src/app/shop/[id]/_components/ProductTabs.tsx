"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  product: Product;
}

const tabs = [
  { id: "details", label: "Details" },
  { id: "reviews", label: "Reviews" },
  { id: "discussion", label: "Discussion" },
];

const reviews = [
  {
    id: 1,
    author: "Helen M.",
    rating: 5,
    comment: "Excellent running shoes. It turns very sharply on the foot.",
    date: "Yesterday",
  },
  {
    id: 2,
    author: "Ann G.",
    rating: 4,
    comment: "Good shoes",
    date: "2 days ago",
  },
];

const ratingDistribution = [
  { stars: 5, count: 28 },
  { stars: 4, count: 9 },
  { stars: 3, count: 4 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("reviews");

  return (
    <div>
      <div className="border-b">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-4 text-sm font-medium transition-colors hover:text-primary",
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="py-6">
        {activeTab === "reviews" && (
          <div className="space-y-8">
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold">4.8</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-5 w-5",
                            i < 4
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on 43 reviews
                    </div>
                  </div>
                </div>
                {ratingDistribution.map((rating) => (
                  <div
                    key={rating.stars}
                    className="flex items-center gap-2 mb-2"
                  >
                    <div className="w-4">{rating.stars}</div>
                    <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(rating.count / 43) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {rating.count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">
                  Popular brands with discounts
                </h3>
                {/* Add brand discounts content here */}
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "details" && (
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <ul>
              <li>Material: Premium quality materials</li>
              <li>Sole: Rubber outsole for durability</li>
              <li>Closure: Lace-up</li>
              <li>Care instructions: Wipe with a clean, dry cloth</li>
            </ul>
          </div>
        )}
        {activeTab === "discussion" && (
          <div className="text-center py-8 text-muted-foreground">
            No discussions yet. Be the first to start a discussion!
          </div>
        )}
      </div>
    </div>
  );
}
