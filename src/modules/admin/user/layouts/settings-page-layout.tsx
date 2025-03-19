import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { TopNav } from "@/modules/admin/user/components/molecules/SettingsPageTopNav"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { Outlet } from "react-router-dom"

export function SettingsPageLayout(): JSX.Element {
  const breadcrumbs = useBreadcrumb()

  return (
    <div className="mx-auto p-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <h1 className="text-3.5xl font-semibold">Settings</h1>
      <p className="mb-2 mt-1">Manage your preferences and account details</p>
      <TopNav />
      <div className="flex-1 overflow-auto pt-0">
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
