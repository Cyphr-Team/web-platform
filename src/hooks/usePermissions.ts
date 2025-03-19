import { checkIsJudge, checkIsWorkspaceAdmin } from "@/utils/check-roles"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { isEnableKYBV2 } from "@/utils/feature-flag.utils"
import { useMemo } from "react"

const usePermissions = () => {
  // Role checks
  const isJudge = useMemo(() => checkIsJudge(), [])
  const isWorkspaceAdmin = useMemo(() => checkIsWorkspaceAdmin(), [])
  const shouldDisplayCashFlowReport = useMemo(() => !isJudge, [isJudge])

  // Domain-specific checks
  const shouldDisplayCashFlowTable = useMemo(
    () =>
      isLoanReady() || isKccBank() || isCyphrBank() || isSbb() || isLaunchKC(),
    []
  )
  const shouldDisplayOperatingExpensesSection = useMemo(() => !isLaunchKC(), [])

  // Combination check
  const shouldDisplayHighRiskEntity = useMemo(
    () => isEnableKYBV2() && isSbb(),
    []
  )

  return {
    isJudge,
    isWorkspaceAdmin,
    shouldDisplayCashFlowTable,
    shouldDisplayHighRiskEntity,
    shouldDisplayCashFlowReport,
    shouldDisplayOperatingExpensesSection
  }
}

export default usePermissions
