import { Card, CardContent } from "@/components/ui/card"

interface InfoField {
  label: string
  value: string
}

interface InfoCardProps {
  fields: InfoField[]
}

export function InfoCard({ fields }: InfoCardProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-3">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-sm text-muted-foreground">{field.label}</span>
            <span className="text-sm">{field.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
