import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { featureFlagsService } from "@/services/feature-flag.service"
import { FeatureFlagStatus } from "@/types/feature-flag.types"

export function checkEnabledFeatureFlag(key: FEATURE_FLAGS) {
  const featureFlags = featureFlagsService.getFeatureFlags()
  const featureFlag = featureFlags.find(
    (featureFlag) => featureFlag.key === key
  )
  return featureFlag?.status === FeatureFlagStatus.ON
}

export function checkEnabledFeatureFlags(keys: FEATURE_FLAGS[]) {
  return keys.every((key) => checkEnabledFeatureFlag(key))
}

function isEnableDashboardV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.LENDER_DASHBOARD_V2)
}

function isEnableCashFlowV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.CASH_FLOW_V2)
}

export { isEnableDashboardV2, isEnableCashFlowV2 }
