import DashboardPage from "@/modules/example-dashboard/page"
import SignUpPage from "@/modules/authentication/sign-up/page"
import LoanApplication from "@/modules/loan-application/page"
import VerifyEmailPage from "@/modules/authentication/verify-email/page"

import {
  GlobalLayouts,
  NotFoundLayout,
  DashboardLayout
} from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route
} from "react-router-dom"
import { APP_PATH } from "@/constants"
import LoginPage from "@/modules/authentication/login/page"
import ForgotPasswordPage from "@/modules/authentication/forgot-password/page"
import { LoanIntroduction } from "@/modules/loan-application/components/layouts/LoanIntroduction"
import { LoanInformation } from "@/modules/loan-application/components/layouts/LoanInformation"
import SetupPasswordPage from "@/modules/authentication/setup-password/page"
import SetupProfilePage from "@/modules/authentication/setup-profile/page"
import { LoanSubmission } from "@/modules/loan-application/components/layouts/LoanSubmission"
import ActivateEmailPage from "@/modules/authentication/activate-email/page"
import { inMemoryJWTService } from "@/services/jwt.service"

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
          path={APP_PATH.VERIFY_EMAIL.activateByToken}
          element={<ActivateEmailPage />}
        />
        <Route
          path={APP_PATH.SETUP_PROFILE_BY_TOKEN.index}
          element={<SetupProfilePage />}
          loader={async () => {
            const userPromise = inMemoryJWTService.getNewAccessToken()
            return defer({ userPromise })
          }}
        />
        <Route
          path={APP_PATH.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={APP_PATH.SETUP_PASSWORD_BY_TOKEN.index}
          element={<SetupPasswordPage />}
        />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route
        path={APP_PATH.LOAN_APPLICATION.INDEX}
        element={<LoanApplication />}
      >
        <Route index element={<LoanIntroduction />} />
        <Route
          path={APP_PATH.LOAN_APPLICATION.INFORMATION}
          element={<LoanInformation />}
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.SUBMISSION}
          element={<LoanSubmission />}
        />
      </Route>
      <Route path={APP_PATH.EXAMPLE_TABLE} element={<DashboardLayout />}>
        <Route index lazy={() => import("@/modules/example-table/page")} />
      </Route>
    </Route>
  )
)

export { routes }
