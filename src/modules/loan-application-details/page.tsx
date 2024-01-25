import { Outlet } from "react-router-dom"
import { MainLayout } from "./components/layouts/MainLayout"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems } from "./constants"

export function Component() {
  return (
    <div className="flex h-screen">
      <SideNav className="border-r" items={navItems} />
      <div className="flex-1 pt-4xl flex flex-col">
        <MainLayout>
          <Outlet />
        </MainLayout>
      </div>
    </div>
  )
}
