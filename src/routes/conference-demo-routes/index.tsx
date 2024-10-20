import { APP_PATH } from "@/constants"
import ConferenceDemoAdminLayout from "@/modules/conference-demo/admin/components/layouts/AdminLayout"
import { ConferenceDemoApplicationLayout } from "@/modules/conference-demo/applicant/components/layouts"
import { Route } from "react-router-dom"

import { AdminApplicationDetails } from "@/modules/conference-demo/admin/components/pages/ApplicationDetails"
import { DocumentationDetailPage } from "@/modules/conference-demo/admin/components/pages/DocumentationDetailPage"
import { LoanReadinessPage } from "@/modules/conference-demo/admin/components/pages/LoanReadinessPage"
import ApplicantLoanReadinessPage from "@/modules/conference-demo/applicant/components/pages/ApplicantLoanReadinessPage"
import ApplicationDetailPage from "@/modules/conference-demo/applicant/components/pages/ApplicationDetailPage.tsx"
import { ApplicationSummaryPage } from "../../modules/conference-demo/admin/components/pages/ApplicationSummaryPage"
import { BusinessVerificationPage } from "../../modules/conference-demo/admin/components/pages/BusinessVerificationPage"
import { CashFlowPage } from "../../modules/conference-demo/admin/components/pages/CashFlowPage"
import { DocumentationPage } from "../../modules/conference-demo/admin/components/pages/DocumentationPage"
import { IdentityVerificationPage } from "../../modules/conference-demo/admin/components/pages/IdentityVerificationPage"
import ConferenceDemoApplicationListLayout from "../../modules/conference-demo/applicant/components/layouts/ConferenceDemoApplicationListLayout"
import ApplicationListPage from "../../modules/conference-demo/applicant/components/pages/ApplicationListPage"

export const conferenceDemoRoutes = (
  <Route>
    <Route element={<ConferenceDemoApplicationLayout />}>
      <Route
        index
        element={<ApplicationDetailPage />}
        path={APP_PATH.CONFERENCE_DEMO.applicant.index}
      />
    </Route>
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
        path={APP_PATH.CONFERENCE_DEMO.admin.loanReadiness}
      />
      <Route
        index
        element={<BusinessVerificationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.business}
      />
      <Route
        index
        element={<IdentityVerificationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.identity}
      />
      <Route
        index
        element={<DocumentationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.documents}
      />
      <Route
        index
        element={<DocumentationDetailPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.documentDetail}
      />
      <Route
        index
        element={<CashFlowPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.cashflow}
      />
      <Route
        index
        element={<ApplicationSummaryPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.loanSummary}
      />
      <Route
        index
        element={<IdentityVerificationPage />}
        path={APP_PATH.CONFERENCE_DEMO.admin.identity}
      />
    </Route>
  </Route>
)
