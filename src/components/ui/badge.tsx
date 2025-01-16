import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"
import { Institution } from "@/constants/tenant.constants"
import { getRootSubdomain, getSubdomain } from "@/utils/domain.utils"
import { get } from "lodash"

// Interface for the styles data
type TenantStyles = Record<string, string>

const getTenantStyles = (
  tenant: Institution,
  styles: { default: TenantStyles; [key: string]: TenantStyles }
) => ({
  ...styles.default, // Include default styles
  ...get(styles, tenant, {}) // Merge tenant-specific styles
})

const badgeTenantStyles = {
  default: {
    red: "border-red-300 bg-red-500 text-red-700",
    gray: "border-gray-300 bg-gray-500 text-gray-700",
    yellow: "border-yellow-300 bg-yellow-500 text-yellow-700",
    green: "border-success-200 bg-green-500 text-green-700",
    blue: "border-blue-300 bg-blue-500 text-blue-700",
    orange: "border-orange-300 bg-orange-500 text-orange-700",
    lightBlue: "border-blue-300 bg-[#C0D8D8] text-blue-700",
    white: "border-black bg-white text-black",
    purple: "border-purple-300 bg-purple-500 text-indigo-700",
    greenShade: "bg-[#85CF85]",
    lightGreenShade: "bg-[#A9E3D1]",
    blueShade: "bg-[#9FD3F0]",
    yellowShade: "bg-[#F2DF9D]",
    redShade: "bg-[#E5B0A4]"
  },
  [Institution.CapitalCollab]: {
    readyForReview: "bg-[#97ADEBBF] text-[#104EB9]",
    submitted: "bg-[#9DE2E1BF] text-[#008C8A]",
    inReview: "bg-[#97C6EBBF] text-[#175CD3]",
    missingInformation: "bg-[#F2CD9DBF] text-[#CA7200]",
    readyForUnderwriting: "bg-[#F2DF9DBF] text-[#B18A01]",
    underwriting: "bg-[#BAABDBBF] text-[#350894]",
    approved: "bg-[#A6E99ABF] text-[#027A48]",
    declined: "bg-[#E5B0A4BF] text-[#BE381B]",
    agreementRequested: "bg-[#9AE9CCBF] text-[#0F8888]",
    agreementSent: "bg-[#9CCDCDBF] text-[#078383]",
    agreementSigned: "bg-[#DFA1E1BF] text-[#B015B3]",
    funded: "bg-[#133472BF] text-white"
  }
}

const dotTenantStyles = {
  default: {
    red: "text-red-500",
    gray: "text-gray-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    blue: "text-blue-500",
    orange: "text-orange-500",
    lightBlue: "text-blue-500",
    white: "text-black",
    purple: "text-indigo-500",
    greenShade: "text-black",
    lightGreenShade: "text-black",
    blueShade: "text-black",
    yellowShade: "text-black",
    redShade: "text-black"
  },
  [Institution.CapitalCollab]: {
    readyForReview: "text-[#104EB9]",
    submitted: "text-[#008C8A]",
    inReview: "text-[#175CD3]",
    missingInformation: "text-[#CA7200]",
    readyForUnderwriting: "text-[#B18A01]",
    underwriting: "text-[#350894]",
    approved: "text-[#027A48]",
    declined: "text-[#BE381B]",
    agreementRequested: "text-[#0F8888]",
    agreementSent: "text-[#078383]",
    agreementSigned: "text-[#B015B3]",
    funded: "text-white"
  }
}

// Usage of the generalized function for both badge and dot styles
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variantColor: getTenantStyles(
        getRootSubdomain(getSubdomain()) as Institution,
        badgeTenantStyles
      ),
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
    variantColor: getTenantStyles(
      getRootSubdomain(getSubdomain()) as Institution,
      dotTenantStyles
    )
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
