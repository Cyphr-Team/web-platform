import { APP_PATH } from "@/constants"
import { FeatureKey } from "@/hooks/useCanAccess"
import { Component as DashboardV2 } from "@/modules/dashboard-v2/page"
import { Component as LoanApplicationManagementComponent } from "@/modules/loan-application-management/pages/list"
import { userLoader } from "@/routes/loader"
import { ProtectedRoute } from "@/shared/atoms/ProtectedRoute"
import { Component as DashboardLayout } from "@/shared/layouts/dashboard-layout/dashboard-layout"
import { handleCrumb } from "@/utils/crumb.utils"
import {
  isCapitalCollab,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { Route } from "react-router-dom"
import { adminRoutes } from "./admin-routes"
import { loanApplicationManagementRoutes } from "./loan-application-management-routes"
import { notificationRoutes } from "./notification-routes"
import { chatbotRoutes } from "@/routes/dashboard-routes/chatbot-routes"
import { SettingsPageLayout } from "@/modules/admin/user/layouts/settings-page-layout"
import { TransactionsPage } from "@/modules/admin/user/transactions-page"

/**
 * Dashboard routes ("/*"), no unauthenticated or loan applicant allowed to see these pages.
 * get user   ->  if success return children routes.
 *            ->  if fail due to unauthenticated, clear credential (if any), navigate to ("/sign-up")
 */

const dashboardRoutes = (
  <Route
    element={<DashboardLayout isShowLogoWhenOpen={!isCapitalCollab()} />}
    handle={handleCrumb(APP_PATH.INDEX)}
    loader={userLoader}
  >
    {/* DASHBOARD STATICS */}
    <Route
      index
      element={
        isLaunchKC() || isLoanReady() ? (
          <LoanApplicationManagementComponent />
        ) : (
          <DashboardV2 />
        )
      }
    />

    {/* LOAN APPLICATION MANAGEMENT */}
    {loanApplicationManagementRoutes}

    {/* LOAN PROGRAM */}
    {/* Hide with KCC */}
    {(!isKccBank() || !isSbb() || !isLaunchKC()) && (
      <Route element={<ProtectedRoute featureKey={FeatureKey.LOAN_PROGRAM} />}>
        <Route
          handle={handleCrumb(APP_PATH.LOAN_PROGRAM.index)}
          lazy={() => import("@/modules/admin/loan-program/page")}
          path={APP_PATH.LOAN_PROGRAM.index}
        />
      </Route>
    )}

    {/* NOTIFICATION */}
    {notificationRoutes}

    {/* USERS MANAGEMENT */}
    <Route
      handle={handleCrumb(APP_PATH.ADMIN_USERS.USER.index)}
      lazy={() => import("@/modules/admin/user/user-page.tsx")}
      path={APP_PATH.ADMIN_USERS.USER.index}
    />

    {/* INVITATIONS MANAGEMENT */}
    <Route
      handle={handleCrumb(APP_PATH.ADMIN_USERS.INVITATION.index)}
      lazy={() => import("@/modules/admin/user/invitation-page.tsx")}
      path={APP_PATH.ADMIN_USERS.INVITATION.index}
    />

    {/* DOCUMENT MANAGEMENT */}
    <Route
      lazy={() => import("@/modules/admin/user/document-page.tsx")}
      path={APP_PATH.DOCUMENTS}
    />

    {chatbotRoutes}

    {/* MESSAGES */}
    <Route
      lazy={() =>
        import("@/modules/loan-application-management/pages/under-construction")
      }
      path={APP_PATH.MESSAGES}
    />

    {/* SETTINGS */}
    <Route
      element={<SettingsPageLayout />}
      handle={handleCrumb(APP_PATH.SETTINGS.index)}
      path={APP_PATH.SETTINGS.index}
    >
      <Route
        index
        element={<TransactionsPage />}
        path={APP_PATH.SETTINGS.payment}
      />
    </Route>

    {/* ADMIN DASHBOARD */}
    {adminRoutes}
  </Route>
)

export { dashboardRoutes }
