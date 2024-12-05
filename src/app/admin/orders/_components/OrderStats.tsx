"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function OrderStats() {
  return (
    <div className="w-full lg:w-[300px] border-t lg:border-l bg-muted/10 p-4 lg:p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Receipt of Goods</h2>
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-muted-foreground/20"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary"
              strokeWidth="10"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * 0.3}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold">$2.2m</div>
            <div className="text-xs text-muted-foreground">242 orders</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Orders Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm">Paid</div>
                <div className="text-sm font-medium">89%</div>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm">Cancelled</div>
                <div className="text-sm font-medium">8%</div>
              </div>
              <Progress value={8} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm">Refunded</div>
                <div className="text-sm font-medium">3%</div>
              </div>
              <Progress value={3} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Processing time
              </div>
              <div className="font-medium">16 min</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Avg. items/order
              </div>
              <div className="font-medium">1.7</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Pending orders
              </div>
              <div className="font-medium">0.32%</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">Reject rate</div>
              <div className="font-medium">0.51%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Top Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative size-10">
                  <Image
                    fill
                    src="/placeholder.svg?height=40&width=40"
                    alt="Product"
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    Gasoline generator EYG 7500i
                  </div>
                  <div className="text-xs text-muted-foreground">
                    14 units sold
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
