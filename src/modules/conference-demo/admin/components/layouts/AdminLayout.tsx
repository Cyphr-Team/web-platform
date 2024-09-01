import { memo } from "react"
import { Outlet } from "react-router-dom"
import { SideNav } from "../molecules/SideNav"
import { DASHBOARD_NAV_ITEM } from "../../constants"

const ConferenceDemoAdminLayout = () => {
  return (
    <div className="finovate flex h-dvh overflow-hidden">
      <SideNav items={DASHBOARD_NAV_ITEM} className="hidden md:flex" />
      <main className="flex-1 pt-14 md:pt-0 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default memo(ConferenceDemoAdminLayout)
