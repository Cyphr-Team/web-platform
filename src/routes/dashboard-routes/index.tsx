import { APP_PATH } from "@/constants"
import { userLoader } from "@/routes/loader"
import { Component as DashboardLayout } from "@/shared/layouts/dashboard-layout/dashboard-layout"
import { handleCrumb } from "@/utils/crumb.utils"
import { Route } from "react-router-dom"
import { adminRoutes } from "./admin-routes"
import { loanApplicationManagementRoutes } from "./loan-application-management-routes"
import { notificationRoutes } from "./notification-routes"

/**
 * Dashboard routes ("/*"), no unauthenticated or loan applicant allowed to see these pages.
 * get user   ->  if success return children routes.
 *            ->  if fail clear credential, navigate to ("/login")
 */
const dashboardRoutes = (
  <Route
    loader={userLoader}
    element={<DashboardLayout />}
    handle={handleCrumb(APP_PATH.INDEX)}
  >
    {/* DASHBOARD STATICS */}
    <Route index lazy={() => import("@/modules/example-dashboard/page")} />

    {/* LOAN APPLICATION MANAGEMENT */}
    {loanApplicationManagementRoutes}

    {/* LOAN PROGRAM */}
    <Route
      path={APP_PATH.LOAN_PROGRAM.index}
      lazy={() => import("@/modules/admin/loan-program/page")}
      handle={handleCrumb(APP_PATH.LOAN_PROGRAM.index)}
    />

    {/* NOTIFICATION */}
    {notificationRoutes}

    {/* USERS MANAGEMENT */}
    <Route
      path={APP_PATH.ADMIN_USERS.USER.index}
      lazy={() => import("@/modules/admin/user/user-page.tsx")}
    />

    {/* INVITATIONS MANAGEMENT */}
    <Route
      path={APP_PATH.ADMIN_USERS.INVITATION.index}
      lazy={() => import("@/modules/admin/user/invitation-page.tsx")}
    />

    {/* MESSAGES */}
    <Route
      path={APP_PATH.MESSAGES}
      lazy={() =>
        import("@/modules/loan-application-management/pages/under-construction")
      }
    />

    {/* SETTINGS */}
    <Route
      path={APP_PATH.SETTINGS}
      lazy={() =>
        import("@/modules/loan-application-management/pages/under-construction")
      }
    />

    {/* FORESIGHT ADMIN */}
    {adminRoutes}
  </Route>
)

export { dashboardRoutes }
