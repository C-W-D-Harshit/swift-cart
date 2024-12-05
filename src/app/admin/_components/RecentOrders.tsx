import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const recentOrders = [
  {
    id: "1234",
    customer: "John Doe",
    email: "john@example.com",
    amount: "$250.00",
    status: "success",
  },
  {
    id: "1235",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: "$120.00",
    status: "processing",
  },
  {
    id: "1236",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: "$350.00",
    status: "success",
  },
  {
    id: "1237",
    customer: "Alice Brown",
    email: "alice@example.com",
    amount: "$80.00",
    status: "failed",
  },
];

export default function RecentOrders() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${order.email}`}
                  alt={order.customer}
                />
                <AvatarFallback>
                  {order.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.customer}
                </p>
                <p className="text-sm text-muted-foreground">{order.email}</p>
              </div>
              <div className="ml-auto font-medium">{order.amount}</div>
              <div className="ml-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    {
                      "bg-green-100 text-green-800": order.status === "success",
                      "bg-yellow-100 text-yellow-800":
                        order.status === "processing",
                      "bg-red-100 text-red-800": order.status === "failed",
                    }
                  )}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
