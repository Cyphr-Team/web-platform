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
      <button onClick={toggleCollapse} className="logo-button">
        <img src={tenantData.logo} className="logo w-8 h-8" alt="altcap logo" />
      </button>
      {!isCollapsed && (
        <img src={tenantData.logoText} alt="altcap logo" className="pt-1" />
      )}
    </div>
  )
}
