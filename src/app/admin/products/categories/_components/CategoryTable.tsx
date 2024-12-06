"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  PencilIcon,
  X,
  Check,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  count: number;
  productCount: number;
  status: "active" | "inactive";
  featured: boolean;
  level: number;
  parentId: number | null;
  isExpanded?: boolean;
}

const ITEMS_PER_PAGE = 10;

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Clothes",
    count: 14,
    productCount: 3,
    status: "active",
    featured: false,
    level: 0,
    parentId: null,
  },
  {
    id: 2,
    name: "Clothes for women",
    count: 7,
    productCount: 5,
    status: "inactive",
    featured: true,
    level: 1,
    parentId: 1,
  },
  {
    id: 3,
    name: "Clothes for Kids",
    count: 2,
    productCount: 0,
    status: "active",
    featured: false,
    level: 1,
    parentId: 1,
  },
  {
    id: 4,
    name: "Fall-Winter 2017",
    count: 0,
    productCount: 0,
    status: "active",
    featured: true,
    level: 2,
    parentId: 3,
  },
  {
    id: 5,
    name: "Spring-Summer 2018",
    count: 0,
    productCount: 9,
    status: "active",
    featured: true,
    level: 2,
    parentId: 3,
  },
  {
    id: 6,
    name: "Clothes for men",
    count: 6,
    productCount: 13,
    status: "inactive",
    featured: false,
    level: 1,
    parentId: 1,
  },
  {
    id: 7,
    name: "Clothes",
    count: 12,
    productCount: 0,
    status: "inactive",
    featured: false,
    level: 0,
    parentId: null,
  },
  {
    id: 8,
    name: "Clothes",
    count: 12,
    productCount: 10,
    status: "active",
    featured: true,
    level: 0,
    parentId: null,
  },
  {
    id: 9,
    name: "Shoes",
    count: 15,
    productCount: 0,
    status: "active",
    featured: false,
    level: 0,
    parentId: null,
  },
  {
    id: 10,
    name: "Health and Beauty",
    count: 10,
    productCount: 5,
    status: "inactive",
    featured: true,
    level: 0,
    parentId: null,
  },
  {
    id: 11,
    name: "Ralph Lauren",
    count: 0,
    productCount: 3,
    status: "active",
    featured: false,
    level: 0,
    parentId: null,
  },
  {
    id: 12,
    name: "Alienware",
    count: 0,
    productCount: 11,
    status: "inactive",
    featured: true,
    level: 0,
    parentId: null,
  },
];

export default function CategoryTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set([1])
  );
  const [totalPages, setTotalPages] = useState(1);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  useEffect(() => {
    const visibleCategories = mockCategories.filter((category) => {
      if (category.level === 0) return true;

      let parent = mockCategories.find((c) => c.id === category.parentId);
      while (parent) {
        if (!expandedCategories.has(parent.id)) return false;
        parent = mockCategories.find((c) => c.id === parent?.parentId);
      }
      return true;
    });

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = visibleCategories.slice(
      start,
      start + ITEMS_PER_PAGE
    );
    setCategories(paginatedData);
    setTotalPages(Math.ceil(visibleCategories.length / ITEMS_PER_PAGE));
  }, [currentPage, expandedCategories]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input placeholder="Search" className="max-w-xs" />
        <Button variant="outline">Filters</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div
                  className="flex items-center gap-2"
                  style={{ paddingLeft: `${category.level * 24}px` }}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="p-1 hover:bg-accent rounded-sm"
                  >
                    {expandedCategories.has(category.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  <span className="font-medium">
                    {category.name} ({category.count})
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {category.featured ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell>
                {category.productCount > 0
                  ? `${category.productCount} products`
                  : "-"}
              </TableCell>
              <TableCell>
                <Select defaultValue={category.status}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost">
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push(
              `?${createQueryString("page", String(currentPage - 1))}`
            );
          }}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => {
              router.push(`?${createQueryString("page", String(i + 1))}`);
            }}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push(
              `?${createQueryString("page", String(currentPage + 1))}`
            );
          }}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
