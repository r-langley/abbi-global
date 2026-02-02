import type { Product } from './product-data'

export interface CartItem {
  id: number
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  purchaseType: 'one-time' | 'subscription'
}

export interface SavedCart {
  id: string
  customerName: string
  customerId: string
  items: CartItem[]
  itemCount: number
  total: number
  savedAt: string
}

/**
 * Calculate cart total with optional subscription discount
 */
export function calculateCartTotal(items: CartItem[], subscriptionDiscount = 0.05): number {
  return items.reduce((sum, item) => {
    const itemPrice = item.price * item.quantity
    const discount = item.purchaseType === 'subscription' ? itemPrice * subscriptionDiscount : 0
    return sum + (itemPrice - discount)
  }, 0)
}

/**
 * Calculate subtotal without discounts
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/**
 * Get total item count in cart
 */
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

/**
 * Add a product to cart
 */
export function addToCart(
  items: CartItem[],
  product: Product,
  purchaseType: 'one-time' | 'subscription' = 'one-time'
): CartItem[] {
  const existingIndex = items.findIndex(
    item => item.productId === product.id && item.purchaseType === purchaseType
  )

  if (existingIndex >= 0) {
    return items.map((item, index) =>
      index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    )
  }

  const newItem: CartItem = {
    id: Date.now(),
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image,
    purchaseType,
  }

  return [...items, newItem]
}

/**
 * Remove item from cart
 */
export function removeFromCart(items: CartItem[], itemId: number): CartItem[] {
  return items.filter(item => item.id !== itemId)
}

/**
 * Update item quantity, removes if quantity is 0 or less
 */
export function updateQuantity(items: CartItem[], itemId: number, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, itemId)
  }
  return items.map(item => (item.id === itemId ? { ...item, quantity } : item))
}

/**
 * Toggle purchase type between one-time and subscription
 */
export function togglePurchaseType(items: CartItem[], itemId: number): CartItem[] {
  return items.map(item =>
    item.id === itemId
      ? { ...item, purchaseType: item.purchaseType === 'subscription' ? 'one-time' : 'subscription' }
      : item
  )
}

/**
 * Create a saved cart object
 */
export function createSavedCart(
  items: CartItem[],
  customerId: string,
  customerName: string
): SavedCart {
  return {
    id: `cart-${Date.now()}`,
    customerId,
    customerName,
    items: [...items],
    itemCount: getCartItemCount(items),
    total: calculateCartTotal(items),
    savedAt: new Date().toISOString(),
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
