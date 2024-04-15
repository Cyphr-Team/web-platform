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
      path={APP_PATH.NOTIFICATION.detail}
      lazy={() => import("@/modules/notification/pages/NotificationDetails")}
    />
  </Route>
)

export { notificationRoutes }
