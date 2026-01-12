import { productData } from "@/lib/product-data"
import ProductPageClient from "./product-page-client"

export default function ProductPage({ params }: { params: { category: string; product: string } }) {
  return <ProductPageClient params={params} />
}

export function generateStaticParams() {
  return productData.map((product) => ({
    category: product.category,
    product: product.slug,
  }))
}
