import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { featureFlagsService } from "@/services/feature-flag.service"
import { isLaunchKC } from "@/utils/domain.utils.ts"

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

function isEnablePersonaKycV1() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.PERSONA_KYC_V1)
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
  return checkEnabledFeatureFlag(FEATURE_FLAGS.KYC_REORDER) || isLaunchKC()
}

/**
 * Changes on Authentication Flow - MFA with Stytch
 */

function isEnableTermAgreementsCheckbox() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.TERM_AGREEMENTS_CHECKBOX)
}

/**
 * Checks if Multi-Factor Authentication is enabled for all Portals.
 * @returns {boolean} - True if the feature flag for MFA is enabled, otherwise false.
 */

function isEnableMultiFactorAuthentication() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.MULTI_FACTOR_AUTHENTICATION)
}

/**
 * Checks if Multi-Factor Authentication is enabled for the Admin Portal.
 * This flag is only used for the Admin Portal, and only works when the MULTI_FACTOR_AUTHENTICATION flag is also enabled.
 * @returns {boolean} - True if the feature flag for MFA in Admin Portal is enabled, otherwise false.
 */

function isEnableMultiFactorAuthenticationForAdminPortal() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.MULTI_FACTOR_AUTHENTICATION_ADMIN_PORTAL
  )
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

/*
 * Replace the workspace-admin-list with workspace-admin-list-filter
 */
function isEnableWorkspaceAdminFilterApplicationScores() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.WORKSPACE_ADMIN_FILTER_APPLICATION_SCORES
  )
}

/*
 * New Submit Form Strategy - Submit form using Promise.all
 */

function isEnableNewSubmitFormStrategy() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.NEW_SUBMIT_FORM_STRATEGY)
}

/*
 * Show the filter by scorecard in workspace-admin-list-filter
 */
function isEnableWorkspaceAdminFilterByScorecard() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.WORKSPACE_ADMIN_FILTER_BY_SCORECARD
  )
}

/*
 * Allow applicants to submit applications without KYC step
 */
function isIgnoredKycSubmission() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.IGNORE_KYC_SUBMISSION)
}

/*
 * Allow applicants to submit applications without CashFLow step
 */
function isIgnoredCashFlowSubmission() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.IGNORE_CASHFLOW_SUBMISSION)
}

function isEnableExecutionFormNewMonthlyExpense() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.EXECUTION_FORM_NEW_MONTHLY_EXPENSE
  )
}

function isEnableFinancialProjection() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.FINANCIAL_PROJECTION_TAB)
}

function isEnableDummyLoanReadiness() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.DUMMY_LOAN_READINESS)
}

function isEnableConferenceDemo() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.CONFERENCE_DEMO)
}

export {
  isEnableWorkspaceAdminFilterByScorecard,
  isEnableWorkspaceAdminFilterApplicationScores,
  isEnablePandaDocESign,
  isEnableJudgeSubmitScore,
  isEnableDownloadCSVAndJSONSummary,
  isEnableReviewApplicationStep,
  isEnablePersonaKycV1,
  isEnableSubscriptionManagement,
  isEnabledBankAccountConnectionV2,
  isEnableNewInquiryPersonaKycCreatingLogic,
  isEnableKYBV2,
  formsConfigurationEnabled,
  isEnableKycReOrder,
  isEnableMultiFactorAuthentication,
  isEnableMultiFactorAuthenticationForAdminPortal,
  isEnableTermAgreementsCheckbox,
  isEnableNewSubmitFormStrategy,
  isIgnoredKycSubmission,
  isIgnoredCashFlowSubmission,
  isEnableExecutionFormNewMonthlyExpense,
  isEnableFinancialProjection,
  isEnableDummyLoanReadiness,
  isEnableConferenceDemo
}
