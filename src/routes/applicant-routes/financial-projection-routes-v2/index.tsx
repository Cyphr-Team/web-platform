import { APP_PATH } from "@/constants"
import { ApplicantFinancialProjectionsLayout } from "@/modules/loan-application/[module]-financial-projection/components/layouts/ApplicantFinancialProjectionsLayout"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import { Outlet, Route } from "react-router-dom"

/**
 * Available loan program routes ("/loan/:loanProgramId/financial-applications/:id).
 */
const applicantFinancialProjectionRoutesV2 = (
  <Route
    element={
      <ApplicantFinancialProjectionsLayout>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Outlet />
        </Suspense>
      </ApplicantFinancialProjectionsLayout>
    }
  >
    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpOverviewPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.overview(
        ":loanProgramId",
        ":id"
      )}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpCashFlowPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.cashFlow(
        ":loanProgramId",
        ":id"
      )}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-financial-projection/components/pages/FpBalanceSheetPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.balanceSheet(
        ":loanProgramId",
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
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailFinancialProjections.incomeStatement(
        ":loanProgramId",
        ":id"
      )}
    />
  </Route>
)

export { applicantFinancialProjectionRoutesV2 }
