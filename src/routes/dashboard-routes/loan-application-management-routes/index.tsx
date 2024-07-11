import { APP_PATH } from "@/constants"
import { handleCrumb } from "@/utils/crumb.utils"
import {
  isCyphrBank,
  isKccBank,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { Route } from "react-router-dom"
import { documentRoutes } from "./document-routes"
import { CashFlowCustom } from "@/modules/loan-application-management/pages/custom/cash-flow"
import { CashFlowOutOfBox } from "@/modules/loan-application-management/pages/out-of-box/cash-flow"
import { lazy } from "react"

/**
 * Loan application management routes ("/application"). Loan officer review loan application.
 */

const CashFlowPage = lazy(
  () =>
    import(
      "@/modules/loan-application-management/components/pages/CashFlow.page"
    )
)
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

      {/* IDENTITY VERIFICATION */}
      {(isKccBank() || isSbb()) && (
        <Route
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYC}
          lazy={() =>
            import(
              "@/modules/loan-application-management/components/pages/IdentityVerification.page"
            )
          }
        />
      )}

      {/* DOCUMENTS */}
      {documentRoutes}

      {/* LOAN SUMMARY - LOAN READY LOAN SUMMARY */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY}
        lazy={() =>
          isCyphrBank() || isKccBank() || isSbb()
            ? import(
                "@/modules/loan-application-management/pages/out-of-box/loan-summary"
              )
            : isLoanReady()
              ? import(
                  "@/modules/loan-application-management/pages/custom/loan-summary"
                )
              : import(
                  "@/modules/loan-application-management/pages/loan-summary"
                )
        }
      />

      {/* CASH FLOW - LOAN READY CASH FLOW - OUT OF BOX CASH FLOW */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW}
        element={
          isLoanReady() ? (
            <CashFlowCustom />
          ) : isCyphrBank() || isKccBank() || isSbb() ? (
            <CashFlowOutOfBox />
          ) : (
            <CashFlowPage />
          )
        }
      />
    </Route>
  </Route>
)

export { loanApplicationManagementRoutes }
