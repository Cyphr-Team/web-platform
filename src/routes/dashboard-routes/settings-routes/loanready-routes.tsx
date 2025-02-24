import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"
import { isLoanReady } from "@/utils/domain.utils.ts"

const LoanReadyRoutes = isLoanReady() ? (
  <>
    <Route
      lazy={() => import("@/modules/admin/user/transactions-page")}
      path={APP_PATH.SETTINGS.payments}
    />
    <Route
      index
      lazy={() =>
        import("@/modules/admin/user/modules/loan-ready-v2/user-page")
      }
      path={APP_PATH.SETTINGS.users}
    />
    <Route
      index
      lazy={() =>
        import("@/modules/admin/user/modules/loan-ready-v2/team-members-page")
      }
      path={APP_PATH.SETTINGS.teamMembers}
    />
  </>
) : null

export { LoanReadyRoutes }
