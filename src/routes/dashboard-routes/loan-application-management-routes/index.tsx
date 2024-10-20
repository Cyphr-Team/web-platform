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
    handle={handleCrumb(APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX)}
    path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX}
  >
    {/* LIST LOAN APPLICATION */}
    <Route
      index
      lazy={() => import("@/modules/loan-application-management/pages/list")}
    />

    {/* DETAIL LOAN APPLICATION */}
    <Route
      handle={handleCrumb(
        APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detail
      )}
      lazy={() => import("@/modules/loan-application-management/pages/detail")}
    >
      {/* BUSINESS VERIFICATION */}
      <Route
        lazy={() =>
          import(
            "@/modules/loan-application-management/components/pages/BusinessVerification.page"
          )
        }
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detail}
      />

      {/* IDENTITY VERIFICATION */}
      {(isKccBank() || isSbb() || isLaunchKC()) && (
        <Route
          lazy={() =>
            import(
              "@/modules/loan-application-management/components/pages/IdentityVerification.page"
            )
          }
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYC}
        />
      )}

      {/* DOCUMENTS */}
      {documentRoutes}

      {/* LOAN SUMMARY - LOAN READY LOAN SUMMARY */}
      <Route
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
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY}
      />

      {/* CASH FLOW - LOAN READY CASH FLOW - OUT OF BOX CASH FLOW */}
      <Route
        element={
          isLoanReady() ? (
            <LoanReadyCashFlow />
          ) : isCyphrBank() || isKccBank() || isSbb() || isLaunchKC() ? (
            <CashFlowOutOfBox />
          ) : (
            <CashFlowPage />
          )
        }
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW}
      />

      {/* DEBT SCHEDULE */}
      <Route
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/sbb/debt-schedule"
          )
        }
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DEBT_SCHEDULE}
      />

      {/* LOAN READINESS ROUTE */}
      <Route
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/cyphr-flex/LoanReadiness"
          )
        }
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_READINESS.detail}
      />

      {/* FINANCIAL PROJECTIONS */}
      <Route
        element={
          <AdminFinancialProjectionLayout>
            <Outlet />
          </AdminFinancialProjectionLayout>
        }
        path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.INDEX(":id")}
      >
        <Route
          index
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpOverviewPage"
            )
          }
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.OVERVIEW(":id")}
        />

        <Route
          index
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpCashFlowPage"
            )
          }
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.CASH_FLOW(":id")}
        />

        <Route
          index
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpBalanceSheetPage"
            )
          }
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.BALANCE_SHEET(
            ":id"
          )}
        />

        <Route
          index
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpIncomeStatementPage"
            )
          }
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.INCOME_STATEMENT(
            ":id"
          )}
        />

        <Route
          index
          lazy={() =>
            import(
              "@/modules/loan-application/[module]-financial-projection/components/pages/FpLoanReadyPage"
            )
          }
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.FINANCIAL.LOAN_READY(
            ":id"
          )}
        />
      </Route>
    </Route>
  </Route>
)

export { loanApplicationManagementRoutes }
