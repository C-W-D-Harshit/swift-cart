import { Metadata } from "next";
import CreateProductForm from "./_components/CreateProductForm";

export const metadata: Metadata = {
  title: "Create Product | Admin Dashboard",
  description: "Add a new product to your inventory",
};

export default function CreateProductPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-muted-foreground">
          Add a new product to your inventory
        </p>
      </div>
      <CreateProductForm />
    </div>
  );
}
