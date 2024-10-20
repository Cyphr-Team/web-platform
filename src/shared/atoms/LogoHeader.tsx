import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { useTenant } from "@/providers/tenant-provider"
import { getImageURL } from "@/utils/aws.utils.ts"
import { Image } from "./Image"

interface LogoHeaderProps {
  isCollapsed?: boolean
  toggleCollapse?: () => void
  className?: string
}

export function LogoHeader({
  isCollapsed,
  toggleCollapse,
  className
}: LogoHeaderProps) {
  const { tenantData } = useTenant()

  return (
    <div className={cn("flex items-center gap-1 w-full", className)}>
      <button
        className={cn("logo-button", !toggleCollapse && "cursor-default")}
        type="button"
        onClick={toggleCollapse}
      >
        {tenantData?.logo ? (
          <Image
            alt="Institution logo"
            className="w-8 h-8"
            height={32}
            placeholderClassName="bg-slate-400 rounded"
            src={getImageURL(tenantData?.logo)}
            width={32}
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
          className="max-w-[120px]"
          placeholderClassName="bg-slate-400 rounded"
          src={getImageURL(tenantData?.textLogo)}
          width={120}
        />
      ) : null}
    </div>
  )
}
