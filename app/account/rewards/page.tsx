"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/account/section-header"
import { mockPromotions } from "@/lib/account-data"

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader title="Rewards & Promotions" />

      {/* Promotions */}
      <section>
        <h3 className="text-lg font-normal mb-4">Current Promotions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {mockPromotions.map((promo) => (
            <Card key={promo.id}>
              <CardContent className="p-5">
                <Badge className={promo.status === "active" ? "" : ""}
                  variant={promo.status === "active" ? "default" : "secondary"}
                >
                  {promo.status === "active" ? "Active" : promo.status === "upcoming" ? "Upcoming" : "Expired"}
                </Badge>
                <h3 className="text-lg font-normal mb-1 mt-3">{promo.title}</h3>
                {promo.expiryDate && (
                  <p className="text-xs text-muted-foreground mb-3">Expires {promo.expiryDate}</p>
                )}
                {promo.validPeriod && (
                  <p className="text-xs text-muted-foreground mb-3">Valid {promo.validPeriod}</p>
                )}
                {promo.code && (
                  <div className="bg-muted p-3 rounded font-mono text-center tracking-widest">{promo.code}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Favorites */}
      <section>
        <h3 className="text-lg font-normal mb-4">My Favorite Products</h3>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Your saved favorites will appear here. Browse the shop to add products to your favorites.</p>
          </CardContent>
        </Card>
      </section>

      {/* Product Catalog */}
      <section>
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-normal mb-2">ABBI Product Catalog 2024</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Browse our complete collection of personalized skincare solutions
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
