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
        path={APP_PATH.CONFERENCE_DEMO.applicant.index}
        element={<ApplicationDetailPage />}
      />
    </Route>
    <Route element={<ConferenceDemoApplicationListLayout />}>
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.applicant.list}
        element={<ApplicationListPage />}
      />
      <Route
        path={APP_PATH.CONFERENCE_DEMO.applicant.readiness}
        element={<ApplicantLoanReadinessPage />}
      />
    </Route>
    <Route element={<ConferenceDemoAdminLayout />}>
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.index}
        element={<AdminApplicationDetails />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.loanReadiness}
        element={<LoanReadinessPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.business}
        element={<BusinessVerificationPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.identity}
        element={<IdentityVerificationPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.documents}
        element={<DocumentationPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.documentDetail}
        element={<DocumentationDetailPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.cashflow}
        element={<CashFlowPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.loanSummary}
        element={<ApplicationSummaryPage />}
      />
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.admin.identity}
        element={<IdentityVerificationPage />}
      />
    </Route>
  </Route>
)
