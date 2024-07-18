import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { featureFlagsService } from "@/services/feature-flag.service"

export function checkEnabledFeatureFlag(key: FEATURE_FLAGS) {
  const featureFlags = featureFlagsService.getFeatureFlags()
  const featureFlag = featureFlags.find(
    (featureFlag) => featureFlag.key === key
  )
  return !!featureFlag?.enabled
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

function isEnableReviewApplicationStep() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.REVIEW_APPLICATION_STEP)
}

function isEnableSubscriptionManagement() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.SUBSCRIPTION_MANAGEMENT)
}

function isEnabledBankAccountConnectionV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.BANK_ACCOUNT_CONNECTION_V2)
}

function isEnableIdentityVerificationSectionView() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.IDENTITY_VERIFICATION_SECTION_VIEW
  )
}

function isEnableNewInquiryPersonaKycCreatingLogic() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.NEW_PERSONA_KYC_CREATING_LOGIC)
}

function formsConfigurationEnabled() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.LOAN_PROGRAM_FORMS_CONFIGURATION)
}

function isEnableJudgeSubmitScore() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.JUDGE_SUBMIT_SCORE)
}

/**
 * Changes on KYB for HRE
 * 1. Industry Classification
 * 2. Adverse Media
 */
function isEnableKYBV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.KYB_V2)
}

export {
  isEnableJudgeSubmitScore,
  isEnableDownloadCSVAndJSONSummary,
  isEnableReviewApplicationStep,
  isEnablePersonaKycV1,
  isEnableLenderDashboardV2DummyData,
  isEnableDashboardV2,
  isEnableSubscriptionManagement,
  isEnabledBankAccountConnectionV2,
  isEnableIdentityVerificationSectionView,
  isEnableNewInquiryPersonaKycCreatingLogic,
  isEnableKYBV2,
  formsConfigurationEnabled
}
