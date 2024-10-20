import { APP_PATH } from "@/constants"
import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { NotFoundLayout } from "@/shared/layouts"
import { FeatureFlagsRenderer } from "@/shared/layouts/FeatureFlagRenderer"
import { Route } from "react-router-dom"

/**
 * Cyphr admin routes ("/").
 */
const adminRoutes = (
  <Route lazy={() => import("@/modules/onboard/layout")} path={APP_PATH.INDEX}>
    {/* ONBOARD */}
    <Route
      lazy={() => import("@/modules/onboard/page")}
      path={APP_PATH.ONBOARD}
    />

    {/* SUBSCRIPTION */}
    <Route
      element={
        <FeatureFlagsRenderer
          fallBackChildren={<NotFoundLayout />}
          ffKey={FEATURE_FLAGS.SUBSCRIPTION_MANAGEMENT}
        />
      }
      lazy={() => import("@/modules/subscriptions/pages/list")}
      path={APP_PATH.SUBSCRIPTIONS}
    />
    {/* Feature Flags */}
    <Route
      lazy={() => import("@/modules/feature-flag/pages/list")}
      path={APP_PATH.FEATURE_FLAGS}
    />
  </Route>
)

export { adminRoutes }
