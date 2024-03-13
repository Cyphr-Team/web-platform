import { APP_PATH } from "@/constants"
import { NotificationReferenceType } from "../constants"

export const getReferenceResource = (
  referenceType: string,
  referenceId: string
) => {
  let referenceResource = null
  switch (referenceType.toUpperCase()) {
    // User types
    case NotificationReferenceType.USER_PROFILE_DETAILS:
      referenceResource = APP_PATH.SETUP_PROFILE
      break
    case NotificationReferenceType.USER_LIST:
      referenceResource = APP_PATH.ADMIN_USERS.index
      break
    case NotificationReferenceType.USER_ACCEPTED_INVITATION:
      referenceResource = APP_PATH.ACCEPT_INVITE
      break

    // Loan application types for applicant
    case NotificationReferenceType.LOAN_APPLICATION_LIST:
      referenceResource = APP_PATH.LOAN_APPLICATION.APPLICATIONS.index
      break
    case NotificationReferenceType.LOAN_APPLICATION_DETAILS:
      referenceResource =
        APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(referenceId)
      break

    // Loan application review types for loan officer
    case NotificationReferenceType.LOAN_APPLICATION_REVIEW:
    case NotificationReferenceType.LOAN_APPLICATION_REVIEW_BUSINESS_VERIFICATION:
      referenceResource =
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
          referenceId
        )
      break
    case NotificationReferenceType.LOAN_APPLICATION_REVIEW_DOCUMENT:
      referenceResource =
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(referenceId)
      break
    case NotificationReferenceType.LOAN_APPLICATION_REVIEW_CASH_FLOW:
      referenceResource =
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW.replace(
          ":id",
          referenceId
        )
      break
    case NotificationReferenceType.LOAN_APPLICATION_REVIEW_LOAN_SUMMARY:
      referenceResource =
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY.replace(
          ":id",
          referenceId
        )
      break
    case NotificationReferenceType.LOAN_APPLICATION_REVIEW_LOAN_DECISION:
      referenceResource =
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_DECISION.replace(
          ":id",
          referenceId
        )
      break

    // Loan Program types for CDFI Admin
    case NotificationReferenceType.LOAN_PROGRAM_LIST:
    case NotificationReferenceType.LOAN_PROGRAM_DETAILS:
      referenceResource = APP_PATH.LOAN_PROGRAM.index
      break

    // Message types
    case NotificationReferenceType.MESSAGE_LIST:
    case NotificationReferenceType.MESSAGE_CONVERSATION:
      referenceResource = APP_PATH.MESSAGES
      break
  }
  return referenceResource
}
