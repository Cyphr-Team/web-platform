import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { useEffect } from "react"
import {
  ADMIN_SETTINGS_MENU,
  APPLICANT_SETTINGS_MENU,
  VIEWER_SETTINGS_MENU
} from "@/modules/settings/constants"
import {
  checkIsLoanApplicant,
  checkIsWorkspaceAdmin
} from "@/utils/check-roles.ts"

export function TopNav() {
  const pathname = useLocation().pathname
  const navigate = useNavigate()

  const getSettingsMenu = () => {
    switch (true) {
      case checkIsWorkspaceAdmin():
        return ADMIN_SETTINGS_MENU
      case checkIsLoanApplicant():
        return APPLICANT_SETTINGS_MENU
      default:
        return VIEWER_SETTINGS_MENU
    }
  }

  const SETTINGS_MENU = getSettingsMenu()

  useEffect(() => {
    if (pathname === APP_PATH.SETTINGS.index) {
      navigate(SETTINGS_MENU[0].href)
    }
  }, [navigate, pathname])

  return (
    <div className="relative bg-white border-b mt-2xl">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center space-x-lg")}>
          {SETTINGS_MENU.map((menu) => (
            <NavLink
              key={menu.href}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-xs pb-lg text-center text-sm font-semibold transition-colors",
                  "hover:border-primary hover:text-primary",
                  isActive
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                )
              }
              to={menu.href}
            >
              {menu.name}
            </NavLink>
          ))}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
