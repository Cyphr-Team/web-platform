import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variantColor: {
        red: "text-red-700 bg-red-500",
        gray: "text-gray-700 bg-gray-300",
        yellow: "text-yellow-700 bg-yellow-500",
        green: "text-green-700 bg-green-500"
      },
      variant: {
        soft: "bg-opacity-10",
        solid: "text-white",
        outline: ""
      }
    },
    defaultVariants: {
      variant: "soft",
      variantColor: "gray"
    }
  }
)

const dotVariants = cva("w-3 h-3 mr-1", {
  variants: {
    variantColor: {
      red: "text-red-500",
      gray: "text-gray-500",
      yellow: "text-yellow-500",
      green: "text-green-500"
    }
  },
  defaultVariants: {
    variantColor: "gray"
  }
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  isDot?: boolean
}

function Badge({
  isDot,
  className,
  variant,
  variantColor,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, variantColor }), className)}
      {...props}
    >
      {isDot && (
        <Dot strokeWidth={12} className={cn(dotVariants({ variantColor }))} />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
