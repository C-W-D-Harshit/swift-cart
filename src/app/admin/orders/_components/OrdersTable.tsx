"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  type: "Shipping" | "Pickups";
  status: "paid" | "pending" | "cancelled";
  items: OrderItem[];
  total: number;
  date: string;
}

const orders: Order[] = [
  {
    id: "#192541",
    customer: {
      name: "Esther Howard",
      email: "esther@example.com",
    },
    type: "Shipping",
    status: "paid",
    items: [
      {
        name: "Shift T5 800 cut-off machine",
        image: "/placeholder.svg?height=40&width=40",
        quantity: 1,
        price: 1890.0,
      },
      {
        name: "Gasoline generator EYG 7500i",
        image: "/placeholder.svg?height=40&width=40",
        quantity: 1,
        price: 1267.0,
      },
    ],
    total: 3157.0,
    date: "Jun 19",
  },
  {
    id: "#192540",
    customer: {
      name: "David Miller",
      email: "david@example.com",
    },
    type: "Pickups",
    status: "paid",
    items: [
      {
        name: "Gasoline generator EYG 7500i",
        image: "/placeholder.svg?height=40&width=40",
        quantity: 1,
        price: 1890.0,
      },
    ],
    total: 1890.0,
    date: "Jun 19",
  },
  // Add more orders as needed
];

interface OrdersTableProps {
  onOrderSelect: (orderId: string) => void;
  selectedOrder: string | null;
}

export default function OrdersTable({
  onOrderSelect,
  selectedOrder,
}: OrdersTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllOrders = () => {
    setSelectedOrders((prev) =>
      prev.length === orders.length ? [] : orders.map((order) => order.id)
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={toggleAllOrders}
              />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className={cn(
                "cursor-pointer",
                selectedOrder === order.id && "bg-muted/50"
              )}
              onClick={() => onOrderSelect(order.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => toggleOrderSelection(order.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.customer.avatar} />
                    <AvatarFallback>
                      {order.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {order.customer.name}
                    </span>
                    <span className="text-xs text-muted-foreground hidden sm:inline-block">
                      {order.customer.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order.type}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "paid"
                      ? "default"
                      : order.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="size-8 relative">
                    <Image
                      fill
                      src={order.items[0].image}
                      alt={order.items[0].name}
                      className="rounded object-cover"
                    />
                  </div>
                  {order.items.length > 1 ? (
                    <div className="flex flex-col">
                      <span className="text-sm truncate max-w-[100px] sm:max-w-[200px]">
                        {order.items[0].name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        +{order.items.length - 1} more items
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm truncate max-w-[100px] sm:max-w-[200px]">
                      {order.items[0].name}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order.date}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
