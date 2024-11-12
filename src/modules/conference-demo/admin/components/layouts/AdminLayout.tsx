import { memo, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { SideNav } from "../molecules/SideNav"
import { DASHBOARD_NAV_ITEM } from "../../constants"
import useRouter from "@/hooks/useRouter"
import { APP_PATH } from "@/constants"

function ConferenceDemoAdminLayout() {
  const location = useLocation()
  const { push } = useRouter()

  useEffect(() => {
    if (location.pathname === APP_PATH.CONFERENCE_DEMO.admin.index) {
      push(APP_PATH.CONFERENCE_DEMO.admin.business)
    }
  }, [location.pathname, push])

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
