import { APP_PATH } from "@/constants"
import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { Component as DashboardV1 } from "@/modules/dashboard-v1/page"
import { Component as DashboardV2 } from "@/modules/dashboard-v2/page"
import { userLoader } from "@/routes/loader"
import { FeatureFlagsRenderer } from "@/shared/layouts/FeatureFlagRenderer"
import { Component as DashboardLayout } from "@/shared/layouts/dashboard-layout/dashboard-layout"
import { handleCrumb } from "@/utils/crumb.utils"
import { Route } from "react-router-dom"
import { adminRoutes } from "./admin-routes"
import { loanApplicationManagementRoutes } from "./loan-application-management-routes"
import { notificationRoutes } from "./notification-routes"
import { isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"
import { Component as LoanApplicationManagementComponent } from "@/modules/loan-application-management/pages/list"

/**
 * Dashboard routes ("/*"), no unauthenticated or loan applicant allowed to see these pages.
 * get user   ->  if success return children routes.
 *            ->  if fail due to unauthenticated, clear credential (if any), navigate to ("/sign-up")
 */
const dashboardRoutes = (
  <Route
    loader={userLoader}
    element={<DashboardLayout />}
    handle={handleCrumb(APP_PATH.INDEX)}
  >
    {/* DASHBOARD STATICS */}
    <Route
      index
      element={
        <FeatureFlagsRenderer
          ffKey={FEATURE_FLAGS.LENDER_DASHBOARD_V2}
          fallBackChildren={
            isLaunchKC() ? (
              <LoanApplicationManagementComponent />
            ) : (
              <DashboardV1 />
            )
          }
        >
          {isLaunchKC() ? (
            <LoanApplicationManagementComponent />
          ) : (
            <DashboardV2 />
          )}
        </FeatureFlagsRenderer>
      }
    />

    {/* LOAN APPLICATION MANAGEMENT */}
    {loanApplicationManagementRoutes}

    {/* LOAN PROGRAM */}
    {/* Hide with KCC */}
    {(!isKccBank() || !isSbb() || !isLaunchKC()) && (
      <Route
        path={APP_PATH.LOAN_PROGRAM.index}
        lazy={() => import("@/modules/admin/loan-program/page")}
        handle={handleCrumb(APP_PATH.LOAN_PROGRAM.index)}
      />
    )}

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

    {/* ADMIN DASHBOARD */}
    {adminRoutes}
  </Route>
)

export { dashboardRoutes }
