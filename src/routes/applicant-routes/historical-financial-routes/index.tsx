import { Outlet, Route } from "react-router-dom"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { APP_PATH } from "@/constants"
import { ApplicantHistoricalFinancialsLayout } from "@/modules/loan-application/[module]-data-enrichment/components/layouts/ApplicantHistoricalFinancialsLayout.tsx"

const applicantHistoricalFinancialsRoutes = (
  <Route
    element={
      <ApplicantHistoricalFinancialsLayout>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Outlet />
        </Suspense>
      </ApplicantHistoricalFinancialsLayout>
    }
  >
    <Route
      index
      lazy={() =>
        import(
          "@/modules/loan-application/[module]-data-enrichment/components/pages/HistoricalIncomeStatementPage"
        )
      }
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailHistoricalFinancials.incomeStatement(
        ":loanProgramId",
        ":id"
      )}
    />
  </Route>
)

export { applicantHistoricalFinancialsRoutes }
