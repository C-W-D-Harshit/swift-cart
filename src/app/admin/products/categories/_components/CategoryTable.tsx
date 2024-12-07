/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

export default function CategoryTable({
  categoriesData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoriesData: any[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [categories, setCategories] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (any & { level: number })[]
  >([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["1"])
  );
  const [totalPages, setTotalPages] = useState(1);

  const toggleCategory = (categoryId: string) => {
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
    const flattenCategories = (
      categories: any[],
      level = 0
    ): (any & { level: number })[] => {
      return categories.flatMap((category) => {
        const flattenedCategory = { ...category, level };
        if (
          expandedCategories.has(category.id) &&
          category.children.length > 0
        ) {
          return [
            flattenedCategory,
            ...flattenCategories(category.children, level + 1),
          ];
        }
        return [flattenedCategory];
      });
    };
    console.log(categoriesData);
    const flattenedCategories = flattenCategories(categoriesData);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = flattenedCategories.slice(
      start,
      start + ITEMS_PER_PAGE
    );
    setCategories(paginatedData);
    setTotalPages(Math.ceil(flattenedCategories.length / ITEMS_PER_PAGE));
  }, [currentPage, expandedCategories, categoriesData]);

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input placeholder="Search categories" className="max-w-xs" />
          <Button variant="outline">Filters</Button>
        </div>
        <Link href="/admin/products/categories/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Category
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Description</TableHead>
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
                  {category.children?.length > 0 && (
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
                  )}
                  <div className="flex items-center gap-2">
                    <div className="size-12 relative">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className="w-[35rem]"
                title={category.description || ""}
              >
                <span className="line-clamp-1">
                  {category.description || "-"}
                </span>
              </TableCell>
              <TableCell>{category._count.products} products</TableCell>
              <TableCell>
                <Select
                  defaultValue={category.isActive ? "active" : "inactive"}
                >
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
