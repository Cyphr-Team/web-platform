import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { featureFlagsService } from "@/services/feature-flag.service"
import { isKccBank } from "@/utils/domain.utils.ts"

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

/*
 * Enable Loan Ready V2
 */
function isEnableLoanReadyV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.LOAN_READY_V2)
}

/**
 * Enable FormV2
 */
function isEnableFormV2() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.FORM_V2)
}

/**
 * Enable Historical Financials Enrichment
 */
function isEnableHistoricalFinancialsEnrichment() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.HISTORICAL_FINANCIALS_ENRICHMENT)
}

/**
 * Enable PII Self-Service
 */
function isEnablePIISelfService() {
  return checkEnabledFeatureFlag(FEATURE_FLAGS.PII_SELF_SERVICE)
}

/**
 * Disable KYC Persona for KCChamber
 */
function isEnableKCChamberKycPersonaDisabled() {
  return (
    isKccBank() &&
    checkEnabledFeatureFlag(FEATURE_FLAGS.KCCHAMBER_PERSONA_KYC_DISABLED)
  )
}

export {
  isEnableLoanReadyV2,
  isEnablePandaDocESign,
  isEnableDownloadCSVAndJSONSummary,
  isEnableSubscriptionManagement,
  isEnableKYBV2,
  formsConfigurationEnabled,
  isEnableMultiFactorAuthentication,
  isEnableMultiFactorAuthenticationForAdminPortal,
  isIgnoredKycSubmission,
  isIgnoredCashFlowSubmission,
  isEnableLoanProgramChangesManagement,
  isEnableGoogleMapInput,
  isEnableChatSupport,
  isEnableFormV2,
  isEnableKCChamberKycPersonaDisabled,
  isEnableHistoricalFinancialsEnrichment,
  isEnablePIISelfService
}
