"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Printer, CopyIcon as Duplicate } from "lucide-react";
import Image from "next/image";

interface OrderDetailsProps {
  orderId: string;
  onClose: () => void;
  order: {
    items: {
      image: string;
      name: string;
      quantity: number;
      price: number;
    }[];
  };
}

export default function OrderDetails({
  orderId,
  onClose,
  order,
}: OrderDetailsProps) {
  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle className="flex items-center justify-between">
            <span>Order {orderId}</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm" variant="outline">
                <Duplicate className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>EH</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Esther Howard</div>
              <div className="text-sm text-muted-foreground">
                brodriquez@gmail.com
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              +1 (415) 555-2671
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        <Tabs defaultValue="order-items">
          <TabsList className="w-full">
            <TabsTrigger value="order-items" className="flex-1">
              Order Items
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex-1">
              Delivery
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex-1">
              Docs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="order-items" className="mt-4 space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="relative size-20">
                  <Image
                    src={item.image}
                    fill
                    alt={item.name}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">{item.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </div>
                  <Badge>Processing</Badge>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>
                  $
                  {order.items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Shipping:</span>
                <span>$12.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>
                  $
                  {(
                    order.items.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) + 12
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="delivery">
            <div className="p-4">
              Delivery information will be displayed here.
            </div>
          </TabsContent>
          <TabsContent value="docs">
            <div className="p-4">
              Order documentation will be displayed here.
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
