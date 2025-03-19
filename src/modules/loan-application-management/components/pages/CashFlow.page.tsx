import { isLaunchKC } from "@/utils/domain.utils"
import { AccountSummaryTable } from "../organisms/cashflow/AccountSummary"
import { CashFlowGlance } from "../organisms/cashflow/CashFlowGlance"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"

export function Component() {
  const isHidden = isLaunchKC() && !checkIsWorkspaceAdmin() // In LaunchKC, only WSAdmin can view this

  if (isHidden) return null

  return (
    <div>
      <AccountSummaryTable />
      <CashFlowGlance />
    </div>
  )
}

Component.displayName = "CashFlowPage"

export default Component
