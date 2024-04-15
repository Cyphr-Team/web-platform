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
      path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.list}
      lazy={() => import("@/modules/notification/pages/Notifications")}
    />

    {/* DETAIL NOTIFICATION */}
    <Route
      path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.detail}
      lazy={() => import("@/modules/notification/pages/NotificationDetails")}
    />
  </Route>
)

export { notificationRoutes }
