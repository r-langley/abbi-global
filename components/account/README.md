# Account Components

Reusable components for the account page to maintain consistency and reduce duplication.

## Components

### SectionHeader
Consistent section header with optional action button and description.

**Props:**
- `title` (string): Section title
- `action` (ReactNode, optional): Action button or element
- `description` (string, optional): Description text below title

### InfoCard
Card displaying key-value pairs of information.

**Props:**
- `fields` (InfoField[]): Array of {label, value} objects

### OrderCard
Card displaying order information with items and status.

**Props:**
- `orderId` (string): Order ID for linking
- `orderNumber` (string): Display order number
- `date` (string, optional): Order date
- `status` (string): Order status text
- `statusVariant` ("default" | "outline" | "secondary" | "destructive", optional): Badge variant
- `items` (OrderItem[]): Array of order items
- `total` (number): Order total
- `message` (string, optional): Status message
- `isHighlighted` (boolean, optional): Highlighted border
- `showProgress` (boolean, optional): Show progress bar
- `progressPercentage` (number, optional): Progress percentage
- `progressStages` (string[], optional): Progress stage labels
- `currentStage` (number, optional): Current progress stage index

### SubscriptionsTable
Table displaying subscription information.

**Props:**
- `subscriptions` (Subscription[]): Array of subscription objects

**Subscription Type:**
- `id` (string): Subscription ID for linking
- `contractId` (string): Display contract ID
- `customer` (string): Customer name
- `product` (string): Product name
- `price` (number): Subscription price
- `deliveryFrequency` (string): Delivery frequency text
- `status` ("active" | "cancelled"): Subscription status
