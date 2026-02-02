import { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  action?: ReactNode
  description?: string
}

export function SectionHeader({ title, action, description }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-normal">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
