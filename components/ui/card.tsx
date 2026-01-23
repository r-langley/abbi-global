import * as React from 'react'

import { cn } from '@/lib/utils'

const Card = React.memo(function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm py-0 gap-4',
        className,
      )}
      {...props}
    />
  )
})

Card.displayName = 'Card'

const CardHeader = React.memo(function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 py-4 gap-0 px-4',
        className,
      )}
      {...props}
    />
  )
})

CardHeader.displayName = 'CardHeader'

const CardTitle = React.memo(function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
})

CardTitle.displayName = 'CardTitle'

const CardDescription = React.memo(function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
})

CardDescription.displayName = 'CardDescription'

const CardAction = React.memo(function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
})

CardAction.displayName = 'CardAction'

const CardContent = React.memo(function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-4 py-4', className)}
      {...props}
    />
  )
})

CardContent.displayName = 'CardContent'

const CardFooter = React.memo(function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
})

CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
