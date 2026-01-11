import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface ProductCardProps {
  title: string
  price: number | string
  badge?: string
  href: string
  traits?: string[]
  image?: string
}

export function ProductCard({ title, price, badge, href, traits, image }: ProductCardProps) {
  const displayPrice = typeof price === "number" ? `$${price.toFixed(2)}` : price

  return (
    <Link href={href}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-[3/4] bg-muted">
          {badge && (
            <Badge className="absolute top-4 left-4 z-10 text-background border-0 rounded-xs bg-primary">{badge}</Badge>
          )}
          <Image
            src={image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex flex-col gap-0 px-2 py-2">
          <h3 className="font-normal text-foreground mb-2 tracking-tight text-lg">{title}</h3>
          <p className="mb-4 text-muted-foreground text-base">{displayPrice}</p>
          {traits && traits.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
  )
}
