"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Package, Download, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const order = {
    id: params.orderId,
    number: "#GC-2023-1256",
    date: "December 20, 2023",
    status: "In Production",
    total: 124.89,
    pv: 98.5,
    cv: 98.5,
    customer: {
      name: "Sarah Miller",
      age: 28,
      email: "sarah.miller@example.com",
      phone: "614-9559945",
    },
    shipping: {
      address: "17302 ASHCOMB WAY",
      city: "ESTERO",
      state: "FL",
      zip: "33928-6473",
      country: "US",
      tracking: "9400136106053286040985",
    },
    items: [
      { name: "Gentle Cleanser", sku: "SKU001", image: "/minimalist-cosmetic-pump-bottle-cream.jpg", price: 17.89, quantity: 1 },
      { name: "Hyaluronic Serum", sku: "SKU002", image: "/minimalist-cosmetic-pump-bottle-cream.jpg", price: 17.0, quantity: 2 },
      { name: "Night Cream", sku: "SKU003", image: "/minimalist-cosmetic-pump-bottle-cream.jpg", price: 45.0, quantity: 1 },
      { name: "Vitamin C Concentrate", sku: "SKU004", image: "/minimalist-cosmetic-pump-bottle-cream.jpg", price: 28.0, quantity: 1 },
    ],
    skinAnalysis: {
      radiance: 44, hydration: 24, spots: 6, texture: 0, regulation: 78, wrinkles: 27, sensitivity: 18, blemishes: 27,
    },
    recommendations: [
      { name: "Actif N\u00b020 - Regulation", sku: "ACT020", price: 45.0 },
      { name: "Actif N\u00b022 - Radiance", sku: "ACT022", price: 45.0 },
      { name: "Actif N\u00b018 - Spots", sku: "ACT018", price: 45.0 },
      { name: "Soothing Cleansing Foam", sku: "CLN001", price: 38.0 },
      { name: "Glowy Serum Eye Zones", sku: "SRM001", price: 65.0 },
    ],
  }

  return (
    <div className="space-y-5">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Orders
      </Link>

      <div className="bg-background rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-lg font-normal">Order {order.number}</h1>
                <Badge variant="outline" className="font-mono text-xs">{order.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                {order.date}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
              {order.shipping.tracking && (
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <ExternalLink className="w-4 h-4" />
                  Track
                </Button>
              )}
            </div>
          </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Customer</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm">{order.customer.name}</p>
                <p className="text-xs text-muted-foreground">Age: {order.customer.age}</p>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Shipping Address</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs text-muted-foreground">
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                <p>{order.shipping.country}</p>
              </div>
              {order.shipping.tracking && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tracking</p>
                  <p className="text-xs font-mono bg-muted px-2 py-1 rounded">{order.shipping.tracking}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Order Items</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 bg-muted rounded-lg">
                  <div className="w-16 h-16 bg-background rounded overflow-hidden flex-shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Skin Analysis Results</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(order.skinAnalysis).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs capitalize">{key}</span>
                    <span className="text-xs font-mono text-muted-foreground">{value}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-recommendation">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Recommended Products</CardTitle>
              <Button variant="outline" size="sm">Add All to Cart</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.recommendations.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-background rounded flex-shrink-0 flex items-center justify-center">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">${product.price.toFixed(2)}</p>
                    <Button size="sm" variant="ghost">+</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
