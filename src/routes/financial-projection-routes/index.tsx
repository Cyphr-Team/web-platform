import { Route } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { lazy } from "react"
import { FinancialToolkitLayout } from "@/modules/financial-projection/components/layout"

const FinancialToolkitPage = lazy(
  () =>
    import(
      "@/modules/financial-projection/components/pages/FinancialToolkitPage"
    )
)
const FinancialToolkitDetailPage = lazy(
  () =>
    import(
      "@/modules/financial-projection/components/pages/FinancialToolkitDetailPage"
    )
)

const CreateNewCompanyPage = lazy(
  () =>
    import(
      "@/modules/financial-projection/components/pages/CreateNewCompanyPage"
    )
)

const FinancialCompanyScenariosPage = lazy(
  () =>
    import(
      "@/modules/financial-projection/components/pages/scenarios/FinancialCompanyScenariosPage"
    )
)

export const financialProjectionRoute = (
  <Route path={APP_PATH.LOAN_APPLICATION.FINANCIAL.index}>
    <Route index element={<FinancialToolkitPage />} />
    <Route element={<FinancialToolkitLayout />}>
      <Route
        path={APP_PATH.LOAN_APPLICATION.FINANCIAL.detail}
        element={<FinancialToolkitDetailPage />}
      />
    </Route>
    <Route
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.company.create}
      element={<CreateNewCompanyPage />}
    />
    <Route
      path={APP_PATH.LOAN_APPLICATION.FINANCIAL.company.scenarios.index}
      element={<FinancialCompanyScenariosPage />}
    />
  </Route>
)
