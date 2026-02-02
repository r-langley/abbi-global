import type { Customer } from './customer-data'

/**
 * Filter customers by search query (name or email)
 */
export function filterCustomers(customers: Customer[], query: string): Customer[] {
  if (!query.trim()) return []

  const normalizedQuery = query.toLowerCase().trim()

  return customers.filter(
    customer =>
      customer.name.toLowerCase().includes(normalizedQuery) ||
      customer.email.toLowerCase().includes(normalizedQuery)
  )
}

/**
 * Get customer initials for avatar display
 */
export function getCustomerInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Format customer display name (first name only for short contexts)
 */
export function getShortName(name: string): string {
  return name.split(' ')[0]
}

/**
 * Create a new customer object
 */
export function createCustomer(
  name: string,
  email: string,
  phone?: string
): Customer {
  return {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim(),
    addedDate: new Date().toISOString().split('T')[0],
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check if customer form data is valid
 */
export function isValidCustomerData(name: string, email: string): boolean {
  return name.trim().length > 0 && isValidEmail(email)
}
