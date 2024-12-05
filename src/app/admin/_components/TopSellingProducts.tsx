import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const topSellingProducts = [
  {
    id: 1,
    name: "Premium Sports Shoes",
    category: "Footwear",
    sales: 1234,
    revenue: 61700,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    category: "Electronics",
    sales: 1000,
    revenue: 50000,
  },
  { id: 3, name: "Yoga Mat", category: "Fitness", sales: 950, revenue: 28500 },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    sales: 850,
    revenue: 127500,
  },
  {
    id: 5,
    name: "Running Shorts",
    category: "Apparel",
    sales: 800,
    revenue: 24000,
  },
];

export default function TopSellingProducts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topSellingProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right">
                  ${product.revenue.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
