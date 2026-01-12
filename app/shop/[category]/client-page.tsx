"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GlobalNav } from "@/components/global-nav"
import { ProductCard } from "@/components/product-card"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/product-data"

export default function CategoryClientPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category)
  const [showUnavailable, setShowUnavailable] = useState(false)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(category.slug)

  return (
    <>
      <GlobalNav />
      <main className="container mx-auto p-4">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuCheckboxItem checked={showUnavailable} onCheckedChange={setShowUnavailable}>
                Show unavailable products
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .filter((product) => showUnavailable || product.available)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </main>
    </>
  )
}
