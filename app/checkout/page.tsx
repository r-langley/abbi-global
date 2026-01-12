"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalNav } from "@/components/global-nav"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const [cartItems, setCartItems] = useState([
    { name: "Gentle Cleanser", price: 42.0, qty: 1, purchaseType: "one-time" as const },
    { name: "Hyaluronic Acid Serum", price: 85.0, qty: 1, purchaseType: "subscription" as const },
  ])

  const [shoppingForCustomer, setShoppingForCustomer] = useState<{
    id: string
    name: string
    email: string
    address?: string
    city?: string
    state?: string
    zip?: string
  } | null>(null)

  const [shareCartSuccess, setShareCartSuccess] = useState(false)

  useEffect(() => {
    const customerData = sessionStorage.getItem("shoppingForCustomer")
    if (customerData) {
      const customer = JSON.parse(customerData)
      setShoppingForCustomer(customer)

      // Pre-populate shipping info with customer details
      const [firstName, ...lastNameParts] = customer.name.split(" ")
      setShippingInfo({
        email: customer.email || "",
        firstName: firstName || "",
        lastName: lastNameParts.join(" ") || "",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        zip: customer.zip || "",
      })
    }
  }, [])

  const calculateItemPrice = (item: (typeof cartItems)[0]) => {
    const basePrice = item.price * item.qty
    return item.purchaseType === "subscription" ? basePrice * 0.95 : basePrice
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + calculateItemPrice(item), 0)

  const togglePurchaseType = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              purchaseType: item.purchaseType === "one-time" ? "subscription" : "one-time",
            }
          : item,
      ),
    )
  }

  const handleShareCart = () => {
    // Generate shareable link (in production, this would create a unique cart URL)
    const cartLink = `${window.location.origin}/cart/shared/${Date.now()}`
    navigator.clipboard.writeText(cartLink)
    setShareCartSuccess(true)
    setTimeout(() => setShareCartSuccess(false), 3000)
  }

  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <h1 className="text-4xl font-normal tracking-tight mb-8">Checkout</h1>

          {shoppingForCustomer && (
            <Card className="mb-8 border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-mono text-muted-foreground mb-1">Shopping for</p>
                    <p className="text-lg font-medium">{shoppingForCustomer.name}</p>
                    <p className="text-sm text-muted-foreground">{shoppingForCustomer.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-normal">Shipping Information</CardTitle>
                  {shoppingForCustomer && (
                    <p className="text-sm text-muted-foreground font-mono mt-2">
                      Pre-populated with {shoppingForCustomer.name.split(" ")[0]}'s details
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-mono text-sm">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-mono text-sm">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-mono text-sm">
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="city" className="font-mono text-sm">
                        City
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="font-mono text-sm">
                        State
                      </Label>
                      <Input
                        id="state"
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip" className="font-mono text-sm">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip"
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-normal">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="font-mono text-sm">
                      Card Number
                    </Label>
                    <Input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="font-mono text-sm">
                        Expiry Date
                      </Label>
                      <Input id="expiry" type="text" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="font-mono text-sm">
                        CVV
                      </Label>
                      <Input id="cvv" type="text" placeholder="123" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-medium text-base">ABBI Autoship Benefits</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Save 5% on every autoship order</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Never run out of your favorite products</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Flexible delivery schedule - adjust anytime</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Skip or cancel without penalty</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-normal">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="py-3 border-b border-border space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">Qty: {item.qty}</p>
                        </div>
                        <p className="text-sm font-medium">${calculateItemPrice(item).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`autoship-${index}`}
                          checked={item.purchaseType === "subscription"}
                          onCheckedChange={() => togglePurchaseType(index)}
                        />
                        <Label
                          htmlFor={`autoship-${index}`}
                          className="text-xs font-mono cursor-pointer flex items-center gap-2"
                        >
                          ABBI Autoship (Save 5%)
                          {item.purchaseType === "subscription" && (
                            <Badge variant="default" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </Label>
                      </div>
                    </div>
                  ))}

                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 mt-6 font-mono uppercase tracking-widest">Place Order</Button>

                  {shoppingForCustomer && (
                    <Button variant="ghost" className="w-full font-mono text-sm" onClick={handleShareCart}>
                      {shareCartSuccess ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Cart Link Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                          Share Cart
                        </>
                      )}
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center font-mono mt-4">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
