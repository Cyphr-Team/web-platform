import { Route } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { lazy } from "react"
import { FinancialToolkitLayout } from "@/modules/financial-projection/components/layout"

const FinancialToolkitDetailPage = lazy(
  () =>
    import(
      "@/modules/financial-projection/components/pages/FinancialToolkitDetailPage"
    )
)
export const financialProjectionRoute = (
  <Route element={<FinancialToolkitLayout />}>
    <Route
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.detail}
      element={<FinancialToolkitDetailPage />}
    />
  </Route>
)
