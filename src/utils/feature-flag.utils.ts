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

function isEnablePersonaKycV1() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.PERSONA_KYC_V1)
}

function isEnableLenderDashboardV2DummyData() {
  return (
    checkEnabledFeatureFlag(FEATURE_FLAGS.LENDER_DASHBOARD_V2) &&
    checkEnabledFeatureFlag(FEATURE_FLAGS.LENDER_DASHBOARD_V2_DUMMY_DATA)
  )
}

function isEnableDownloadCSVAndJSONSummary() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.DOWNLOAD_CSV_AND_JSON_SUMMARY)
}

export {
  isEnableDownloadCSVAndJSONSummary,
  isEnablePersonaKycV1,
  isEnableLenderDashboardV2DummyData,
  isEnableDashboardV2
}
