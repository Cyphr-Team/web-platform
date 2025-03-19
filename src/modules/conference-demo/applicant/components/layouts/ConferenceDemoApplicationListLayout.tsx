import { memo } from "react"
import { Outlet } from "react-router-dom"
import { DASHBOARD_NAV_ITEM } from "../../constants"
import { SideNav } from "../../../admin/components/molecules/SideNav"

function ConferenceDemoApplicationListLayout() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <SideNav className="hidden md:flex" items={DASHBOARD_NAV_ITEM} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  )
}

export default memo(ConferenceDemoApplicationListLayout)
