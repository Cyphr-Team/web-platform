import { Institution } from "@/constants/tenant.constants"
import { UserRoles } from "@/types/user.type"
import { getUserRoles } from "@/utils/check-roles"
import { getRootSubdomain, getSubdomain } from "@/utils/domain.utils"
import { get } from "lodash"
import { useCallback } from "react"

export const enum FeatureKey {
  APPLICANT_HOME = "applicantHome",
  APPLICANT_APPLICATION = "applicantApplication",
  APPLICANT_NOTIFICATION = "applicantNotification",
  LOAN_PROGRAM = "loanProgram",
  OPERATING_EXPENSE = "operatingExpense",
  DASHBOARD = "dashboard",
  SUBSCRIPTION = "subscription",
  FEATURE_FLAG = "featureFlag",
  APPLICATION = "application",
  USER = "user",
  ONBOARD = "onboard",
  FINANCIAL = "financial",
  CHATBOT_DOCUMENT = "chatbotDocument",
  SETTINGS = "settings",
  LOGO_WITH_TEXT = "logoWithText",

  /**
   * Access applicant document
   */
  APPLICANT_DOCUMENT = "document",
  DOWNLOAD_APPLICANT_DOCUMENT = "downloadApplicantDocument"
}

interface IUseCanProps {
  featureKey: FeatureKey
}

/**
 * TODO: Update for other institutions
 */
const getEntitlement = () => {
  return {
    [Institution.LaunchKC]: {
      [FeatureKey.LOAN_PROGRAM]: {
        [UserRoles.WORKSPACE_ADMIN]: false
      },
      [FeatureKey.DOWNLOAD_APPLICANT_DOCUMENT]: {
        [UserRoles.WORKSPACE_ADMIN]: true
      },
      [FeatureKey.OPERATING_EXPENSE]: {
        [UserRoles.WORKSPACE_ADMIN]: false,
        [UserRoles.JUDGE]: false,
        [UserRoles.APPLICANT]: false
      }
    },
    [Institution.CapitalCollab]: {
      [FeatureKey.DOWNLOAD_APPLICANT_DOCUMENT]: {
        [UserRoles.WORKSPACE_ADMIN]: true,
        [UserRoles.APPLICANT]: true
      },
      [FeatureKey.LOGO_WITH_TEXT]: {
        [UserRoles.WORKSPACE_ADMIN]: false,
        [UserRoles.APPLICANT]: false
      }
    },
    [Institution.LoanReady]: {
      [FeatureKey.SETTINGS]: {
        [UserRoles.WORKSPACE_ADMIN]: true
      }
    }
  }
}

/**
 * This hooks is use for checking access to specific feature by institution, roles and 'featureKey'
 *
 * @see ProtectedRoute.tsx // use for condition rendering route
 * @see FeatureRenderer.tsx // Use for condition rendering 'SideNav' items
 */
const useCanAccess = ({ featureKey }: IUseCanProps) => {
  const institution = getRootSubdomain(getSubdomain())
  const permissions = get(getEntitlement(), [institution, featureKey])
  const userRoles = getUserRoles()

  const getCanAccess = useCallback(() => {
    // Default is true if not defined
    if (!permissions) return true

    // Check permission for each role
    // If empty/false -> false
    // If true -> true
    return userRoles.some((role) => {
      return get(permissions, role?.toUpperCase())
    })
  }, [permissions, userRoles])

  return { getCanAccess }
}

export default useCanAccess
