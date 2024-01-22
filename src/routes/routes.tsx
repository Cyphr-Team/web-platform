import { GlobalLayouts, NotFoundLayout } from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import { APP_PATH } from "@/constants"
import { userLoader } from "./loader"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={APP_PATH.INDEX}
      element={<GlobalLayouts />}
      errorElement={<NotFoundLayout />}
    >
      {/* AUTHENTICATION ROUTES */}

      <Route element={<AuthLayout />}>
        <Route
          path={APP_PATH.LOGIN}
          lazy={() => import("@/modules/authentication/login/page")}
        />
        <Route
          path={APP_PATH.SIGN_UP}
          lazy={() => import("@/modules/authentication/sign-up/page")}
        />
        <Route
          path={APP_PATH.VERIFY_EMAIL.index}
          lazy={() => import("@/modules/authentication/verify-email/page")}
        />
        <Route
          path={APP_PATH.VERIFY_EMAIL.activateByToken}
          lazy={() => import("@/modules/authentication/activate-email/page")}
        />
        <Route
          path={APP_PATH.SETUP_PROFILE_BY_TOKEN.index}
          loader={userLoader}
          lazy={() => import("@/modules/authentication/setup-profile/page")}
        />
        <Route
          path={APP_PATH.FORGOT_PASSWORD}
          lazy={() => import("@/modules/authentication/forgot-password/page")}
        />
        <Route
          path={APP_PATH.SETUP_PASSWORD_BY_TOKEN.index}
          lazy={() => import("@/modules/authentication/setup-password/page")}
        />
      </Route>

      {/* DASHBOARD ROUTES */}

      <Route
        loader={userLoader}
        lazy={() =>
          import("@/shared/layouts/dashboard-layout/dashboard-layout")
        }
      >
        <Route index lazy={() => import("@/modules/example-dashboard/page")} />

        {/* ADMIN  */}

        {/* ADMIN Users */}

        <Route
          index
          path={APP_PATH.USERS.index}
          lazy={() => import("@/modules/admin/user/page")}
        />
      </Route>

      {/* BORROWER ONBOARDING ROUTES */}

      <Route
        path={APP_PATH.LOAN_APPLICATION.INDEX}
        lazy={() => import("@/modules/loan-application/page")}
      >
        <Route
          index
          lazy={() =>
            import(
              "@/modules/loan-application/components/layouts/LoanIntroduction"
            )
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.INFORMATION}
          lazy={() =>
            import(
              "@/modules/loan-application/components/layouts/LoanInformation"
            )
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.SUBMISSION}
          lazy={() =>
            import(
              "@/modules/loan-application/components/layouts/LoanSubmission"
            )
          }
        />
      </Route>
    </Route>
  )
)

export { routes }
