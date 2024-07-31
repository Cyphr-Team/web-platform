import { useMemo } from "react"
import { checkIsJudge, checkIsWorkspaceAdmin } from "@/utils/check-roles"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { isEnableKYBV2, isEnablePersonaKycV1 } from "@/utils/feature-flag.utils"

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

  // Feature-flag checks
  const shouldDisplayIdentityVerification = useMemo(
    () => isEnablePersonaKycV1(),
    []
  )

  // Combination check
  const shouldDisplayHighRiskEntity = useMemo(
    () => isEnableKYBV2() && isSbb(),
    []
  )

  return {
    isJudge,
    isWorkspaceAdmin,
    shouldDisplayCashFlowTable,
    shouldDisplayIdentityVerification,
    shouldDisplayHighRiskEntity,
    shouldDisplayCashFlowReport
  }
}

export default usePermissions
