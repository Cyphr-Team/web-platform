import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { useTenant } from "@/providers/tenant-provider"

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
          <img
            src={tenantData.logo}
            className="w-8 h-8"
            alt="Institution logo"
          />
        )}

        {/* If not have logo, show button to collapse sidebar */}
        {toggleCollapse &&
          isCollapsed &&
          !tenantData?.logo &&
          Icons.arrowSquare({ className: "h-6 w-6 rotate-180" })}
      </button>

      {!isCollapsed && tenantData?.textLogo && (
        <img
          src={tenantData.textLogo}
          alt="Institution text logo"
          className="h-8 max-w-[100px]"
          height={32}
        />
      )}
    </div>
  )
}
