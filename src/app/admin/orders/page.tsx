import { Metadata } from "next";
import OrdersView from "./_components/OrdersView";

export const metadata: Metadata = {
  title: "Orders | Admin Dashboard",
  description: "Manage and track orders",
};

export default function OrdersPage() {
  return (
    <div className="h-full flex">
      <OrdersView />
    </div>
  );
}
