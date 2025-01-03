import { APP_PATH } from "@/constants"
import { ApplicationMenuName } from "@/modules/loan-application-management/constants"

export const APPLICATION_MENU_CAPITAL_COLLAB = (id: string) => [
  {
    name: ApplicationMenuName.applicationSummary as string,
    href: `/application/${id}/loan-summary`
  },
  {
    name: ApplicationMenuName.business as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
      id
    )
  },
  {
    name: ApplicationMenuName.identity as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYC.replace(":id", id)
  },
  {
    name: ApplicationMenuName.cashflow as string,
    href: `/application/${id}/cash-flow`
  },
  {
    name: ApplicationMenuName.document as string,
    href: APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(id)
  }
]

export const APPLICANT_APPLICATION_SUMMARY_TOP_HEADER_MENU = [
  {
    name: ApplicationMenuName.applicationSummary,
    href: ""
  },
  {
    name: ApplicationMenuName.document,
    href: "document"
  }
]
