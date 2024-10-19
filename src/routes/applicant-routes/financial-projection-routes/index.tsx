import { APP_PATH } from "@/constants"
import { ApplicantFinancialProjectionsLayout } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ApplicantFinancialProjectionsLayout"
import { Outlet, Route } from "react-router-dom"

/**
 * Available loan program routes ("/loan/financial").
 */
const applicantFinancialProjectionRoutes = (
  <Route
    element={
      <ApplicantFinancialProjectionsLayout>
        <Outlet />
      </ApplicantFinancialProjectionsLayout>
    }
    path={APP_PATH.LOAN_APPLICATION.FINANCIAL.INDEX(":id")}
  >
    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpOverviewPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW(":id")}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpCashFlowPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.CASH_FLOW(":id")}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpBalanceSheetPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.BALANCE_SHEET(":id")}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpIncomeStatementPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.INCOME_STATEMENT(":id")}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpLoanReadyPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.LOAN_READY(":id")}
    />
  </Route>
)

export { applicantFinancialProjectionRoutes }
