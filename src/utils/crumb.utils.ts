import { APP_PATH } from "@/constants"
import { Breadcrumb } from "@/types/common.type"
import { ReactNode } from "react"

enum CustomLabelKey {
  loanApplicationDetail = "loanApplicationDetail",
  documentDetail = "documentDetail"
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
