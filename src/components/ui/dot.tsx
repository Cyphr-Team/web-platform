import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { DotIcon, type LucideProps } from "lucide-react"

const dotVariants = cva("mr-1 size-3", {
  variants: {
    variantColor: {
      red: "text-red-500",
      gray: "text-gray-500",
      yellow: "text-yellow-500",
      green: "text-green-500",
      blue: "text-blue-500",
      purple: "text-purple-500"
    }
  },
  defaultVariants: {
    variantColor: "gray"
  }
})

type DotVariantProps = VariantProps<typeof dotVariants>

export interface DotProps extends LucideProps, DotVariantProps {}

function Dot({ variantColor, className, ...props }: Readonly<DotProps>) {
  return (
    <DotIcon
      className={cn("w-5", dotVariants({ variantColor }), className)}
      strokeWidth={12}
      {...props}
    />
  )
}

export { Dot, dotVariants }

export type { DotVariantProps }
