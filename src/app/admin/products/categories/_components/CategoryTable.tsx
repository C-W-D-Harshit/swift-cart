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

interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
  children: Category[];
  products: { id: string }[];
}

const ITEMS_PER_PAGE = 10;

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Clothes",
    description: "All types of clothing",
    imageUrl: null,
    imagePublicId: null,
    isActive: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    parentId: null,
    children: [
      {
        id: "2",
        name: "Clothes for women",
        description: "Women's clothing",
        imageUrl: null,
        imagePublicId: null,
        isActive: true,
        createdAt: new Date("2023-01-02"),
        updatedAt: new Date("2023-01-02"),
        parentId: "1",
        children: [],
        products: [
          { id: "p4" },
          { id: "p5" },
          { id: "p6" },
          { id: "p7" },
          { id: "p8" },
        ],
      },
      {
        id: "3",
        name: "Clothes for Kids",
        description: "Children's clothing",
        imageUrl: null,
        imagePublicId: null,
        isActive: true,
        createdAt: new Date("2023-01-03"),
        updatedAt: new Date("2023-01-03"),
        parentId: "1",
        children: [
          {
            id: "6",
            name: "Fall-Winter 2017",
            description: "Fall and Winter collection for 2017",
            imageUrl: null,
            imagePublicId: null,
            isActive: true,
            createdAt: new Date("2023-01-06"),
            updatedAt: new Date("2023-01-06"),
            parentId: "3",
            children: [],
            products: [],
          },
          {
            id: "7",
            name: "Spring-Summer 2018",
            description: "Spring and Summer collection for 2018",
            imageUrl: null,
            imagePublicId: null,
            isActive: true,
            createdAt: new Date("2023-01-07"),
            updatedAt: new Date("2023-01-07"),
            parentId: "3",
            children: [],
            products: [
              { id: "p14" },
              { id: "p15" },
              { id: "p16" },
              { id: "p17" },
              { id: "p18" },
              { id: "p19" },
              { id: "p20" },
              { id: "p21" },
              { id: "p22" },
            ],
          },
        ],
        products: [],
      },
      {
        id: "8",
        name: "Clothes for men",
        description: "Men's clothing",
        imageUrl: null,
        imagePublicId: null,
        isActive: false,
        createdAt: new Date("2023-01-08"),
        updatedAt: new Date("2023-01-08"),
        parentId: "1",
        children: [],
        products: [
          { id: "p23" },
          { id: "p24" },
          { id: "p25" },
          { id: "p26" },
          { id: "p27" },
          { id: "p28" },
          { id: "p29" },
          { id: "p30" },
          { id: "p31" },
          { id: "p32" },
          { id: "p33" },
          { id: "p34" },
          { id: "p35" },
        ],
      },
    ],
    products: [{ id: "p1" }, { id: "p2" }, { id: "p3" }],
  },
  {
    id: "4",
    name: "Shoes",
    description: "All types of footwear",
    imageUrl: null,
    imagePublicId: null,
    isActive: true,
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
    parentId: null,
    children: [],
    products: [],
  },
  {
    id: "5",
    name: "Health and Beauty",
    description: "Health and beauty products",
    imageUrl: null,
    imagePublicId: null,
    isActive: false,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
    parentId: null,
    children: [],
    products: [
      { id: "p9" },
      { id: "p10" },
      { id: "p11" },
      { id: "p12" },
      { id: "p13" },
    ],
  },
];

export default function CategoryTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [categories, setCategories] = useState<
    (Category & { level: number })[]
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
      categories: Category[],
      level = 0
    ): (Category & { level: number })[] => {
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
    const flattenedCategories = flattenCategories(mockCategories);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = flattenedCategories.slice(
      start,
      start + ITEMS_PER_PAGE
    );
    setCategories(paginatedData);
    setTotalPages(Math.ceil(flattenedCategories.length / ITEMS_PER_PAGE));
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
                  {category.children.length > 0 && (
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
                  <span className="font-medium">{category.name}</span>
                </div>
              </TableCell>
              <TableCell>{category.description || "-"}</TableCell>
              <TableCell>{category.products.length} products</TableCell>
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
