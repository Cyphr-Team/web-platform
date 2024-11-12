import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variantColor: {
        red: "border-red-300 bg-red-500 text-red-700",
        gray: "border-gray-300 bg-gray-300 text-gray-700",
        yellow: "border-yellow-300 bg-yellow-500 text-yellow-700",
        green: "border-success-200 bg-green-500 text-green-700",
        blue: "border-blue-300 bg-blue-500 text-blue-700",
        orange: "border-orange-300 bg-orange-500 text-orange-700",
        lightBlue: "border-blue-300 bg-[#C0D8D8] text-blue-700",
        white: "border-black bg-white text-black",
        purple: "border-purple-300 bg-purple-500 text-indigo-700"
      },
      variant: {
        soft: "bg-opacity-10",
        solid: "text-white",
        outline: "border border-black bg-opacity-10 text-black"
      }
    },
    defaultVariants: {
      variant: "soft",
      variantColor: "gray"
    }
  }
)

const dotVariants = cva("mr-1 size-3", {
  variants: {
    variantColor: {
      red: "text-red-500",
      gray: "text-gray-500",
      yellow: "text-yellow-500",
      green: "text-green-500",
      blue: "text-blue-500",
      orange: "text-orange-500",
      lightBlue: "text-blue-500",
      white: "text-black",
      purple: "text-indigo-500"
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
      className={cn(dotVariants({ variantColor }), !isDotBefore && "ml-1 mr-0")}
      strokeWidth={12}
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
      {isDotBefore ? renderDot : null}
      {children}
      {!isDotBefore && renderDot}
    </div>
  )
}

export { Badge, badgeVariants }
