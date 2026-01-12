import { categories } from "@/lib/product-data"
import CategoryPageClient from "./category-page-client"

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return <CategoryPageClient category={category} />
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}
