/**
 * ABBI Design System
 *
 * This file documents the design system conventions, tokens, and patterns
 * used throughout the application. Follow these guidelines to maintain
 * consistency across all components.
 */

// =============================================================================
// TYPOGRAPHY
// =============================================================================

/**
 * Font Families
 * - sans (Geist): Primary font for body text and UI elements
 * - mono (Geist Mono): Used for labels, badges, buttons, and data
 * - serif (Vollkorn): Used for editorial/marketing headings (use sparingly)
 */
export const fontFamilies = {
  sans: 'font-sans',        // Default body text
  mono: 'font-mono',        // Labels, badges, prices, buttons
  serif: 'font-serif',      // Editorial headings (rare)
} as const

/**
 * Typography Scale
 * Use Tailwind's text-* classes. Common patterns:
 * - text-xs: Labels, badges, meta info
 * - text-sm: Body text, descriptions
 * - text-base: Standard content
 * - text-lg: Section headings, large body
 * - text-xl: Page section titles
 * - text-2xl: Page titles
 * - text-3xl: Hero titles
 */
export const typographyPatterns = {
  // Page titles
  pageTitle: 'text-3xl font-normal tracking-tight',

  // Section headers
  sectionTitle: 'text-xl font-normal',
  sectionDescription: 'text-sm text-muted-foreground',

  // Card content
  cardTitle: 'text-sm font-medium',
  cardDescription: 'text-sm text-muted-foreground',

  // Labels and metadata
  label: 'text-sm font-mono',
  meta: 'text-xs text-muted-foreground font-mono',

  // Prices
  price: 'text-sm font-medium',
  priceHero: 'text-2xl font-normal',

  // Buttons
  buttonText: 'font-mono text-xs uppercase tracking-widest',
} as const

// =============================================================================
// COLORS
// =============================================================================

/**
 * Semantic Color Usage
 * Colors are defined as CSS variables in globals.css using OKLCH color space.
 * Use Tailwind's semantic color classes:
 *
 * - background/foreground: Base page colors
 * - primary/primary-foreground: Main brand actions (buttons, links)
 * - secondary/secondary-foreground: Secondary actions
 * - muted/muted-foreground: Disabled states, placeholders
 * - accent/accent-foreground: Highlights, hover states
 * - destructive/destructive-foreground: Errors, delete actions
 * - border: All borders
 * - input: Form input borders
 * - ring: Focus rings
 */
export const colorPatterns = {
  // Backgrounds
  pageBg: 'bg-background',
  cardBg: 'bg-card',
  mutedBg: 'bg-muted',
  accentBg: 'bg-accent',

  // Text
  primaryText: 'text-foreground',
  secondaryText: 'text-muted-foreground',
  linkText: 'text-primary hover:text-primary/80',

  // Interactive
  primaryButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondaryButton: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghostButton: 'hover:bg-accent hover:text-accent-foreground',

  // Borders
  border: 'border-border',
  inputBorder: 'border-input',
  focusRing: 'ring-ring',
} as const

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

/**
 * Spacing Scale
 * Use Tailwind's spacing scale (4px base):
 * - 1: 4px - Tight spacing
 * - 2: 8px - Default inline spacing
 * - 3: 12px - Compact sections
 * - 4: 16px - Standard padding
 * - 6: 24px - Section spacing
 * - 8: 32px - Large section spacing
 * - 12: 48px - Page sections
 * - 16: 64px - Major page divisions
 */
export const spacingPatterns = {
  // Container
  container: 'container mx-auto px-4 md:px-6',
  containerNarrow: 'container mx-auto px-6 max-w-5xl',

  // Section
  section: 'py-16',
  sectionCompact: 'py-8',

  // Card padding
  cardPadding: 'p-6',
  cardPaddingLarge: 'p-8',

  // Gap patterns
  stackSmall: 'space-y-2',
  stackMedium: 'space-y-4',
  stackLarge: 'space-y-6',
  stackXL: 'space-y-8',
} as const

// =============================================================================
// COMPONENT PATTERNS
// =============================================================================

/**
 * Button Conventions
 * - Primary: Main actions (checkout, submit, save)
 * - Secondary: Alternative actions
 * - Outline: Low-emphasis actions
 * - Ghost: Minimal actions (close, navigation)
 *
 * Sizes:
 * - default: Standard buttons
 * - sm: Compact areas, secondary actions
 * - lg: Hero CTAs
 * - icon: Icon-only buttons
 */
export const buttonPatterns = {
  primary: 'h-12 font-mono text-xs uppercase tracking-widest',
  secondary: 'font-mono text-xs',
  outline: 'font-mono text-xs bg-transparent',
  link: 'font-mono text-xs underline-offset-4',
} as const

/**
 * Card Conventions
 * - Use Card component for content containers
 * - Prefer CardContent with p-6 padding
 * - Use border-border for default borders
 * - Add hover:shadow-md for interactive cards
 */
export const cardPatterns = {
  default: 'rounded-lg border border-border bg-card',
  interactive: 'cursor-pointer hover:shadow-md transition-shadow',
  selected: 'border-primary bg-primary/5',
} as const

/**
 * Badge Conventions
 * - default: Primary emphasis (active, selected)
 * - secondary: Low emphasis (dates, counts)
 * - outline: Neutral tags (categories, traits)
 * - destructive: Errors, warnings
 */
export const badgePatterns = {
  status: 'text-xs',
  trait: 'text-xs',
  count: 'text-xs font-mono',
} as const

/**
 * Form Conventions
 * - Always use Label component with htmlFor
 * - Label styling: text-sm font-mono
 * - Input spacing: space-y-2 between label and input
 * - Form section spacing: space-y-4 or space-y-6
 */
export const formPatterns = {
  fieldset: 'space-y-4',
  field: 'space-y-2',
  label: 'text-sm font-mono',
  input: 'w-full',
  hint: 'text-xs text-muted-foreground',
} as const

// =============================================================================
// ANIMATION & TRANSITIONS
// =============================================================================

/**
 * Transition Conventions
 * - Use transition-colors for color changes
 * - Use transition-transform for hover scales
 * - Use transition-shadow for shadow changes
 * - Combine with transition-all sparingly
 *
 * Duration: Default (150ms) is usually sufficient
 */
export const transitionPatterns = {
  default: 'transition-colors',
  scale: 'transition-transform duration-200',
  shadow: 'transition-shadow',
  all: 'transition-all duration-200',
} as const

// =============================================================================
// RESPONSIVE BREAKPOINTS
// =============================================================================

/**
 * Breakpoint Usage
 * - sm (640px): Mobile landscape
 * - md (768px): Tablet portrait - Main mobile/desktop breakpoint
 * - lg (1024px): Tablet landscape / small desktop
 * - xl (1280px): Desktop
 * - 2xl (1536px): Large desktop
 *
 * Pattern: Mobile-first, add md: prefix for desktop changes
 */
export const responsivePatterns = {
  hideOnMobile: 'hidden md:block',
  showOnMobile: 'md:hidden',
  gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

/**
 * Z-Index Layers
 * - 0: Default content
 * - 10: Elevated cards, dropdowns
 * - 20: Sticky elements
 * - 30: Fixed navigation
 * - 40: Overlays, backdrops
 * - 50: Modals, sheets, dialogs
 */
export const zIndexScale = {
  dropdown: 'z-10',
  sticky: 'z-20',
  fixed: 'z-30',
  overlay: 'z-40',
  modal: 'z-50',
} as const

// =============================================================================
// COMPONENT NAMING CONVENTIONS
// =============================================================================

/**
 * File Naming
 * - Components: kebab-case.tsx (e.g., product-card.tsx)
 * - Utils: kebab-case.ts (e.g., cart-utils.ts)
 * - Types: Include in the file that uses them, or in a types.ts file
 *
 * Component Naming
 * - PascalCase for components (e.g., ProductCard)
 * - Prefix domain-specific components (e.g., AccountInfoCard)
 * - Use descriptive names that indicate purpose
 *
 * Export Patterns
 * - Named exports for components: export function ComponentName()
 * - Named exports for utils: export function utilityName()
 * - Types: export interface/type TypeName
 */

// =============================================================================
// ICON USAGE
// =============================================================================

/**
 * Icons
 * - Use lucide-react for consistent iconography
 * - Size patterns: w-4 h-4 (small), w-5 h-5 (default), w-6 h-6 (large)
 * - For inline SVGs (nav icons), maintain consistent stroke-width={2}
 */
export const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
} as const

// =============================================================================
// ACCESSIBILITY
// =============================================================================

/**
 * Accessibility Patterns
 * - Always include sr-only text for icon-only buttons
 * - Use semantic HTML elements (nav, main, section, article)
 * - Ensure color contrast meets WCAG AA (4.5:1 for text)
 * - Support prefers-reduced-motion for animations
 * - Use proper heading hierarchy (h1 > h2 > h3)
 */
export const a11yPatterns = {
  srOnly: 'sr-only',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  reducedMotion: 'motion-reduce:transition-none motion-reduce:animate-none',
} as const
