import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { getImageURL } from "@/utils/aws.utils.ts"
import { Image } from "./Image"
import useCanAccess, { FeatureKey } from "@/hooks/useCanAccess.ts"
import { useTenant } from "@/providers/tenant-provider.tsx"

interface LogoHeaderProps {
  isCollapsed?: boolean
  toggleCollapse?: () => void
  className?: string
  isLarge?: boolean
}

export function LogoHeader({
  isCollapsed,
  toggleCollapse,
  className,
  isLarge
}: LogoHeaderProps) {
  const { tenantData } = useTenant()

  const { getCanAccess: renderLogoWithText } = useCanAccess({
    featureKey: FeatureKey.LOGO_WITH_TEXT
  })

  return (
    <div className={cn("flex w-full items-center gap-1", className)}>
      <button
        className={cn("logo-button", !toggleCollapse && "cursor-default")}
        type="button"
        onClick={toggleCollapse}
      >
        {tenantData?.logo && (isCollapsed || renderLogoWithText()) ? (
          <Image
            alt="Institution logo"
            className="mr-1"
            placeholderClassName="rounded bg-slate-400"
            src={getImageURL(tenantData?.logo)}
            width={isLarge ? 40 : 32}
          />
        ) : null}

        {/* If not have logo, show button to collapse sidebar */}
        {toggleCollapse && isCollapsed && !tenantData?.logo
          ? Icons.arrowSquare({ className: "h-6 w-6 rotate-180" })
          : null}
      </button>

      {!isCollapsed && tenantData?.textLogo ? (
        <Image
          alt="Institution text logo"
          className={cn("max-w-[120px]", isLarge && "max-w-[210px]")}
          placeholderClassName="rounded bg-slate-400"
          src={getImageURL(tenantData?.textLogo)}
          width={isLarge ? 210 : 120}
        />
      ) : null}
    </div>
  )
}
