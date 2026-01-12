"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductCardProps {
  title: string
  price: number | string
  badge?: string
  href: string
  traits?: string[]
  image?: string
  onAddToCart?: () => void
}

export function ProductCard({ title, price, badge, href, traits, image, onAddToCart }: ProductCardProps) {
  const displayPrice = typeof price === "number" ? `$${price.toFixed(2)}` : price
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart()
    }
  }

  const hasAddToCart = typeof price === "number" && onAddToCart

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={href}>
        <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-[3/4] bg-muted">
            {badge && (
              <Badge className="absolute top-4 left-4 z-10 text-background border-0 rounded-sm bg-primary">
                {badge}
              </Badge>
            )}
            <Image
              src={image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {isHovered && hasAddToCart && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                <Button
                  onClick={handleAddToCart}
                  variant="secondary"
                  size="lg"
                  className="font-mono uppercase tracking-widest text-xs shadow-lg"
                >
                  Add to Cart
                </Button>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col gap-2">
            <h3 className="font-normal text-foreground tracking-tight text-lg">{title}</h3>
            <p className="text-muted-foreground text-base">{displayPrice}</p>
            {traits && traits.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {traits.map((trait) => (
                  <Badge key={trait} variant="outline" className="text-xs rounded-full">
                    {trait}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </div>
  )
}
