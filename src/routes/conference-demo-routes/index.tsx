import { APP_PATH } from "@/constants"
import ConferenceDemoAdminLayout from "@/modules/conference-demo/admin/components/layouts/AdminLayout"
import { ConferenceDemoApplicationLayout } from "@/modules/conference-demo/applicant/components/layouts"
import { Outlet, Route } from "react-router-dom"

import { AdminApplicationDetails } from "@/modules/conference-demo/admin/components/pages/ApplicationDetails"
import { DocumentationDetailPage } from "@/modules/conference-demo/admin/components/pages/DocumentationDetailPage"
import { LoanReadinessPage } from "@/modules/conference-demo/admin/components/pages/LoanReadinessPage"
import ApplicantLoanReadinessPage from "@/modules/conference-demo/applicant/components/pages/ApplicantLoanReadinessPage"
import ApplicationDetailPage from "@/modules/conference-demo/applicant/components/pages/ApplicationDetailPage.tsx"
import { ApplicationSummaryPage } from "../../modules/conference-demo/admin/components/pages/ApplicationSummaryPage"
import { BusinessVerificationPage } from "../../modules/conference-demo/admin/components/pages/BusinessVerificationPage"
import { DocumentationPage } from "../../modules/conference-demo/admin/components/pages/DocumentationPage"
import { IdentityVerificationPage } from "../../modules/conference-demo/admin/components/pages/IdentityVerificationPage"
import ConferenceDemoApplicationListLayout from "../../modules/conference-demo/applicant/components/layouts/ConferenceDemoApplicationListLayout"
import ApplicationListPage from "../../modules/conference-demo/applicant/components/pages/ApplicationListPage"
import ConferenceDemoApplicationFpLayout from "@/modules/conference-demo/applicant/components/layouts/ConferenceDemoApplicationFpLayout.tsx"
import ConferenceDemoApplicationFpAdminLayout from "@/modules/conference-demo/admin/components/layouts/ConferenceDemoApplicationFpLayout.tsx"
import { LoanReadiness } from "@/modules/conference-demo/admin/components/organisms/LoanReadiness.tsx"
import { ListApplicationPage } from "@/modules/conference-demo/admin/components/pages/ListApplicationPage.tsx"
import ApplicationOverviewPage from "@/modules/conference-demo/applicant/components/pages/ApplicationOverviewPage"

const financialProjectionRoute = (
  <Route
    element={
      <ConferenceDemoApplicationFpLayout>
        <Outlet />
      </ConferenceDemoApplicationFpLayout>
    }
    path={APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.index}
  >
    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpOverviewPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.overview}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpCashFlowPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.cashFlow}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpBalanceSheetPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.balanceSheet}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpIncomeStatementPage"
        )
      }
      path={
        APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.incomeStatement
      }
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpLoanReadinessPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.applicant.financialProjection.loanReady}
    />
  </Route>
)

const financialProjectionAdminRoutes = (
  <Route
    element={
      <ConferenceDemoApplicationFpAdminLayout>
        <Outlet />
      </ConferenceDemoApplicationFpAdminLayout>
    }
    path={APP_PATH.CONFERENCE_DEMO.admin.financialProjection.index(":id")}
  >
    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpOverviewPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.admin.financialProjection.overview(":id")}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpCashFlowPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.admin.financialProjection.cashFlow(":id")}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpBalanceSheetPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.admin.financialProjection.balanceSheet(
        ":id"
      )}
    />

    <Route
      index
      lazy={() =>
        import(
          "@/modules/conference-demo/applicant/components/pages/FpIncomeStatementPage"
        )
      }
      path={APP_PATH.CONFERENCE_DEMO.admin.financialProjection.incomeStatement(
        ":id"
      )}
    />

    <Route
      index
      element={<LoanReadiness />}
      path={APP_PATH.CONFERENCE_DEMO.admin.financialProjection.loanReady(":id")}
    />
  </Route>
)

export const conferenceDemoRoutes = (
  <Route>
    <Route element={<ConferenceDemoApplicationLayout />}>
      <Route
        index
        element={<ApplicationDetailPage />}
        path={APP_PATH.CONFERENCE_DEMO.applicant.index}
      />
    </Route>
    <Route
      index
      element={<ApplicationOverviewPage />}
      path={APP_PATH.CONFERENCE_DEMO.applicant.detail(":id")}
    />
    <Route element={<ConferenceDemoApplicationListLayout />}>
      <Route
        index
        element={<ApplicationListPage />}
        path={APP_PATH.CONFERENCE_DEMO.applicant.list}
      />
      <Route
        element={<ApplicantLoanReadinessPage />}
        path={APP_PATH.CONFERENCE_DEMO.applicant.readiness}
      />
      {financialProjectionRoute}
    </Route>
    <Route element={<ConferenceDemoAdminLayout />}>
      <Route
        index
        element={<AdminApplicationDetails />}
        path={APP_PATH.CONFERENCE_DEMO.admin.index}
      />
      <Route
        index
        element={<LoanReadinessPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.loanReadiness(":id")}
      />
      <Route
        index
        element={<BusinessVerificationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.business(":id")}
      />
      <Route
        index
        element={<IdentityVerificationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.identity(":id")}
      />
      <Route
        index
        element={<DocumentationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.documents(":id")}
      />
      <Route
        index
        element={<DocumentationDetailPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.documentDetail(":id")}
      />
      <Route
        index
        element={<ApplicationSummaryPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.applicationSummary(":id")}
      />
      <Route
        index
        element={<IdentityVerificationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.identity(":id")}
      />
      <Route
        index
        element={<ListApplicationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.applications}
      />
      {financialProjectionAdminRoutes}
    </Route>
  </Route>
)
