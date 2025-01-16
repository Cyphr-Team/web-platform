import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { DotIcon, type LucideProps } from "lucide-react"
import { Institution } from "@/constants/tenant.constants"
import { getRootSubdomain, getSubdomain } from "@/utils/domain.utils"
import { get } from "lodash"

const getTenantStyles = (tenant: Institution) => ({
  ...tenantStyles.default, // Include default styles
  ...get(tenantStyles, tenant, {}) // Merge tenant-specific styles
})

const tenantStyles = {
  default: {
    red: "text-red-500",
    gray: "text-gray-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500"
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

const dotVariants = cva("mr-1 size-3", {
  variants: {
    variantColor: getTenantStyles(
      getRootSubdomain(getSubdomain()) as Institution
    )
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
