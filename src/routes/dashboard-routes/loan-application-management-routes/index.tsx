import { APP_PATH } from "@/constants"
import { handleCrumb } from "@/utils/crumb.utils"
import { getSubdomain, isLoanReady } from "@/utils/domain.utils"
import { Route } from "react-router-dom"
import { documentRoutes } from "./document-routes"
import { Institution } from "@/constants/tenant.constants"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"

/**
 * Loan application management routes ("/application"). Loan officer review loan application.
 */
const loanApplicationManagementRoutes = (
  <Route
    path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX}
    handle={handleCrumb(APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX)}
  >
    {/* LIST LOAN APPLICATION */}
    <Route
      index
      lazy={() => import("@/modules/loan-application-management/pages/list")}
    />

    {/* DETAIL LOAN APPLICATION */}
    <Route
      lazy={() => import("@/modules/loan-application-management/pages/detail")}
      handle={handleCrumb(
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detail
      )}
    >
      {/* BUSINESS VERIFICATION */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detail}
        lazy={() =>
          import(
            "@/modules/loan-application-management/components/pages/BusinessVerification.page"
          )
        }
      />

      {/* DOCUMENTS */}
      {documentRoutes}

      {/* LOAN SUMMARY - LOAN READY LOAN SUMMARY */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY}
        lazy={() =>
          isLoanReady()
            ? import(
                "@/modules/loan-application-management/pages/out-of-box/loan-summary"
              )
            : import("@/modules/loan-application-management/pages/loan-summary")
        }
      />

      {/* CASH FLOW - LOAN READY CASH FLOW */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW}
        lazy={() => {
          switch (getSubdomain()) {
            case Institution.LoanReady:
              if (isEnableCashFlowV2()) {
                return import(
                  "@/modules/loan-application-management/pages/out-of-box/cash-flow"
                )
              } else {
                return import(
                  "@/modules/loan-application-management/pages/custom/cash-flow"
                )
              }
            // TODO: Add CyphrV2 case
            default:
              return import(
                "@/modules/loan-application-management/components/pages/CashFlow.page"
              )
          }
        }}
      />
    </Route>
  </Route>
)

export { loanApplicationManagementRoutes }
