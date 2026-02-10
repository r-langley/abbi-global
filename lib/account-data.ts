import type { Subscription } from '@/components/account/subscriptions-table'
import { productData } from './product-data'

// User profile data
export interface UserProfile {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  age: number
  gender: string
  isAmbassador: boolean
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  shippingAddressSameAsHome: boolean
}

export const mockUserProfile: UserProfile = {
  id: 'ABBI-2023-1156',
  name: 'Sarah Miller',
  initials: 'SM',
  email: 'sarah.miller@example.com',
  phone: '+1 (555) 123-4567',
  age: 32,
  gender: 'Female',
  isAmbassador: true,
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
  },
  shippingAddressSameAsHome: true,
}

// Rewards program data
export interface RewardsTier {
  month: number
  discount: number
  perks: string[]
  nextTierMonth?: number
}

export interface RewardsProgress {
  currentMonth: number
  currentTier: RewardsTier
  nextTier: RewardsTier | null
  progress: number // 0-100
  hasReceivedMist: boolean
}

export function getRewardsTier(month: number): RewardsTier {
  if (month === 1) {
    return {
      month: 1,
      discount: 10,
      perks: ['10% off', 'Free shipping at $95'],
      nextTierMonth: 2,
    }
  } else if (month === 2) {
    return {
      month: 2,
      discount: 10,
      perks: ['10% off', 'Free Grape Water Mist'],
      nextTierMonth: 3,
    }
  } else if (month >= 3 && month <= 5) {
    return {
      month,
      discount: 15,
      perks: ['15% off'],
      nextTierMonth: month < 5 ? undefined : 6,
    }
  } else if (month >= 6 && month < 9) {
    return {
      month,
      discount: 20,
      perks: ['20% off'],
      nextTierMonth: 9,
    }
  } else {
    return {
      month,
      discount: 20,
      perks: ['20% off', 'Free shipping'],
      nextTierMonth: undefined,
    }
  }
}

export function getRewardsProgress(): RewardsProgress {
  const currentMonth = 4 // Mock: Customer is on month 4
  const currentTier = getRewardsTier(currentMonth)
  const nextTierMonth = currentMonth < 9 ? (currentMonth < 6 ? 6 : 9) : null
  const nextTier = nextTierMonth ? getRewardsTier(nextTierMonth) : null
  
  // Calculate progress to next major tier (Month 6 or Month 9)
  let progress = 0
  if (currentMonth < 6) {
    progress = ((currentMonth - 1) / 5) * 100 // Progress to month 6
  } else if (currentMonth < 9) {
    progress = ((currentMonth - 6) / 3) * 100 // Progress to month 9
  } else {
    progress = 100 // Max tier reached
  }
  
  return {
    currentMonth,
    currentTier,
    nextTier,
    progress: Math.round(progress),
    hasReceivedMist: currentMonth >= 2,
  }
}

// Ambassador data
export interface Ambassador {
  name: string
  initials: string
  title: string
  email: string
}

export const mockAmbassador: Ambassador = {
  name: 'Jennifer Davis',
  initials: 'JD',
  title: 'Skincare Specialist',
  email: 'jennifer.davis@example.com',
}

// Order data
export interface OrderItem {
  name: string
  image: string
  quantity: number
  price: number
}

export interface Order {
  orderId: string
  orderNumber: string
  date?: string
  status: string
  statusVariant: 'outline' | 'default' | 'secondary'
  items: OrderItem[]
  total: number
  message: string
  isHighlighted?: boolean
  createdBy?: string
  showProgress?: boolean
  progressPercentage?: number
  progressStages?: string[]
  currentStage?: number
}

export const mockOrders: Order[] = [
  {
    orderId: 'PENDING-2023-1256',
    orderNumber: '#PENDING-2023-1256',
    status: 'Awaiting Payment',
    statusVariant: 'outline',
    items: [
      { name: 'Custom Formula', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 1, price: 89.0 },
      { name: 'Nourishing Serum', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 1, price: 52.0 },
    ],
    total: 141.0,
    message: 'Review and confirm this order to proceed with payment',
    isHighlighted: true,
    createdBy: 'Emily Miller (Ambassador)',
  },
  {
    orderId: 'PENDING-2023-1257',
    orderNumber: '#PENDING-2023-1257',
    status: 'Awaiting Payment',
    statusVariant: 'outline',
    items: [{ name: 'Daily Moisturizer', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 2, price: 68.0 }],
    total: 68.0,
    message: 'Review and confirm this order to proceed with payment',
    isHighlighted: true,
    createdBy: 'Emily Miller (Ambassador)',
  },
  {
    orderId: 'GC-2023-1256',
    orderNumber: '#GC-2023-1256',
    date: 'December 20, 2023',
    status: 'In Production',
    statusVariant: 'outline',
    items: [
      { name: 'Gentle Cleanser', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 1, price: 17.89 },
      { name: 'Hyaluronic Serum', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 2, price: 34.0 },
      { name: 'Night Cream', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 1, price: 45.0 },
      { name: 'Vitamin C Concentrate', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 1, price: 28.0 },
    ],
    total: 124.89,
    message: 'Tracking will be available once your order ships',
    showProgress: true,
    progressPercentage: 20,
    progressStages: ['Ordered', 'In Production', 'Shipped', 'In Transit', 'Delivered'],
    currentStage: 0,
  },
  {
    orderId: 'CF-2023-1245',
    orderNumber: '#CF-2023-1245',
    date: 'December 18, 2023',
    status: 'Shipped',
    statusVariant: 'default',
    items: [{ name: 'Custom Formula', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', quantity: 1, price: 89.0 }],
    total: 89.0,
    message: 'Your order is on the way',
    showProgress: true,
    progressPercentage: 60,
    progressStages: ['Ordered', 'In Production', 'Shipped', 'In Transit', 'Delivered'],
    currentStage: 2,
  },
]

// Subscription data
export const mockSubscriptions: Subscription[] = [
  {
    id: '31355011399',
    contractId: '31355011399',
    product: 'Aloe Vera Base',
    productImage: '/minimalist-cosmetic-pump-bottle-cream.jpg',
    price: 89.0,
    deliveryFrequency: 'Every 2 weeks',
    status: 'cancelled',
  },
  {
    id: '34488942919',
    contractId: '34488942919',
    product: 'Hyaluronic Acid Serum',
    productImage: '/minimalist-cosmetic-pump-bottle-cream.jpg',
    price: 34.0,
    deliveryFrequency: 'Every 30 days',
    status: 'cancelled',
  },
  {
    id: '34489270599',
    contractId: '34489270599',
    product: 'Morning Routine Bundle',
    productImage: '/minimalist-cosmetic-pump-bottle-cream.jpg',
    products: [
      { name: 'Custom Formula - Aloe Vera', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', price: 89.0 },
      { name: 'No. 1 Hydration', image: '/minimalist-cosmetic-pump-bottle-cream.jpg', price: 22.0 },
    ],
    price: 111.0,
    deliveryFrequency: 'Every 30 days',
    nextOrderDate: 'Mar 15, 2024',
    status: 'active',
    hasNewRecommendation: true,
    recommendedSwap: {
      current: 'No. 1 Hydration',
      suggested: 'Actif N\u00b020 - Regulation',
      reason: 'Your latest scan shows Regulation (78) as your top concern',
    },
  },
  {
    id: '34520858951',
    contractId: '34520858951',
    product: 'Soothing Revitalizing Oil',
    productImage: '/minimalist-cosmetic-pump-bottle-cream.jpg',
    price: 22.0,
    deliveryFrequency: 'Every 45 days',
    nextOrderDate: 'Mar 28, 2024',
    status: 'active',
  },
  {
    id: '34521284935',
    contractId: '34521284935',
    product: 'Soothing Cleansing Foam',
    productImage: '/minimalist-cosmetic-pump-bottle-cream.jpg',
    price: 38.0,
    deliveryFrequency: 'Every 60 days',
    nextOrderDate: 'Apr 10, 2024',
    status: 'active',
  },
]

// Routine product helpers
export interface RoutineStep {
  product: (typeof productData)[number]
  step: number
  advice: string
  benefits: string[]
  owned: boolean
  source?: 'subscription' | 'order'
}

export function getMorningRoutine(): RoutineStep[] {
  return [
    {
      product: productData.find(p => p.slug === 'exfoliating-cleansing-foam')!,
      step: 1,
      advice: 'Massage gently in circular motions for 60 seconds to activate the cleansing foam',
      benefits: ['Removes overnight impurities', 'Preps skin for product absorption', 'Balances skin pH'],
      owned: false,
    },
    {
      product: productData.find(p => p.slug === 'hyaluronic-acid-plumping-serum')!,
      step: 2,
      advice: 'Apply 2-3 drops while skin is still damp for maximum absorption',
      benefits: ['Plumps fine lines', 'Provides 24-hour hydration', 'Creates moisture barrier'],
      owned: true,
      source: 'subscription',
    },
    {
      product: productData.find(p => p.slug === 'aloe-vera-base')!,
      step: 3,
      advice: 'Apply upward motions from center of face outward, including neck',
      benefits: ['Locks in hydration', 'Soothes sensitivity', 'Protects throughout the day'],
      owned: true,
      source: 'subscription',
    },
  ]
}

export function getEveningRoutine(): RoutineStep[] {
  return [
    {
      product: productData.find(p => p.slug === 'soothing-revitalizing-oil')!,
      step: 1,
      advice: 'Warm between palms and massage into dry skin to dissolve makeup and impurities',
      benefits: ['Gentle makeup removal', 'Nourishes while cleansing', 'Maintains skin barrier'],
      owned: true,
      source: 'subscription',
    },
    {
      product: productData.find(p => p.slug === 'no-1-hydration')!,
      step: 2,
      advice: 'Mix 2-3 drops with your evening cream for boosted hydration',
      benefits: ['Intensifies moisture', 'Enhances cream effectiveness', 'Customizes your routine'],
      owned: false,
    },
    {
      product: productData.find(p => p.slug === 'aloe-vera-base')!,
      step: 3,
      advice: 'Apply generously for overnight repair and regeneration',
      benefits: ['Night repair mode', 'Cellular regeneration', 'Wake up refreshed'],
      owned: true,
      source: 'order',
    },
  ]
}

// Skin scan history data
export interface SkinScanMetric {
  name: string
  value: number
}

export interface SkinTrait {
  name: string
  score: number
  description: string
  color: string
}

export interface SkinScan {
  id: string
  date: string
  shortDate: string
  age: number
  primaryConcern: string
  metrics: SkinScanMetric[]
  recommendations: { name: string; price: number }[]
}

// Color mapping for trait visualization - uses brand chart tokens
const traitColorMap: Record<string, string> = {
  'Sensitivity': 'text-chart-1',
  'Radiance': 'text-chart-2',
  'Hydration': 'text-chart-3',
  'Regulation': 'text-chart-4',
  'Wrinkles': 'text-chart-5',
  'Spots & Acne': 'text-chart-1',
  'Skin Texture': 'text-chart-2',
  'Blemishes': 'text-chart-3',
  'Tone': 'text-chart-4',
  'Texture': 'text-chart-5',
}

const traitDescriptions: Record<string, string> = {
  'Sensitivity': 'In the realm of skincare, sensitivity is a characteristic where the skin reacts swiftly to various stimuli, often leading to redness or irritation.',
  'Radiance': 'Radiance is the quality of skin that shines brightly, often a sign of good health and proper hydration.',
  'Hydration': 'Hydration refers to skin that is adequately moisturized, resulting in a smooth and plump look.',
  'Regulation': 'Regulation measures the skin\'s ability to maintain balance and recover from environmental stressors.',
  'Wrinkles': 'Wrinkles indicate signs of aging where skin tends to react with irritation and discomfort to environmental factors.',
  'Tone': 'Tone reflects the evenness and consistency of skin color across different areas.',
  'Texture': 'Texture describes the smoothness and surface quality of the skin.',
}

export function getTopSkinTraits(scan?: SkinScan): SkinTrait[] {
  if (!scan) {
    scan = mockSkinScans[0]
  }
  
  // Sort metrics by value (lowest scores are "top concerns")
  const sortedMetrics = [...scan.metrics].sort((a, b) => a.value - b.value)
  
  return sortedMetrics.slice(0, 3).map(metric => ({
    name: metric.name,
    score: metric.value,
    description: traitDescriptions[metric.name] || 'A key factor in your skin health.',
    color: traitColorMap[metric.name] || 'text-primary',
  }))
}

export function getAllSkinTraits(scan?: SkinScan): SkinTrait[] {
  if (!scan) {
    scan = mockSkinScans[0]
  }
  
  return scan.metrics.map(metric => ({
    name: metric.name,
    score: metric.value,
    description: traitDescriptions[metric.name] || 'A key factor in your skin health.',
    color: traitColorMap[metric.name] || 'text-primary',
  }))
}

export const mockSkinScans: SkinScan[] = [
  {
    id: 'scan-1',
    date: 'December 15, 2023',
    shortDate: 'Dec 15, 2023',
    age: 26,
    primaryConcern: 'Regulation',
    metrics: [
      { name: 'Radiance', value: 44 },
      { name: 'Hydration', value: 24 },
      { name: 'Spots & Acne', value: 6 },
      { name: 'Skin Texture', value: 0 },
      { name: 'Regulation', value: 78 },
      { name: 'Wrinkles', value: 27 },
      { name: 'Sensitivity', value: 18 },
      { name: 'Blemishes', value: 27 },
    ],
    recommendations: [
      { name: 'Actif N°20 - Regulation', price: 45.0 },
      { name: 'Actif N°22 - Radiance', price: 45.0 },
      { name: 'Soothing Cleansing Foam', price: 38.0 },
    ],
  },
  {
    id: 'scan-2',
    date: 'September 10, 2023',
    shortDate: 'Sep 10, 2023',
    age: 26,
    primaryConcern: 'Hydration',
    metrics: [
      { name: 'Radiance', value: 52 },
      { name: 'Hydration', value: 58 },
      { name: 'Spots & Acne', value: 8 },
      { name: 'Skin Texture', value: 2 },
      { name: 'Regulation', value: 72 },
      { name: 'Wrinkles', value: 30 },
      { name: 'Sensitivity', value: 22 },
      { name: 'Blemishes', value: 24 },
    ],
    recommendations: [
      { name: 'Hydration Boost Serum', price: 52.0 },
      { name: 'Gentle Moisturizer', price: 38.0 },
    ],
  },
]

// Promotions data
export interface Promotion {
  id: string
  title: string
  code?: string
  status: 'active' | 'upcoming' | 'expired'
  expiryDate?: string
  validPeriod?: string
}

export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: '10% Off Your Next Custom Formula',
    code: 'CUSTOM10',
    status: 'active',
    expiryDate: 'January 31, 2024',
  },
  {
    id: 'promo-2',
    title: 'Free Shipping on Orders Over $50',
    status: 'upcoming',
    validPeriod: 'February 1-14, 2024',
  },
]

// Favorite products
export const mockFavoriteProducts = [
  {
    slug: 'hyaluronic-acid-plumping-serum',
    title: 'Hyaluronic Acid Serum',
    price: 34.0,
    href: '/shop/essential/hyaluronic-acid-plumping-serum',
    traits: ['Hydration', 'Wrinkles'],
  },
  {
    slug: 'aloe-vera-base',
    title: 'Aloe Vera Base',
    price: 89.0,
    href: '/shop/in-lab-creams/aloe-vera-base',
    traits: ['Hydration', 'Sensitivity'],
  },
  {
    slug: 'no-1-hydration',
    title: 'No. 1 Hydration',
    price: 22.0,
    href: '/shop/active-concentrate/no-1-hydration',
    traits: ['Hydration'],
  },
]
