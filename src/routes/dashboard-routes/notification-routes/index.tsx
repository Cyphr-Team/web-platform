import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"

/**
 * Notification routes ("/notifications").
 */
const notificationRoutes = (
  <Route path={APP_PATH.NOTIFICATION.all}>
    {/* LIST */}
    <Route
      index
      lazy={() => import("@/modules/notification/pages/Notifications")}
    />

    {/* DETAIL */}
    <Route
      lazy={() => import("@/modules/notification/pages/NotificationDetails")}
      path={APP_PATH.NOTIFICATION.detail}
    />
  </Route>
)

export { notificationRoutes }
