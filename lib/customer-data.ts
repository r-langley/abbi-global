export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  addedDate: string
}

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Jessica Chen",
    email: "jessica.chen@example.com",
    phone: "555-0123",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90012",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Torres",
    email: "m.torres@example.com",
    phone: "555-0456",
    address: "456 Oak Ave",
    city: "San Diego",
    state: "CA",
    zip: "92101",
    addedDate: "2024-02-20",
  },
  { id: "3", name: "Emily Rodriguez", email: "emily.r@example.com", addedDate: "2024-03-10" },
]
