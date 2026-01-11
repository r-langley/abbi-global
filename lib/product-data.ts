export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: string
  traits: string[]
  description: string
  recommended?: boolean
}

export const productData: Product[] = [
  // In-Lab Creams
  {
    id: "1",
    slug: "aloe-vera-base",
    name: "Aloe Vera Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Hydration", "Sensitivity"],
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
    recommended: true,
  },
  {
    id: "2",
    slug: "apple-stem-cells-base",
    name: "Apple Stem Cells Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Wrinkles", "Radiance"],
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
    recommended: true,
  },
  {
    id: "3",
    slug: "honey-shea-butter-base",
    name: "Honey & Shea Butter Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Hydration", "Sensitivity"],
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
  },
  {
    id: "4",
    slug: "selenium-vitamin-c-base",
    name: "Selenium & Vitamin C Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Radiance", "Spots"],
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
    recommended: true,
  },
  {
    id: "5",
    slug: "peptide-complex-base",
    name: "Peptide Complex Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Wrinkles", "Texture"],
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
  },

  // Mix at Home Cream
  {
    id: "6",
    slug: "velvety-cream",
    name: "Velvety Cream",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Hydration", "Texture"],
    description: "Customizable bases to personalize with active concentrates",
    recommended: true,
  },
  {
    id: "7",
    slug: "mattifying-velvety-cream",
    name: "Mattifying Velvety Cream",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Shine", "Texture"],
    description: "Customizable bases to personalize with active concentrates",
  },
  {
    id: "8",
    slug: "smooth-cream",
    name: "Smooth Cream",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Texture", "Radiance"],
    description: "Customizable bases to personalize with active concentrates",
  },
  {
    id: "9",
    slug: "creamy-cream",
    name: "Creamy Cream",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Hydration", "Sensitivity"],
    description: "Customizable bases to personalize with active concentrates",
  },

  // Active Concentrate
  {
    id: "10",
    slug: "no-1-hydration",
    name: "No. 1 Hydration",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Hydration"],
    description: "Add to mix-at-home bases to customize your routine",
    recommended: true,
  },
  {
    id: "11",
    slug: "no-2-wrinkles",
    name: "No. 2 Wrinkles",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Wrinkles"],
    description: "Add to mix-at-home bases to customize your routine",
    recommended: true,
  },
  {
    id: "12",
    slug: "no-3-radiance",
    name: "No. 3 Radiance",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Radiance", "Spots"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "13",
    slug: "no-4-imperfections",
    name: "No. 4 Imperfections",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Imperfections"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "14",
    slug: "no-5-spots",
    name: "No. 5 Spots",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Spots", "Radiance"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "15",
    slug: "no-6-sensitivity",
    name: "No. 6 Sensitivity",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Sensitivity"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "16",
    slug: "no-7-shine",
    name: "No. 7 Shine",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Shine"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "17",
    slug: "no-8-texture",
    name: "No. 8 Texture",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Texture"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "18",
    slug: "no-9-firmness",
    name: "No. 9 Firmness",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Wrinkles", "Texture"],
    description: "Add to mix-at-home bases to customize your routine",
  },
  {
    id: "19",
    slug: "no-10-protection",
    name: "No. 10 Protection",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Radiance", "Wrinkles"],
    description: "Add to mix-at-home bases to customize your routine",
  },

  // Essential
  {
    id: "20",
    slug: "collagen-firming-serum",
    name: "Collagen Firming Serum",
    price: 32.0,
    category: "essential",
    traits: ["Wrinkles", "Texture"],
    description: "Serums, cleansers, and complementary treatments",
    recommended: true,
  },
  {
    id: "21",
    slug: "hyaluronic-acid-plumping-serum",
    name: "Hyaluronic Acid Plumping Serum",
    price: 34.0,
    category: "essential",
    traits: ["Hydration", "Wrinkles"],
    description: "Serums, cleansers, and complementary treatments",
    recommended: true,
  },
  {
    id: "22",
    slug: "exfoliating-cleansing-foam",
    name: "Exfoliating Cleansing Foam",
    price: 17.89,
    category: "essential",
    traits: ["Texture", "Imperfections"],
    description: "Serums, cleansers, and complementary treatments",
  },
  {
    id: "23",
    slug: "soothing-revitalizing-oil",
    name: "Soothing and Revitalizing Oil",
    price: 36.0,
    category: "essential",
    traits: ["Sensitivity", "Radiance"],
    description: "Serums, cleansers, and complementary treatments",
  },
  {
    id: "24",
    slug: "radiance-eye-contour-serum",
    name: "Radiance Eye Contour Serum",
    price: 29.0,
    category: "essential",
    traits: ["Radiance", "Wrinkles"],
    description: "Serums, cleansers, and complementary treatments",
  },

  // Simple Solution
  {
    id: "25",
    slug: "clear-intentions",
    name: "Clear Intentions",
    price: 59.95,
    category: "simple-solution",
    traits: ["Imperfections"],
    description: "Complete focused care kit targeting blemishes",
  },
  {
    id: "26",
    slug: "defy-gravity",
    name: "Defy Gravity",
    price: 89.9,
    category: "simple-solution",
    traits: ["Wrinkles", "Texture"],
    description: "Complete focused care kit for firmness & elasticity",
  },
  {
    id: "27",
    slug: "peace-out-redness",
    name: "Peace Out, Redness",
    price: 59.95,
    category: "simple-solution",
    traits: ["Sensitivity"],
    description: "Complete focused care kit for soothing sensitivity",
  },
  {
    id: "28",
    slug: "radiance-ritual",
    name: "Radiance Ritual",
    price: 59.95,
    category: "simple-solution",
    traits: ["Radiance", "Wrinkles"],
    description: "Complete focused care kit for dullness & aging",
  },
  {
    id: "29",
    slug: "sun-undo",
    name: "Sun Undo",
    price: 59.95,
    category: "simple-solution",
    traits: ["Spots", "Radiance"],
    description: "Complete focused care kit for sun damage repair",
  },
  {
    id: "30",
    slug: "the-golden-standard",
    name: "The Golden Standard",
    price: 59.95,
    category: "simple-solution",
    traits: ["Radiance"],
    description: "Complete focused care kit for natural tanning",
  },
  {
    id: "31",
    slug: "the-smooth-operator",
    name: "The Smooth Operator",
    price: 69.95,
    category: "simple-solution",
    traits: ["Wrinkles"],
    description: "Complete focused care kit for wrinkle reduction",
  },
  {
    id: "32",
    slug: "thirst-aid-kit",
    name: "Thirst Aid Kit",
    price: 59.95,
    category: "simple-solution",
    traits: ["Hydration"],
    description: "Complete focused care kit for deep hydration",
  },
]

export const categories = [
  {
    slug: "in-lab-creams",
    name: "In-Lab Creams",
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
  },
  {
    slug: "mix-at-home",
    name: "Mix at Home Cream",
    description: "Customizable bases to personalize with active concentrates",
  },
  {
    slug: "active-concentrate",
    name: "Active Concentrate",
    description: "Add to mix-at-home bases to customize your routine",
  },
  { slug: "essential", name: "Essential", description: "Serums, cleansers, and complementary treatments" },
  {
    slug: "simple-solution",
    name: "Simple Solution",
    description: "Complete focused care kits for specific skin concerns",
  },
]

export const traits = ["Wrinkles", "Radiance", "Imperfections", "Spots", "Hydration", "Sensitivity", "Shine", "Texture"]

export function getProductsByCategory(category: string) {
  return productData.filter((p) => p.category === category)
}

export function getProductBySlug(slug: string) {
  return productData.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}
