import { productData } from "@/lib/product-data"
import ProductPageClient from "./product-page-client"

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product } = await params
  return <ProductPageClient category={category} product={product} />
}

export function generateStaticParams() {
  return productData.map((product) => ({
    category: product.category,
    product: product.slug,
  }))
}
