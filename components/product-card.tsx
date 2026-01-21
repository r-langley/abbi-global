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
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block h-full"
    >
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative aspect-[3/4] bg-muted">
          {badge && (
            <Badge className="absolute top-4 left-4 z-10 text-background border-0 rounded-sm bg-primary">{badge}</Badge>
          )}
          <Image
            src={image || "/images/custom-cream-alya.jpg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-normal text-foreground tracking-tight text-base leading-tight line-clamp-2 min-h-[2.5rem]">{title}</h3>
          <p className="text-muted-foreground text-sm font-mono">{displayPrice}</p>
          {traits && traits.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {traits.slice(0, 3).map((trait) => (
                <Badge key={trait} variant="outline" className="text-xs rounded-full px-2 py-0.5">
                  {trait}
                </Badge>
              ))}
            </div>
          )}

          {hasAddToCart && (
            <div className="mt-auto pt-2">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-widest text-xs md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "400ms",
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
