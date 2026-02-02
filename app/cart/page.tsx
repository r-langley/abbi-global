"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { GlobalNav } from "@/components/global-nav"
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { mockCustomers, type Customer } from "@/lib/customer-data"
import { filterCustomers, isValidCustomerData } from "@/lib/customer-utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const [cartEmpty] = useState(false)
  const [shopForOtherOpen, setShopForOtherOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" })

  useEffect(() => {
    if (cartEmpty) {
      router.push("/")
    }
  }, [cartEmpty, router])

  const filteredCustomers = useMemo(
    () => filterCustomers(mockCustomers, searchQuery),
    [searchQuery]
  )

  const handleStartShopping = () => {
    // Customer selection is handled - close the sheet
    setShopForOtherOpen(false)
  }

  return (
    <>
      {cartEmpty ? null : (
        <>
          <GlobalNav />

          <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-16 max-w-4xl">
              <h1 className="text-4xl font-normal tracking-tight mb-8">Shopping Cart</h1>

              <div className="space-y-6">
                <p className="text-muted-foreground">Cart items will appear here.</p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt="Gentle Cleanser"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-normal mb-1">Gentle Cleanser</h3>
                      <p className="text-sm text-muted-foreground mb-2">Exfoliating Cleansing Foam</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">$42.00</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                            -
                          </Button>
                          <span className="text-sm w-8 text-center">1</span>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Sheet open={shopForOtherOpen} onOpenChange={setShopForOtherOpen}>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="px-6">
                <SheetTitle className="text-2xl font-normal">Shop for Someone Else</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground font-mono">
                  Select an existing customer or add a new one
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-6 px-6 pb-6">
                <div className="space-y-4">
                  <Label htmlFor="customer-search" className="text-sm font-mono">
                    Search Customers
                  </Label>
                  <Input
                    id="customer-search"
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />

                  {searchQuery && filteredCustomers.length > 0 && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredCustomers.map((customer) => (
                        <Card
                          key={customer.id}
                          className={`p-4 cursor-pointer transition-colors ${
                            selectedCustomer?.id === customer.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => {
                            setSelectedCustomer(customer)
                            setShowNewCustomerForm(false)
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{customer.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">{customer.email}</p>
                              {customer.phone && (
                                <p className="text-xs text-muted-foreground font-mono">{customer.phone}</p>
                              )}
                            </div>
                            {selectedCustomer?.id === customer.id && <Badge variant="default">Selected</Badge>}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground font-mono">Or</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowNewCustomerForm(!showNewCustomerForm)
                      setSelectedCustomer(null)
                    }}
                    className="w-full font-mono"
                  >
                    {showNewCustomerForm ? "Cancel" : "Add New Customer"}
                  </Button>

                  {showNewCustomerForm && (
                    <div className="space-y-4 p-4 border border-border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="customer-name" className="text-sm font-mono">
                          Name *
                        </Label>
                        <Input
                          id="customer-name"
                          type="text"
                          placeholder="Customer name"
                          value={newCustomer.name}
                          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer-email" className="text-sm font-mono">
                          Email *
                        </Label>
                        <Input
                          id="customer-email"
                          type="email"
                          placeholder="customer@example.com"
                          value={newCustomer.email}
                          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer-phone" className="text-sm font-mono">
                          Phone
                        </Label>
                        <Input
                          id="customer-phone"
                          type="tel"
                          placeholder="555-0000"
                          value={newCustomer.phone}
                          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleStartShopping}
                    disabled={!selectedCustomer && !isValidCustomerData(newCustomer.name, newCustomer.email)}
                    className="w-full h-12 font-mono uppercase tracking-widest"
                  >
                    Start Shopping
                  </Button>
                  {selectedCustomer && (
                    <p className="text-xs text-muted-foreground font-mono text-center mt-3">
                      Shopping for: {selectedCustomer.name}
                    </p>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  )
}
