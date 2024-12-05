"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterDropdownProps {
  filterType: string;
  filterStatus: string;
  filterDate: string;
  onFilterTypeChange: (value: string) => void;
  onFilterStatusChange: (value: string) => void;
  onFilterDateChange: (value: string) => void;
}

export function FilterDropdown({
  filterType,
  filterStatus,
  filterDate,
  onFilterTypeChange,
  onFilterStatusChange,
  onFilterDateChange,
}: FilterDropdownProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto lg:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select value={filterType} onValueChange={onFilterTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="pickup">Pickup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={filterStatus} onValueChange={onFilterStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Select value={filterDate} onValueChange={onFilterDateChange}>
              <SelectTrigger>
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
      </SheetContent>
    </Sheet>
  );
}
