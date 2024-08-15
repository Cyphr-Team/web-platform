import { GlobalLayouts, NotFoundLayout } from "@/shared/layouts"

import { APP_PATH } from "@/constants"
import { InstitutionNotFoundLayout } from "@/shared/layouts/InstitutionNotFoundLayout"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import { applicantRoutes } from "./applicant-routes"
import { authenticationRoutes } from "./authentication-routes"
import { dashboardRoutes } from "./dashboard-routes"
import { ActiveEmailLayout } from "@/shared/layouts/ActiveEmailLayout"
import { featureFlagsPublicLoader, institutionLoader } from "./loader"
import { financialProjectionRoute } from "@/routes/financial-projection-routes"

/**
 * App routes ("/").
 * get institution metadata
 * ->  if success return children routes.
 * ->  if fail return not found layout.
 */

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      loader={institutionLoader}
      path={APP_PATH.INDEX}
      element={<GlobalLayouts />}
      errorElement={<InstitutionNotFoundLayout />}
    >
      <Route loader={featureFlagsPublicLoader}>
        {/* AUTHENTICATION ROUTES */}
        {/* EXCEPT THIS CASE, WHEN WE ALREADY LOGGED IN AND ACCEPT OUR OWN INVITATION */}
        <Route element={<ActiveEmailLayout />}>
          <Route
            path={APP_PATH.ACCEPT_INVITE}
            lazy={() => import("@/modules/authentication/accept-invite/page")}
          />
        </Route>

        {authenticationRoutes}

        {/* DASHBOARD ROUTES */}
        {dashboardRoutes}

        {/* BORROWER ONBOARDING ROUTES */}
        {applicantRoutes}

        {financialProjectionRoute}

        <Route path="*" element={<NotFoundLayout />} />
      </Route>
    </Route>
  )
)

export { routes }
