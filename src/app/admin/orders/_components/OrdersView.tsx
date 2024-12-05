"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Import, ImportIcon as Export } from "lucide-react";
import OrdersTable from "./OrdersTable";
import OrderStats from "./OrderStats";
import OrderDetails from "./OrderDetails";
import { FilterDropdown } from "./FilterDropdown";

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

export default function OrdersView() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 gap-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FilterDropdown
              filterType={filterType}
              filterStatus={filterStatus}
              filterDate={filterDate}
              onFilterTypeChange={setFilterType}
              onFilterStatusChange={setFilterStatus}
              onFilterDateChange={setFilterDate}
            />
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Import className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Export className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-4 lg:mb-6">
          <div className="w-full">
            <Input placeholder="Search orders..." className="w-full" />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Order date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <OrdersTable
            onOrderSelect={(order) =>
              setSelectedOrder(orders.find((o) => o.id === order) || null)
            }
            selectedOrder={selectedOrder?.id ?? null}
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <OrderStats />
      </div>

      {selectedOrder && (
        <OrderDetails
          orderId={selectedOrder.id}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
