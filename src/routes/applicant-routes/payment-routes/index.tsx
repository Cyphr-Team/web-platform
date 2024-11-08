import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"

/**
 * Payment routes ("/loan/applications/payment").
 */
const paymentRoutes = (
  <Route path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment}>
    {/* START PAYMENT */}
    <Route
      index
      lazy={() => import("@/modules/loanready/pages/PurchasePoint")}
      path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment}
    />
  </Route>
)

export { paymentRoutes }
