import { memo } from "react"
import { Outlet } from "react-router-dom"
import { DASHBOARD_NAV_ITEM } from "../../constants"
import { SideNav } from "../../../admin/components/molecules/SideNav"

const ConferenceDemoApplicationListLayout = () => {
  return (
    <div className="flex h-dvh overflow-hidden">
      <SideNav items={DASHBOARD_NAV_ITEM} className="hidden md:flex" />
      <main className="flex-1 pt-14 md:pt-0 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default memo(ConferenceDemoApplicationListLayout)
