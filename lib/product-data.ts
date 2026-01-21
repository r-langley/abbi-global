export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: string
  traits: string[]
  description: string
  recommended?: boolean
  /** Product image path. When individual images are ready, update each product's image field. */
  image?: string
}

/** Default placeholder image used when product.image is not specified */
export const DEFAULT_PRODUCT_IMAGE = "/minimalist-cosmetic-pump-bottle-cream.jpg"

/** Custom cream product image - ABBI branded bottle with custom formulation */
export const CUSTOM_CREAM_IMAGE = "/images/custom-cream-alya.jpg"

export const productData: Product[] = [
  // In-Lab Creams
  {
    id: "1",
    slug: "aloe-vera-base",
    name: "Aloe Vera Hydrating Base Cream with Botanical Extracts",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Hydration", "Sensitivity"],
    description: "Our master formulators blend pure aloe vera with calming botanical extracts to create a deeply hydrating base. Made-to-order in our French lab and personalized based on your skin analysis results. Best for sensitive, dehydrated, or irritation-prone skin.",
    recommended: true,
    image: CUSTOM_CREAM_IMAGE,
  },
  {
    id: "2",
    slug: "apple-stem-cells-base",
    name: "Swiss Apple Stem Cell Anti-Aging Base Cream",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Wrinkles", "Radiance"],
    description: "Harness the regenerative power of rare Swiss apple stem cells combined with peptides for visible anti-aging benefits. Custom-formulated in our French laboratory to target your specific aging concerns identified in your skin scan.",
    recommended: true,
    image: CUSTOM_CREAM_IMAGE,
  },
  {
    id: "3",
    slug: "honey-shea-butter-base",
    name: "Raw Honey & Organic Shea Butter Nourishing Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Hydration", "Sensitivity"],
    description: "A luxuriously rich formula combining raw Manuka honey with cold-pressed organic shea butter for intense nourishment. Perfect for dry, mature, or winter-stressed skin. Formulated fresh in our lab based on your unique skin profile.",
    image: CUSTOM_CREAM_IMAGE,
  },
  {
    id: "4",
    slug: "selenium-vitamin-c-base",
    name: "Selenium & Stabilized Vitamin C Brightening Base",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Radiance", "Spots"],
    description: "A powerful brightening formula featuring selenium-rich marine extracts and stabilized L-ascorbic acid to target dark spots and uneven tone. Your personalized concentration is determined by your skin analysis for optimal results without irritation.",
    recommended: true,
    image: CUSTOM_CREAM_IMAGE,
  },
  {
    id: "5",
    slug: "peptide-complex-base",
    name: "Advanced Multi-Peptide Complex Firming Base Cream",
    price: 89.0,
    category: "in-lab-creams",
    traits: ["Wrinkles", "Texture"],
    description: "Our most advanced anti-aging formula featuring a proprietary blend of signal peptides, carrier peptides, and neurotransmitter-inhibiting peptides. Custom-calibrated in our French lab to address your skin's specific firmness and texture needs.",
    image: CUSTOM_CREAM_IMAGE,
  },

  // Mix at Home Cream
  {
    id: "6",
    slug: "velvety-cream",
    name: "Velvety Soft-Touch Base Cream for Daily Customization",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Hydration", "Texture"],
    description: "A silky, lightweight base with a velvety finish that absorbs quickly. Add 2-3 drops of your chosen Active Concentrate before applying. Perfect for combination skin or those new to custom skincare.",
    recommended: true,
  },
  {
    id: "7",
    slug: "mattifying-velvety-cream",
    name: "Oil-Control Mattifying Velvety Base Cream",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Shine", "Texture"],
    description: "Formulated with micro-fine powders to absorb excess oil throughout the day while still allowing your active concentrates to penetrate. Ideal for oily or combination skin types seeking a shine-free finish.",
  },
  {
    id: "8",
    slug: "smooth-cream",
    name: "Silicone-Free Smooth Finish Base Cream",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Texture", "Radiance"],
    description: "A clean-formula base that delivers a smooth, photo-ready finish without silicones. Pairs beautifully with radiance-boosting concentrates. Great for sensitive skin or those avoiding silicone-based products.",
  },
  {
    id: "9",
    slug: "creamy-cream",
    name: "Rich & Creamy Intensive Moisture Base",
    price: 24.9,
    category: "mix-at-home",
    traits: ["Hydration", "Sensitivity"],
    description: "Our richest base formula for those who need extra nourishment. The dense, creamy texture locks in moisture and creates the perfect vehicle for hydrating and soothing active concentrates.",
  },

  // Active Concentrate
  {
    id: "10",
    slug: "no-1-hydration",
    name: "No. 1 Deep Hydration Active Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Hydration"],
    description: "Multi-weight hyaluronic acid complex that hydrates at every skin layer. Add 2-3 drops to your Mix-at-Home base morning and evening. You should notice plumper, more supple skin within 7 days of consistent use.",
    recommended: true,
  },
  {
    id: "11",
    slug: "no-2-wrinkles",
    name: "No. 2 Anti-Wrinkle Retinoid Active Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Wrinkles"],
    description: "Encapsulated retinoid technology for effective anti-aging with minimal irritation. Start with 1 drop every other evening, gradually increasing to nightly use. Allow 4-6 weeks to see visible improvement in fine lines.",
    recommended: true,
  },
  {
    id: "12",
    slug: "no-3-radiance",
    name: "No. 3 Instant Radiance Vitamin C Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Radiance", "Spots"],
    description: "Stabilized vitamin C at 15% concentration for immediate luminosity and long-term brightening. Use in your morning routine for antioxidant protection. Visible glow from first application; spot-fading results in 8-12 weeks.",
  },
  {
    id: "13",
    slug: "no-4-imperfections",
    name: "No. 4 Blemish Control Salicylic Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Imperfections"],
    description: "2% salicylic acid with soothing green tea extract to clear pores without over-drying. Best used in evening routine, 3-4 times per week. Reduces active breakouts within days and prevents new ones with continued use.",
  },
  {
    id: "14",
    slug: "no-5-spots",
    name: "No. 5 Dark Spot Correcting Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Spots", "Radiance"],
    description: "Tranexamic acid and niacinamide work together to fade stubborn hyperpigmentation from sun damage, acne scars, or melasma. Apply twice daily to affected areas. Best results seen at 12 weeks of consistent use.",
  },
  {
    id: "15",
    slug: "no-6-sensitivity",
    name: "No. 6 Calming Barrier Repair Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Sensitivity"],
    description: "Centella asiatica and ceramide complex to strengthen your skin barrier and reduce reactivity. Safe for daily use, even on the most sensitive skin. Many users report reduced redness and irritation within the first week.",
  },
  {
    id: "16",
    slug: "no-7-shine",
    name: "No. 7 Pore-Refining Mattifying Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Shine"],
    description: "Niacinamide and zinc PCA regulate sebum production at the source. Use morning and evening for all-day oil control. Pores appear smaller and shine is reduced within 2-3 weeks of regular use.",
  },
  {
    id: "17",
    slug: "no-8-texture",
    name: "No. 8 Smoothing AHA/BHA Resurfacing Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Texture"],
    description: "Gentle blend of glycolic, lactic, and salicylic acids for chemical exfoliation without irritation. Use 2-3 evenings per week. Rough texture, bumps, and dullness visibly improve within 3-4 weeks.",
  },
  {
    id: "18",
    slug: "no-9-firmness",
    name: "No. 9 Collagen-Boosting Peptide Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Wrinkles", "Texture"],
    description: "Matrixyl and copper peptides stimulate your skin's natural collagen production. Apply morning and evening for best results. Skin feels firmer within 4 weeks; visible lifting effects at 8-12 weeks.",
  },
  {
    id: "19",
    slug: "no-10-protection",
    name: "No. 10 Environmental Defense Antioxidant Concentrate",
    price: 22.0,
    category: "active-concentrate",
    traits: ["Radiance", "Wrinkles"],
    description: "Vitamin E, ferulic acid, and resveratrol shield skin from pollution, blue light, and free radicals. Essential for morning routines in urban environments. Prevents premature aging while boosting overall skin health.",
  },

  // Essential
  {
    id: "20",
    slug: "collagen-firming-serum",
    name: "Marine Collagen Intensive Firming Serum",
    price: 32.0,
    category: "essential",
    traits: ["Wrinkles", "Texture"],
    description: "Sustainably-sourced marine collagen peptides in a fast-absorbing serum format. Apply after cleansing, before your ABBI cream. Ideal for those noticing loss of firmness or wanting to prevent sagging.",
    recommended: true,
  },
  {
    id: "21",
    slug: "hyaluronic-acid-plumping-serum",
    name: "Triple-Weight Hyaluronic Acid Plumping Serum",
    price: 34.0,
    category: "essential",
    traits: ["Hydration", "Wrinkles"],
    description: "Three molecular weights of hyaluronic acid deliver hydration to surface, mid, and deep skin layers. Can be layered under any ABBI cream or used alone for a lightweight moisture boost.",
    recommended: true,
  },
  {
    id: "22",
    slug: "exfoliating-cleansing-foam",
    name: "Enzyme-Activated Gentle Exfoliating Cleansing Foam",
    price: 17.89,
    category: "essential",
    traits: ["Texture", "Imperfections"],
    description: "Papaya and pineapple enzymes dissolve dead skin cells while you cleanse, without harsh scrubbing particles. Use morning or evening as your first cleansing step. Suitable for daily use on most skin types.",
  },
  {
    id: "23",
    slug: "soothing-revitalizing-oil",
    name: "9-Botanical Soothing & Revitalizing Face Oil",
    price: 36.0,
    category: "essential",
    traits: ["Sensitivity", "Radiance"],
    description: "A balanced blend of rosehip, jojoba, squalane, and six other botanical oils to nourish without clogging pores. Use alone, mixed into your cream, or as the final step in your evening routine.",
  },
  {
    id: "24",
    slug: "radiance-eye-contour-serum",
    name: "Caffeine & Peptide Eye Contour Brightening Serum",
    price: 29.0,
    category: "essential",
    traits: ["Radiance", "Wrinkles"],
    description: "Targeted formula for dark circles, puffiness, and fine lines around the delicate eye area. The cooling metal applicator tip enhances absorption and provides instant de-puffing benefits.",
  },

  // Simple Solution
  {
    id: "25",
    slug: "clear-intentions",
    name: "Clear Intentions: Complete Blemish Control Kit",
    price: 59.95,
    category: "simple-solution",
    traits: ["Imperfections"],
    description: "Everything you need to tackle breakouts: Enzyme Cleanser, Blemish Concentrate, and Mattifying Base. A curated 3-step routine designed to clear existing blemishes and prevent new ones from forming.",
  },
  {
    id: "26",
    slug: "defy-gravity",
    name: "Defy Gravity: Intensive Lifting & Firming Kit",
    price: 89.9,
    category: "simple-solution",
    traits: ["Wrinkles", "Texture"],
    description: "Our most comprehensive anti-aging solution including Peptide Concentrate, Marine Collagen Serum, and Firming Eye Treatment. For those serious about addressing loss of firmness and visible sagging.",
  },
  {
    id: "27",
    slug: "peace-out-redness",
    name: "Peace Out, Redness: Sensitive Skin Calming Kit",
    price: 59.95,
    category: "simple-solution",
    traits: ["Sensitivity"],
    description: "Gentle yet effective relief for reactive, redness-prone skin. Includes our Barrier Repair Concentrate, Soothing Oil, and Creamy Base. Safe for rosacea-prone skin when used as directed.",
  },
  {
    id: "28",
    slug: "radiance-ritual",
    name: "Radiance Ritual: Brightening & Glow Kit",
    price: 59.95,
    category: "simple-solution",
    traits: ["Radiance", "Wrinkles"],
    description: "Restore luminosity to dull, tired skin with our Vitamin C Concentrate, Resurfacing Treatment, and Radiance-Boosting Base. See visible glow within the first week of use.",
  },
  {
    id: "29",
    slug: "sun-undo",
    name: "Sun Undo: Post-Sun Damage Repair Kit",
    price: 59.95,
    category: "simple-solution",
    traits: ["Spots", "Radiance"],
    description: "Targeted treatment for sun spots, uneven tone, and premature aging caused by UV exposure. Includes Dark Spot Concentrate, Antioxidant Serum, and Brightening Base for comprehensive repair.",
  },
  {
    id: "30",
    slug: "the-golden-standard",
    name: "The Golden Standard: Luxury Anti-Aging Essentials",
    price: 59.95,
    category: "simple-solution",
    traits: ["Radiance"],
    description: "Our prestige collection featuring gold-infused formulas for the ultimate in luxurious skincare. Includes 24K Gold Serum, Premium Peptide Complex, and Illuminating Finishing Cream.",
  },
  {
    id: "31",
    slug: "the-smooth-operator",
    name: "The Smooth Operator: Texture Perfecting Kit",
    price: 69.95,
    category: "simple-solution",
    traits: ["Wrinkles"],
    description: "Refine pores, smooth bumpy texture, and create a flawless canvas. Features our Resurfacing Concentrate, Pore-Minimizing Treatment, and Smooth-Finish Base. Perfect prep for makeup wearers.",
  },
  {
    id: "32",
    slug: "thirst-aid-kit",
    name: "Thirst Aid Kit: Intensive Hydration Rescue Set",
    price: 59.95,
    category: "simple-solution",
    traits: ["Hydration"],
    description: "Emergency relief for parched, dehydrated skin. Includes Triple Hyaluronic Serum, Deep Hydration Concentrate, and our richest Creamy Base. Restores plumpness and comfort to even severely dry skin.",
  },
]

export const categories = [
  {
    slug: "in-lab-creams",
    name: "Custom Creams",
    description: "Made-to-order in our French lab, personalized for your unique skin needs",
    heroTitle: "Your Formula, Made Fresh",
    heroSubtitle: "Personalized skincare crafted in our French laboratory based on your unique skin analysis",
    requiresSkinScan: true,
  },
  {
    slug: "mix-at-home",
    name: "Mix at Home",
    description: "Choose your base, add your concentrates, create your routine",
    heroTitle: "Build Your Routine",
    heroSubtitle: "Select a cream base, then customize with active concentrates for targeted results",
    requiresSkinScan: false,
  },
  { 
    slug: "essential", 
    name: "Essentials", 
    description: "Serums, cleansers, and complementary treatments",
    heroTitle: "Complete Your Routine",
    heroSubtitle: "High-performance serums, gentle cleansers, and targeted treatments",
    requiresSkinScan: false,
  },
  {
    slug: "simple-solution",
    name: "Simple Solutions",
    description: "Complete focused care kits for specific skin concerns",
    heroTitle: "Skincare Made Simple",
    heroSubtitle: "Curated kits with everything you need to target specific concerns",
    requiresSkinScan: false,
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
