import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs.tsx"
import { TopNav } from "./components/molecules/TopNav.tsx"
import { InvitationTable } from "./table/invitations-table.tsx"
import { useBreadcrumb } from "@/hooks/useBreadcrumb.ts"

export function Component() {
  const breadcrumbs = useBreadcrumb()

  return (
    <div className="mx-auto p-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <TopNav />
      <InvitationTable />
    </div>
  )
}

Component.displayName = "InvitationPage"
