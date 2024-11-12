import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const matcherVariants = cva("flex items-center space-x-1 text-sm font-light", {
  variants: {
    variant: {
      neutral: "",
      matched: "text-green-700",
      unMatched: "text-red-700"
    }
  },
  defaultVariants: {
    variant: "neutral"
  }
})

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof matcherVariants> {
  asChild?: boolean
}

const Matcher = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, children, ...props }, ref) => {
    const iconByVariant =
      variant === "matched" ? (
        <CheckCircle2 className="fill-green-600" color="white" />
      ) : variant === "neutral" ? (
        <CheckCircle2 className="fill-zinc-300" color="white" />
      ) : (
        <XCircle className="fill-red-600" color="white" />
      )

    return (
      <div
        ref={ref}
        className={cn(matcherVariants({ variant, className }))}
        {...props}
      >
        {iconByVariant}
        {children}
      </div>
    )
  }
)

Matcher.displayName = "Matcher"

function getMatcherVariants<T>(
  value: T,
  isError: boolean
): VariantProps<typeof matcherVariants>["variant"] {
  if (!value) return "neutral"

  if (isError) return "unMatched"

  return "matched"
}

export { Matcher, getMatcherVariants }
