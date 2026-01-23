"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { categories } from "@/lib/product-data"
import { mockCustomers, type Customer } from "@/lib/customer-data"

interface GlobalNavProps {
  cartOpen?: boolean
  onCartOpenChange?: (open: boolean) => void
  cartItems?: any[]
  onRemoveFromCart?: (itemId: number) => void
  onUpdateQuantity?: (itemId: number, quantity: number) => void
  onTogglePurchaseType?: (itemId: number) => void
  onSaveCart?: () => void
  savedCarts?: any[]
  onLoadCart?: (cartId: string) => void
}

export function GlobalNav({
  cartOpen: externalCartOpen,
  onCartOpenChange,
  cartItems = [],
  onRemoveFromCart,
  onUpdateQuantity,
  onTogglePurchaseType,
  onSaveCart,
  savedCarts = [],
  onLoadCart,
}: GlobalNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [bagMenuOpen, setBagMenuOpen] = useState(false)
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false)
  const [internalCartOpen, setInternalCartOpen] = useState(false)
  const [shopForOtherOpen, setShopForOtherOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" })
  const [shoppingForCustomer, setShoppingForCustomer] = useState<Customer | null>(null)
  const [savedCartsOpen, setSavedCartsOpen] = useState(false)

  useEffect(() => {
    const savedCustomer = sessionStorage.getItem("shoppingForCustomer")
    if (savedCustomer) {
      setShoppingForCustomer(JSON.parse(savedCustomer))
    }
  }, [])

  useEffect(() => {
    if (shoppingForCustomer) {
      sessionStorage.setItem("shoppingForCustomer", JSON.stringify(shoppingForCustomer))
    } else {
      sessionStorage.removeItem("shoppingForCustomer")
    }
  }, [shoppingForCustomer])

  const cartSheetOpen = externalCartOpen !== undefined ? externalCartOpen : internalCartOpen
  const setCartSheetOpen = onCartOpenChange || setInternalCartOpen

  const isLoggedIn = true
  const isAmbassador = true
  const userName = "Sarah"
  const cartItemCount = cartItems.length
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 42.0) * (item.quantity || 1), 0)

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCartSheetOpen(true)
  }

  const handleBagClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCartSheetOpen(true)
  }

  const handleStartShopping = () => {
    if (selectedCustomer) {
      setShoppingForCustomer(selectedCustomer)
    } else if (newCustomer.name && newCustomer.email) {
      const newCustomerObj: Customer = {
        id: Date.now().toString(),
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
      }
      setShoppingForCustomer(newCustomerObj)
    }
    setShopForOtherOpen(false)
    setBagMenuOpen(false)
    setSearchQuery("")
    setSelectedCustomer(null)
    setShowNewCustomerForm(false)
    setNewCustomer({ name: "", email: "", phone: "" })
  }

  const handleClearCustomer = () => {
    setShoppingForCustomer(null)
    sessionStorage.removeItem("shoppingForCustomer")
  }

  return (
    <>
      <div className="bg-primary text-white text-center py-2 px-4">
        <p className="text-xs font-mono tracking-wide font-medium">ENJOY 10% OFF YOUR FIRST ORDER</p>
      </div>

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-80">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse site navigation</SheetDescription>
                  <nav className="flex flex-col gap-4 px-6 py-8">
                    <Link
                      href="/skin-analysis"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Skin Analysis
                    </Link>
                    <Link
                      href="/shop"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Link
                      href="/about"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/join"
                      className="text-lg hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Join
                    </Link>
                    <div className="border-t border-border my-2" />
                    <Link
                      href="/ingredients"
                      className="text-base text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Ingredients
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>

              <nav className="hidden md:flex items-center gap-6 text-sm font-light font-mono">
                <Link href="/skin-analysis" className="hover:text-primary transition-colors font-normal">
                  Science
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <Link href="/shop" className="hover:text-primary transition-colors font-normal">
                    Shop
                  </Link>
                  {megaMenuOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-background border border-border rounded-lg shadow-lg p-6 w-[600px]">
                        <div className="grid grid-cols-2 gap-6">
                          {categories.map((category) => (
                            <Link key={category.slug} href={`/shop/${category.slug}`} className="group flex gap-3">
                              <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                  <Image
                                    src="/minimalist-cosmetic-pump-bottle-cream.jpg"
                                    alt={category.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-sans text-sm font-normal hover:text-primary transition-colors">
                                  {category.name}
                                </div>
                                <div className="text-xs text-muted-foreground font-sans group-hover:text-foreground transition-colors mt-1">
                                  {category.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/about" className="hover:text-primary transition-colors font-normal">
                  About
                </Link>
                <Link href="/join" className="hover:text-primary transition-colors font-normal">
                  Join
                </Link>
              </nav>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="block">
                <Image src="/images/abbi-logo.png" alt="ABBI" width={80} height={32} className="w-auto h-6" />
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => {
                  if (shoppingForCustomer) {
                    setCustomerMenuOpen(true)
                  } else if (isLoggedIn && isAmbassador && cartItemCount === 0) {
                    setBagMenuOpen(true)
                  }
                }}
                onMouseLeave={() => {
                  setCustomerMenuOpen(false)
                  setBagMenuOpen(false)
                }}
              >
                <Button variant="ghost" className="rounded-lg relative gap-2 px-3" onClick={handleBagClick}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z"
                    />
                  </svg>
                  <span className="text-sm font-mono font-normal">
                    {shoppingForCustomer ? shoppingForCustomer.name.split(" ")[0] : "Bag"}
                  </span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>

                {customerMenuOpen && shoppingForCustomer && (
                  <div className="absolute top-full right-0 pt-2">
                    <div className="bg-background border border-border rounded-lg shadow-lg p-3 w-48 space-y-2">
                      <button
                        onClick={() => {
                          setShopForOtherOpen(true)
                          setCustomerMenuOpen(false)
                        }}
                        className="block w-full text-left text-sm font-mono hover:text-primary transition-colors px-2 py-1"
                      >
                        Change Customer
                      </button>
                      <button
                        onClick={() => {
                          handleClearCustomer()
                          setCustomerMenuOpen(false)
                        }}
                        className="block w-full text-left text-sm font-mono hover:text-primary transition-colors px-2 py-1"
                      >
                        Shop for Myself
                      </button>
                    </div>
                  </div>
                )}

                {bagMenuOpen && isLoggedIn && isAmbassador && cartItemCount === 0 && !shoppingForCustomer && (
                  <div className="absolute top-full right-0 pt-2">
                    <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-48">
                      <button
                        onClick={() => {
                          setShopForOtherOpen(true)
                          setBagMenuOpen(false)
                        }}
                        className="block text-sm font-mono hover:text-primary transition-colors"
                      >
                        Shop for Someone Else
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link href={isLoggedIn ? "/account" : "/login"}>
                <Button variant="ghost" className="rounded-lg gap-2 px-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-mono font-normal">{isLoggedIn ? userName : "Account"}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

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
                        selectedCustomer?.id === customer.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
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
                disabled={!selectedCustomer && (!newCustomer.name || !newCustomer.email)}
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

      <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
          <div className="px-6 py-3">
            <SheetTitle className="text-2xl font-normal">
              {shoppingForCustomer ? `Shopping for ${shoppingForCustomer.name}` : "Your Bag"}
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground font-mono">
              {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
            </SheetDescription>
          </div>

          <div className="flex-1 overflow-y-auto px-6 mt-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                  <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={item.image || "/minimalist-cosmetic-pump-bottle-cream.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <Badge
                          variant={item.purchaseType === "subscription" ? "default" : "outline"}
                          className="text-xs mt-1 cursor-pointer"
                          onClick={() => onTogglePurchaseType?.(item.id)}
                        >
                          {item.purchaseType === "subscription" ? "ABBI Autoship (-5%)" : "One-Time"}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded hover:bg-destructive/10"
                        onClick={() => onRemoveFromCart?.(item.id)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded bg-transparent"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                      >
                        <span className="text-xs">-</span>
                      </Button>
                      <span className="text-xs font-mono w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded bg-transparent"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                      >
                        <span className="text-xs">+</span>
                      </Button>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      ${((item.price || 42.0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-normal">${cartTotal.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full h-12 font-mono uppercase tracking-widest">
              <Link href="/checkout">Checkout</Link>
            </Button>
            {isAmbassador && shoppingForCustomer && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full font-mono text-xs text-muted-foreground hover:text-foreground"
                onClick={onSaveCart}
              >
                Save Cart
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={savedCartsOpen} onOpenChange={setSavedCartsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="px-6">
            <SheetTitle className="text-2xl font-normal">Saved Carts</SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground font-mono">
              Load a previously saved cart
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 px-6 space-y-4">
            {savedCarts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No saved carts yet</p>
            ) : (
              savedCarts.map((cart: any) => (
                <Card
                  key={cart.id}
                  className="p-4 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => {
                    onLoadCart?.(cart.id)
                    setSavedCartsOpen(false)
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{cart.customerName}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {cart.itemCount} items • ${cart.total.toFixed(2)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(cart.savedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
