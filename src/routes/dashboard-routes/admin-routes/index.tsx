import { APP_PATH } from "@/constants"
import { FEATURE_FLAGS } from "@/constants/feature-flag.constants"
import { NotFoundLayout } from "@/shared/layouts"
import { FeatureFlagsRenderer } from "@/shared/layouts/FeatureFlagRenderer"
import { handleCrumb } from "@/utils/crumb.utils"
import { Route } from "react-router-dom"

/**
 * Cyphr admin routes ("/").
 */
const adminRoutes = (
  <Route path={APP_PATH.INDEX} lazy={() => import("@/modules/onboard/layout")}>
    {/* ONBOARD */}
    <Route
      path={APP_PATH.ONBOARD}
      lazy={() => import("@/modules/onboard/page")}
    />

    {/* SUBSCRIPTION */}
    <Route
      path={APP_PATH.SUBSCRIPTIONS}
      lazy={() => import("@/modules/subscriptions/pages/list")}
      element={
        <FeatureFlagsRenderer
          ffKey={FEATURE_FLAGS.SUBSCRIPTION_MANAGEMENT}
          fallBackChildren={<NotFoundLayout />}
        />
      }
    />
    {/* Feature Flags */}
    <Route
      path={APP_PATH.FEATURE_FLAGS.index}
      handle={handleCrumb(APP_PATH.FEATURE_FLAGS.index)}
    >
      {/* Feature Flags */}
      <Route index lazy={() => import("@/modules/feature-flag/pages/list")} />
      {/* Feature Flags Whitelisted Users */}
      <Route
        path={APP_PATH.FEATURE_FLAGS.whitelistedUser}
        lazy={() => import("@/modules/feature-flag/pages/whitelisted-users")}
        handle={handleCrumb(APP_PATH.FEATURE_FLAGS.whitelistedUser)}
      />
    </Route>
  </Route>
)

export { adminRoutes }
