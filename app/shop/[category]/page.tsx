import { categories } from "@/lib/product-data"
import CategoryPageClient from "./category-page-client"

export default function CategoryPage({ params }: { params: { category: string } }) {
  return <CategoryPageClient params={params} />
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}
