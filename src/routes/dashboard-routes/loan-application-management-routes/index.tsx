import { APP_PATH } from "@/constants"
import { LoanReadyCashFlow } from "@/modules/loan-application-management/pages/loan-ready/cash-flow"
import { CashFlowOutOfBox } from "@/modules/loan-application-management/pages/out-of-box/cash-flow"
import { handleCrumb } from "@/utils/crumb.utils"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { lazy } from "react"
import { Outlet, Route } from "react-router-dom"
import { documentRoutes } from "./document-routes"
import { AdminFinancialProjectionLayout } from "@/modules/loan-application/[module]-financial-projection/components/layouts/AdminFinancialProjectionLayout.tsx"

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
      {(isKccBank() || isSbb() || isLaunchKC()) && (
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
        lazy={() => {
          if (isSbb())
            return import(
              "@/modules/loan-application-management/pages/sbb/loan-summary"
            )
          if (isCyphrBank() || isKccBank() || isLaunchKC())
            return import(
              "@/modules/loan-application-management/pages/out-of-box/loan-summary"
            )
          if (isLoanReady())
            return import(
              "@/modules/loan-application-management/pages/loan-ready/loan-summary"
            )
          return import(
            "@/modules/loan-application-management/pages/loan-summary"
          )
        }}
      />

      {/* CASH FLOW - LOAN READY CASH FLOW - OUT OF BOX CASH FLOW */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW}
        element={
          isLoanReady() ? (
            <LoanReadyCashFlow />
          ) : isCyphrBank() || isKccBank() || isSbb() || isLaunchKC() ? (
            <CashFlowOutOfBox />
          ) : (
            <CashFlowPage />
          )
        }
      />

      {/* DEBT SCHEDULE */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DEBT_SCHEDULE}
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/sbb/debt-schedule"
          )
        }
      />

      {/* LOAN READINESS ROUTE */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_READINESS.detail}
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/cyphr-flex/LoanReadiness"
          )
        }
      />

      {/* FINANCIAL PROJECTIONS */}
      <Route
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.INDEX(":id")}
        element={
          <AdminFinancialProjectionLayout>
            <Outlet />
          </AdminFinancialProjectionLayout>
        }
      >
        <Route
          index
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.OVERVIEW(":id")}
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpOverviewPage"
            )
          }
        />

        <Route
          index
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.CASH_FLOW(":id")}
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpCashFlowPage"
            )
          }
        />

        <Route
          index
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.BALANCE_SHEET(
            ":id"
          )}
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpBalanceSheetPage"
            )
          }
        />

        <Route
          index
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.INCOME_STATEMENT(
            ":id"
          )}
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpIncomeStatementPage"
            )
          }
        />

        <Route
          index
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.LOAN_READY(
            ":id"
          )}
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpLoanReadyPage"
            )
          }
        />
      </Route>
    </Route>
  </Route>
)

export { loanApplicationManagementRoutes }
