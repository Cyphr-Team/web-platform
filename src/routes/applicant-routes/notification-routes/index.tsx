import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"

/**
 * Loan applicant notification routes ("/loan/notifications").
 */
const notificationRoutes = (
  <Route path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.all}>
    {/* LIST NOTIFICATION */}
    <Route
      index
      lazy={() => import("@/modules/notification/pages/Notifications")}
      path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.list}
    />

    {/* DETAIL NOTIFICATION */}
    <Route
      lazy={() => import("@/modules/notification/pages/NotificationDetails")}
      path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.detail}
    />
  </Route>
)

export { notificationRoutes }
