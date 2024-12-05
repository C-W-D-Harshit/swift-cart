import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductGallery from "./_components/Productgallery";
import ProductInfo from "./_components/ProductInfo";
import ProductTabs from "./_components/ProductTabs";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-2/3">
          <ProductGallery
            images={[
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
              "/placeholder.svg?height=600&width=600",
            ]}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductTabs product={product} />
    </div>
  );
}
