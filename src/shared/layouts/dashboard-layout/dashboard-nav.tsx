import { TooltipProvider } from "@/components/ui/tooltip"
import { APP_PATH } from "@/constants"
import { cn } from "@/lib/utils"
import { BadgeUnreadNotifications } from "@/modules/notification/components/atoms/BadgeUnreadNotifications"
import { useQueryGetUnreadNotifications } from "@/modules/notification/hooks/useQuery/useQueryGetUnreadNotifications"
import { RoleBase } from "@/shared/molecules/RoleBase"
import { type NavItem } from "@/types/common.type"
import { FeatureFlagsRenderer } from "../FeatureFlagRenderer"
import { FeatureRenderer } from "../FeatureRenderer"
import { DashboardCollapsedNavLink } from "./dashboard-collapsed-nav-link"
import { DashboardNavLink } from "./dashboard-nav-link"

interface DashboardNavProps {
  readonly items: NavItem[]
  readonly isCollapsed?: boolean
}

function NotificationBadge() {
  // fetch count unread notifications
  const { data: unreadCount = 0 } = useQueryGetUnreadNotifications()

  return unreadCount == 0 ? null : (
    <BadgeUnreadNotifications unreadCount={unreadCount} />
  )
}

function getBadgeByHref(href?: string) {
  return [
    APP_PATH.NOTIFICATION.list,
    APP_PATH.LOAN_APPLICATION.NOTIFICATION.list
  ].includes(href || "") ? (
    <NotificationBadge />
  ) : null
}

export function DashboardNav({ items, isCollapsed }: DashboardNavProps) {
  if (!items?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "group flex flex-col flex-1 gap-4 justify-between mb-0",
        !isCollapsed && "border-0 md:border-b mb-6"
      )}
      data-collapsed={isCollapsed}
    >
      <nav className="flex flex-col gap-y-2 flex-1">
        <TooltipProvider>
          {items.map((item) => {
            const badge = getBadgeByHref(item.href)
            const NavLinkComponent = isCollapsed
              ? DashboardCollapsedNavLink
              : DashboardNavLink

            return (
              !item.disabled && (
                <FeatureFlagsRenderer
                  key={item.label}
                  /* eslint-disable-next-line react/jsx-no-useless-fragment */
                  fallBackChildren={<></>}
                  ffKey={item.featureFlag}
                >
                  <RoleBase key={item.label} roles={item.roles}>
                    <FeatureRenderer featureKey={item.featureKey}>
                      <NavLinkComponent badge={badge} item={item} />
                    </FeatureRenderer>
                  </RoleBase>
                </FeatureFlagsRenderer>
              )
            )
          })}
        </TooltipProvider>
      </nav>
    </div>
  )
}
