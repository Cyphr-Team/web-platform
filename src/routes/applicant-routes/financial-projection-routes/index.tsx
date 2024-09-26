import { APP_PATH } from "@/constants"
import { ApplicantFinancialProjectionsLayout } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ApplicantFinancialProjectionsLayout"
import { Outlet, Route } from "react-router-dom"

/**
 * Available loan program routes ("/loan/financial").
 */
const applicantFinancialProjectionRoutes = (
  <Route
    path={APP_PATH.LOAN_APPLICATION.FINANCIAL.index}
    element={
      <ApplicantFinancialProjectionsLayout>
        <Outlet />
      </ApplicantFinancialProjectionsLayout>
    }
  >
    <Route
      index
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW}
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpOverviewPage"
        )
      }
    />

    <Route
      index
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.CASH_FLOW}
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpCashFlowPage"
        )
      }
    />

    <Route
      index
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.BALANCE_SHEET}
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpBalanceSheetPage"
        )
      }
    />

    <Route
      index
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.INCOME_STATEMENT}
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpIncomeStatementPage"
        )
      }
    />

    <Route
      index
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.LOAN_READY}
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpLoanReadyPage"
        )
      }
    />
  </Route>
)

export { applicantFinancialProjectionRoutes }
