import { APP_PATH } from "@/constants"
import { handleCrumb } from "@/utils/crumb.utils"
import { isLaunchKC } from "@/utils/domain.utils"
import { Route } from "react-router-dom"

/**
 * Available loan program routes ("/loan/loan-program").
 */
const availableLoanProgramRoutes = (
  <Route path={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.all}>
    {/* LIST AVAILABLE LOAN PROGRAM */}
    <Route
      index
      lazy={() =>
        import("@/modules/loan-application/components/layouts/LoanProgram")
      }
      path={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list}
    />

    {/* DETAIL LOAN PROGRAM TO START SUBMIT*/}
    <Route
      handle={handleCrumb(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detail)}
      lazy={() =>
        isLaunchKC()
          ? import(
              "@/modules/loan-application/components/layouts/custom/launch-kc/LaunchKCProgramDetail"
            )
          : import(
              "@/modules/loan-application/components/layouts/LoanProgramDetail"
            )
      }
      path={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detail}
    />
  </Route>
)

export { availableLoanProgramRoutes }
