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

function isEnableKycReOrder() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.KYC_REORDER)
}

/**
 * Changes on Authentication Flow - MFA with Stytch
 */

function isEnableSignUpReorder() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.SIGNUP_REORDER)
}

function isEnableTermAgreementsCheckbox() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.TERM_AGREEMENTS_CHECKBOX)
}

function isEnableMultiFactorAuthentication() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.MULTI_FACTOR_AUTHENTICATION)
}

/*
 * Replace step Sign and Submit with ESign with PandaDoc
 * 1. Applicant - Submit application - Last step confirmation
 * 2. Applicant - Application detail
 * 3. Workspace admin - Loan summary
 */
function isEnablePandaDocESign() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.PANDA_DOC_ESIGN_V1)
}

export {
  isEnablePandaDocESign,
  isEnableJudgeSubmitScore,
  isEnableDownloadCSVAndJSONSummary,
  isEnableReviewApplicationStep,
  isEnablePersonaKycV1,
  isEnableLenderDashboardV2DummyData,
  isEnableDashboardV2,
  isEnableSubscriptionManagement,
  isEnabledBankAccountConnectionV2,
  isEnableNewInquiryPersonaKycCreatingLogic,
  isEnableKYBV2,
  formsConfigurationEnabled,
  isEnableKycReOrder,
  isEnableSignUpReorder,
  isEnableMultiFactorAuthentication,
  isEnableTermAgreementsCheckbox
}
