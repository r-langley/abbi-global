import { GlobalNav } from "@/components/global-nav"

const ingredients = [
  { name: "Hyaluronic Acid", benefit: "Deep hydration and moisture retention" },
  { name: "Vitamin C", benefit: "Brightening and antioxidant protection" },
  { name: "Niacinamide", benefit: "Improves skin texture and tone" },
  { name: "Retinol", benefit: "Anti-aging and cell turnover" },
  { name: "Peptides", benefit: "Collagen production and firmness" },
  { name: "Ceramides", benefit: "Skin barrier protection" },
]

export default function IngredientsPage() {
  return (
    <>
      <GlobalNav />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-normal tracking-tight mb-4">Ingredients</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Learn about the active ingredients in ABBI products and how they benefit your skin.
          </p>

          <div className="space-y-6">
            {ingredients.map((ingredient) => (
              <div key={ingredient.name} className="border-b border-border pb-6">
                <h2 className="text-xl font-normal mb-2">{ingredient.name}</h2>
                <p className="text-muted-foreground">{ingredient.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
