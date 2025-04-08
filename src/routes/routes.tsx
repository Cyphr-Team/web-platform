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
import { conferenceDemoRoutes } from "@/routes/conference-demo-routes"
import { isDemo } from "@/utils/domain.utils.ts"
import { settingsRoutes } from "@/routes/dashboard-routes/settings-routes"

/**
 * App routes ("/").
 * get institution metadata
 * ->  if success return children routes.
 * ->  if fail return not found layout.
 */

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<GlobalLayouts />}
      errorElement={<InstitutionNotFoundLayout />}
      loader={institutionLoader}
      path={APP_PATH.INDEX}
    >
      <Route loader={featureFlagsPublicLoader}>
        {/* AUTHENTICATION ROUTES */}
        {/* EXCEPT THIS CASE, WHEN WE ALREADY LOGGED IN AND ACCEPT OUR OWN INVITATION */}
        <Route element={<ActiveEmailLayout />}>
          <Route
            lazy={() => import("@/modules/authentication/accept-invite/page")}
            path={APP_PATH.ACCEPT_INVITE}
          />
        </Route>

        {authenticationRoutes}

        {/* DASHBOARD ROUTES */}
        {dashboardRoutes}

        {/* BORROWER ONBOARDING ROUTES */}
        {applicantRoutes}

        {settingsRoutes}

        {/* DEMO ROUTES */}
        {/* it should be in the last */}
        {isDemo() ? conferenceDemoRoutes : null}

        <Route element={<NotFoundLayout />} path="*" />
      </Route>
    </Route>
  )
)

export { routes }
