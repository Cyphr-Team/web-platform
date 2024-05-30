import { TopNav } from "./components/molecules/TopNav.tsx"
import { InvitationTable } from "./table/invitations-table.tsx"

export function Component() {
  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <TopNav />
      <InvitationTable />
    </div>
  )
}

Component.displayName = "InvitationPage"
