import { Outlet } from "react-router-dom"
import { MainLayout } from "./components/layouts/MainLayout"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems } from "./constants"

export function Component() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav className="border-r" items={navItems} />
      <div className="p-4xl flex-1 flex">
        <MainLayout>
          <Outlet />
        </MainLayout>
      </div>
    </div>
  )
}
