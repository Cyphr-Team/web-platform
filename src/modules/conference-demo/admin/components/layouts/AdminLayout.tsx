import { memo } from "react"
import { Outlet } from "react-router-dom"
import { SideNav } from "../molecules/SideNav"
import { DASHBOARD_NAV_ITEM } from "../../constants"

function ConferenceDemoAdminLayout() {
  return (
    <div className="finovate flex h-dvh overflow-hidden">
      <SideNav className="hidden md:flex" items={DASHBOARD_NAV_ITEM} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  )
}

export default memo(ConferenceDemoAdminLayout)
