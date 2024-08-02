import { APP_PATH } from "@/constants"
import { Breadcrumb } from "@/types/common.type"
import { ReactNode } from "react"

enum CustomLabelKey {
  loanApplicationDetail = "loanApplicationDetail",
  documentDetail = "documentDetail",
  loanProgramDetail = "loanProgramDetail"
}

type CustomLabel = {
  [key in CustomLabelKey]?: ReactNode
}

type Ids = {
  [key in CustomLabelKey]?: string
}

type CrumbData = {
  customLabel?: CustomLabel
  ids?: Ids
}

const buildCustomLabel = (key: CustomLabelKey, label: ReactNode) => {
  return { [key]: label }
}

const buildIds = (key: CustomLabelKey, id?: string) => {
  return { [key]: id }
}

const buildCrumb = (to: string, label: ReactNode): Breadcrumb => {
  return { to, label }
}

const getCrumbByPath = (path: string, customLabel?: CustomLabel, ids?: Ids) => {
  switch (path) {
    /**
     * OFFICER
     * Loan Applications
     *    List
     *    Detail
     *      Document
     *        Detail
     */
    case APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX:
      return buildCrumb(
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
        "Applications"
      )

    case APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detail:
      return buildCrumb(
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detailWithId(
          ids?.loanApplicationDetail ?? ""
        ),
        customLabel?.[CustomLabelKey.loanApplicationDetail] ||
          "Application Detail"
      )

    case APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.index:
      return buildCrumb(
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(
          ids?.loanApplicationDetail ?? ""
        ),
        "Documents"
      )

    case APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.index:
      return buildCrumb(
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.detail(
          ids?.loanApplicationDetail ?? "",
          ids?.documentDetail ?? ""
        ),
        "Document Detail"
      )

    /**
     * OFFICER
     * Loan Program
     *    List
     */
    case APP_PATH.LOAN_PROGRAM.index:
      return buildCrumb(APP_PATH.LOAN_PROGRAM.index, "Loan Program")

    /**
     * OFFICER
     * User
     * ├── List
     * ├── Invitation
     */
    case APP_PATH.ADMIN_USERS.USER.index:
      return buildCrumb(APP_PATH.ADMIN_USERS.USER.index, "User")
    case APP_PATH.ADMIN_USERS.INVITATION.index:
      return buildCrumb(APP_PATH.ADMIN_USERS.INVITATION.index, "Invitation")

    /**
     * APPLICANT
     * Loan Program
     *    Detail
     */
    case APP_PATH.LOAN_APPLICATION.INDEX:
      return buildCrumb(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list, "Home")

    case APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detail:
      return buildCrumb(
        APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
          ids?.documentDetail ?? ""
        ),
        customLabel?.[CustomLabelKey.documentDetail] || "Loan Program Detail"
      )

    default:
      return buildCrumb(APP_PATH.INDEX, "Home")
  }
}

const handleCrumb = (path: string) => ({
  crumb: ({ customLabel, ids }: CrumbData) =>
    getCrumbByPath(path, customLabel, ids)
})

type HandleCrumb = ReturnType<typeof handleCrumb>

export { handleCrumb, buildCustomLabel, buildIds, CustomLabelKey }
export type { HandleCrumb, CrumbData }
