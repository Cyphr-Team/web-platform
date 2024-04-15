import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"

/**
 * Foresight admin routes ("/").
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
    />
  </Route>
)

export { adminRoutes }
