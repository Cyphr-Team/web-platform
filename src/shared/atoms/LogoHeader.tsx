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
        onClick={toggleCollapse}
        className={cn("logo-button", !toggleCollapse && "cursor-default")}
      >
        {tenantData?.logo && (
          <Image
            src={getImageURL(tenantData?.logo)}
            placeholderClassName="bg-slate-400 rounded"
            className="w-8 h-8"
            alt="Institution logo"
            height={32}
            width={32}
          />
        )}

        {/* If not have logo, show button to collapse sidebar */}
        {toggleCollapse &&
          isCollapsed &&
          !tenantData?.logo &&
          Icons.arrowSquare({ className: "h-6 w-6 rotate-180" })}
      </button>

      {!isCollapsed && tenantData?.textLogo && (
        <Image
          src={getImageURL(tenantData?.textLogo)}
          placeholderClassName="bg-slate-400 rounded"
          alt="Institution text logo"
          className="h-8 max-w-[100px]"
          height={32}
          width={100}
        />
      )}
    </div>
  )
}
