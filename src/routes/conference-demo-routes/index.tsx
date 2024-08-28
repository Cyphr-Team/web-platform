import { Route } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { ConferenceDemoApplicationLayout } from "@/modules/conference-demo/applicant/components/layouts"
import ApplicationDetailPage from "@/modules/conference-demo/applicant/components/pages/ApplicationDetailPage.tsx"

export const conferenceDemoRoutes = (
  <Route element={<ConferenceDemoApplicationLayout />}>
    <Route
      index
      path={APP_PATH.CONFERENCE_DEMO.applicant.index}
      element={<ApplicationDetailPage />}
    />
  </Route>
)
