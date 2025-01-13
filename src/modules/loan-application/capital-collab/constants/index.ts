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
    href: "documents"
  }
]

export const enum ExportFPOption {
  DISCLAIMER_NOTE = "DISCLAIMER_NOTE",
  APPLICATION_SUMMARY = "APPLICATION_SUMMARY"
}

export const PDFPageOrder = [
  ExportFPOption.DISCLAIMER_NOTE,
  ExportFPOption.APPLICATION_SUMMARY
]

export const CapitalCollabS3Documents = {
  TERMS_OF_SERVICE: {
    documentName: "Capital Collab - Terms of Service",
    documentId: "e26d0841-e649-4b81-b33b-85cea31360e1"
  },
  PRIVACY_POLICY: {
    documentName: "Capital Collab - Privacy Policy",
    documentId: "09d7a0b2-e3fb-4451-ac56-225c6da87d70"
  }
}
