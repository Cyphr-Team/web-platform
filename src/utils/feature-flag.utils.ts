import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { featureFlagsService } from "@/services/feature-flag.service"
import { isLaunchKC, isSbb } from "@/utils/domain.utils.ts"

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

function isEnableDownloadCSVAndJSONSummary() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.DOWNLOAD_CSV_AND_JSON_SUMMARY)
}

function isEnableSubscriptionManagement() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.SUBSCRIPTION_MANAGEMENT)
}

function formsConfigurationEnabled() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.LOAN_PROGRAM_FORMS_CONFIGURATION)
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
  return (
    checkEnabledFeatureFlag(FEATURE_FLAGS.KYC_REORDER) ||
    isLaunchKC() ||
    isSbb()
  )
}

/**
 * Changes on Authentication Flow - MFA with Stytch
 */

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

/**
 * Checks if Multi-Factor Authentication is enabled for the REP Portals.
 * This flag is only used for the REP Portals, but not for LaunchKC Rep Portal.
 * If you want to enable MFA for LaunchKC Rep Portal, please turn on MULTI_FACTOR_AUTHENTICATION_LAUNCHKC flag too.
 * @returns {boolean} - True if the feature flag for MFA in Reps Portal is enabled, otherwise false.
 */
function isEnableMultiFactorAuthenticationForRepPortals() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.MULTI_FACTOR_AUTHENTICATION_REP_PORTALS
  )
}

/**
 * Checks if Multi-Factor Authentication is enabled for the LaunchKC Portal.
 * This flag is only used for the LaunchKC Portal, and only works when the MULTI_FACTOR_AUTHENTICATION/ MULTI_FACTOR_AUTHENTICATION_REP_PORTALS (Rep only) flag is also enabled.
 * @returns {boolean} - True if the feature flag for MFA in LaunchKC Portal is enabled, otherwise false.
 */
function isEnableMultiFactorAuthenticationForLaunchKC() {
  return checkEnabledFeatureFlag(
    FEATURE_FLAGS.MULTI_FACTOR_AUTHENTICATION_LAUNCHKC
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

/*
 * Enable Google Map Input for address fields
 */
function isEnableGoogleMapInput() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.GOOGLE_MAP_INPUT)
}

function isEnableLoanProgramChangesManagement() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.LOAN_PROGRAM_CHANGES_MANAGEMENT)
}

/*
 * Enable Lenda - Chat Support Bot
 */
function isEnableChatSupport() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.CHAT_SUPPORT)
}

function isEnablePlaidV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.PLAID_V2)
}

/*
 * Enable Loan Ready V2
 */
function isEnableLoanReadyV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.LOAN_READY_V2)
}

export {
  isEnablePlaidV2,
  isEnablePandaDocESign,
  isEnableDownloadCSVAndJSONSummary,
  isEnableSubscriptionManagement,
  isEnableKYBV2,
  formsConfigurationEnabled,
  isEnableKycReOrder,
  isEnableMultiFactorAuthentication,
  isEnableMultiFactorAuthenticationForAdminPortal,
  isEnableMultiFactorAuthenticationForRepPortals,
  isEnableMultiFactorAuthenticationForLaunchKC,
  isIgnoredKycSubmission,
  isIgnoredCashFlowSubmission,
  isEnableLoanProgramChangesManagement,
  isEnableGoogleMapInput,
  isEnableChatSupport,
  isEnableLoanReadyV2
}
