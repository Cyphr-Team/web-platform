import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variantColor: {
        red: "text-red-700 bg-red-500 border-red-300",
        gray: "text-gray-700 bg-gray-300 border-gray-300",
        yellow: "text-yellow-700 bg-yellow-500 border-yellow-300",
        green: "text-green-700 bg-green-500 border-success-200",
        blue: "text-blue-700 bg-blue-500 border-blue-300"
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
      green: "text-green-500",
      blue: "text-blue-500"
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
  isDotBefore?: boolean
  border?: boolean
}

function Badge({
  isDot,
  isDotBefore = true,
  className,
  variant,
  variantColor,
  children,
  border,
  ...props
}: Readonly<BadgeProps>) {
  const renderDot = isDot && (
    <Dot
      strokeWidth={12}
      className={cn(dotVariants({ variantColor }), !isDotBefore && "ml-1 mr-0")}
    />
  )

  return (
    <div
      className={cn(
        badgeVariants({ variant, variantColor }),
        className,
        border && "border"
      )}
      {...props}
    >
      {isDotBefore && renderDot}
      {children}
      {!isDotBefore && renderDot}
    </div>
  )
}

export { Badge, badgeVariants }
