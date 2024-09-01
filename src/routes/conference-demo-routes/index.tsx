import { Route } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { ConferenceDemoApplicationLayout } from "@/modules/conference-demo/applicant/components/layouts"
import ConferenceDemoAdminLayout from "@/modules/conference-demo/admin/components/layouts/AdminLayout"

import ApplicationDetailPage from "@/modules/conference-demo/applicant/components/pages/ApplicationDetailPage.tsx"
import { AdminApplicationDetails } from "@/modules/conference-demo/admin/components/pages/ApplicationDetails"
import { LoanReadinessPage } from "@/modules/conference-demo/admin/components/pages/LoanReadinessPage"
import { ApplicationSummaryPage } from "../../modules/conference-demo/admin/components/pages/ApplicationSummaryPage"

export const conferenceDemoRoutes = (
  <Route>
    <Route element={<ConferenceDemoApplicationLayout />}>
      <Route
        index
        path={APP_PATH.CONFERENCE_DEMO.applicant.index}
        element={<ApplicationDetailPage />}
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
        path={APP_PATH.CONFERENCE_DEMO.admin.loanSummary}
        element={<ApplicationSummaryPage />}
      />
    </Route>
  </Route>
)
