import { APP_PATH } from "@/constants"
import { ActiveEmailLayout } from "@/shared/layouts/ActiveEmailLayout"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"
import { Route } from "react-router-dom"

/**
 * Unauthenticated routes ("/"), help user get authenticated.
 */
const authenticationRoutes = (
  <Route element={<AuthLayout />}>
    {/* LOGIN */}
    <Route
      path={APP_PATH.LOGIN}
      lazy={() => import("@/modules/authentication/login/page")}
    />

    {/* SIGN UP */}
    <Route
      path={APP_PATH.SIGN_UP}
      lazy={() => import("@/modules/authentication/sign-up/page")}
    />

    <Route element={<ActiveEmailLayout />}>
      {/* VERIFY EMAIL */}
      <Route
        path={APP_PATH.VERIFY_EMAIL.index}
        lazy={() => import("@/modules/authentication/verify-email/page")}
      />

      {/* SETUP PHONE */}
      <Route
        path={APP_PATH.SETUP_PHONE}
        lazy={() => import("@/modules/authentication/setup-phone/page")}
      />

      {/* VERIFY PHONE */}
      <Route
        path={APP_PATH.VERIFY_PHONE}
        lazy={() => import("@/modules/authentication/verify-phone/page")}
      />

      {/* REDIRECT CALLBACK */}
      <Route
        path={APP_PATH.REDIRECT_CALLBACK}
        lazy={() => import("@/modules/authentication/redirect/page")}
      />

      {/* ACTIVE EMAIL, EXPIRED, ALREADY SIGN UP, EMAIL ALREADY ASSOCIATE */}
      <Route
        path={APP_PATH.VERIFY_EMAIL.activateByToken}
        lazy={() => import("@/modules/authentication/activate-email/page")}
      />

      {/* SETUP PROFILE */}
      <Route
        path={APP_PATH.SETUP_PROFILE}
        lazy={() => import("@/modules/authentication/setup-profile/page")}
      />

      {/* FORGOT PASSWORD */}
      <Route
        path={APP_PATH.FORGOT_PASSWORD}
        lazy={() => import("@/modules/authentication/forgot-password/page")}
      />

      {/* SETUP PASSWORD */}
      <Route
        path={APP_PATH.SETUP_PASSWORD_BY_TOKEN.index}
        lazy={() => import("@/modules/authentication/setup-password/page")}
      />
    </Route>
  </Route>
)

export { authenticationRoutes }
