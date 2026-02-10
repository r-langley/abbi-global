import { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  action?: ReactNode
  description?: string
}

export function SectionHeader({ title, action, description }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-normal">{title}</h2>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  )
}
