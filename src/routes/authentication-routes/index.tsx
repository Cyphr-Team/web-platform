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
      lazy={() => import("@/modules/authentication/login/page")}
      path={APP_PATH.LOGIN}
    />

    {/* SIGN UP */}
    <Route
      lazy={() => import("@/modules/authentication/sign-up/page")}
      path={APP_PATH.SIGN_UP}
    />

    <Route element={<ActiveEmailLayout />}>
      {/* VERIFY EMAIL */}
      <Route
        lazy={() => import("@/modules/authentication/verify-email/page")}
        path={APP_PATH.VERIFY_EMAIL.index}
      />

      {/* SETUP PHONE */}
      <Route
        lazy={() => import("@/modules/authentication/setup-phone/page")}
        path={APP_PATH.SETUP_PHONE}
      />

      {/* VERIFY PHONE */}
      <Route
        lazy={() => import("@/modules/authentication/verify-phone/page")}
        path={APP_PATH.VERIFY_PHONE}
      />

      {/* MAGIC LINK */}
      <Route
        lazy={() => import("@/modules/authentication/magic-link/page")}
        path={APP_PATH.MAGIC_LINK}
      />

      {/* REDIRECT CALLBACK */}
      <Route
        lazy={() => import("@/modules/authentication/redirect/page")}
        path={APP_PATH.REDIRECT_CALLBACK}
      />

      {/* ACTIVE EMAIL, EXPIRED, ALREADY SIGN UP, EMAIL ALREADY ASSOCIATE */}
      <Route
        lazy={() => import("@/modules/authentication/activate-email/page")}
        path={APP_PATH.VERIFY_EMAIL.activateByToken}
      />

      {/* SETUP PROFILE */}
      <Route
        lazy={() => import("@/modules/authentication/setup-profile/page")}
        path={APP_PATH.SETUP_PROFILE}
      />

      {/* FORGOT PASSWORD */}
      <Route
        lazy={() => import("@/modules/authentication/forgot-password/page")}
        path={APP_PATH.FORGOT_PASSWORD}
      />

      {/* SETUP PASSWORD */}
      <Route
        lazy={() => import("@/modules/authentication/setup-password/page")}
        path={APP_PATH.SETUP_PASSWORD_BY_TOKEN.index}
      />
    </Route>
  </Route>
)

export { authenticationRoutes }
