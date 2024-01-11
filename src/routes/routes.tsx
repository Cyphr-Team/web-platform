import DashboardPage from "@/modules/example-dashboard/page"
import SignUpPage from "@/modules/sign-up/page"
import LoanApplication from "@/modules/loan-application/page"
import VerifyEmailPage from "@/modules/verify-email/page"

import {
  GlobalLayouts,
  NotFoundLayout,
  DashboardLayout
} from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import { APP_PATH } from "@/constants"
import LoginPage from "@/modules/login/page"
import ForgotPasswordPage from "@/modules/forgot-password/page"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={APP_PATH.INDEX}
      element={<GlobalLayouts />}
      errorElement={<NotFoundLayout />}
    >
      <Route element={<AuthLayout />}>
        <Route path={APP_PATH.LOGIN} element={<LoginPage />} />
        <Route path={APP_PATH.SIGN_UP} element={<SignUpPage />} />
        <Route
          path={APP_PATH.VERIFY_EMAIL.index}
          element={<VerifyEmailPage />}
        />
        <Route
          path={APP_PATH.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
      </Route>
      <Route path={APP_PATH.DASHBOARD} element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path={APP_PATH.LOAN_APPLICATION}>
        <Route index element={<LoanApplication />} />
      </Route>
      <Route path={APP_PATH.EXAMPLE_TABLE} element={<DashboardLayout />}>
        <Route index lazy={() => import("@/modules/example-table/page")} />
      </Route>
    </Route>
  )
)

export { routes }
