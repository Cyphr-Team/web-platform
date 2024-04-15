import { Outlet, Route } from "react-router-dom"
import { userLoader } from "../loader"
import { APP_PATH } from "@/constants"
import { handleCrumb } from "@/utils/crumb.utils"
import { Component as ApplicantLayout } from "@/modules/loan-application/page"
import { availableLoanProgramRoutes } from "./available-loan-program-routes"
import { notificationRoutes } from "./notification-routes"
import { BRLoanApplicationDetailsProvider } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { LoanApplicationDetailLayout } from "@/shared/layouts/LoanApplicationDetailLayout"
import { LoanApplicationProvider } from "@/modules/loan-application/providers/LoanApplicationProvider"
import { LoanApplicationFormLayout } from "@/shared/layouts/LoanApplicationFormLayout"
import { LoanApplicationEdit } from "@/modules/loan-application/pages/LoanApplicationEdit"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

/**
 * Loan applicant routes ("/loan"), only loan applicant can view these pages.
 * get user   ->  if success return children routes.
 *            ->  if fail navigate to ("/login").
 */
const applicantRoutes = (
  <Route
    loader={userLoader}
    handle={handleCrumb(APP_PATH.LOAN_APPLICATION.INDEX)}
    path={APP_PATH.LOAN_APPLICATION.INDEX}
    element={<ApplicantLayout />}
  >
    {availableLoanProgramRoutes}

    <Route
      element={
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Outlet />
        </Suspense>
      }
    >
      <Route
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.index}
        lazy={() => import("@/modules/loan-application/pages/LoanApplications")}
      />
    </Route>

    {/* --- NOTIFICATION --- */}
    {notificationRoutes}

    <Route
      path={APP_PATH.LOAN_APPLICATION.SETTINGS}
      lazy={() =>
        import("@/modules/loan-application-management/pages/under-construction")
      }
    />
    <Route
      element={
        <BRLoanApplicationDetailsProvider>
          <LoanApplicationDetailLayout>
            <Outlet />
          </LoanApplicationDetailLayout>
        </BRLoanApplicationDetailsProvider>
      }
    >
      <Route
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.detail}
        lazy={() =>
          import(
            "@/modules/loan-application/pages/LoanApplicationDetailsReview"
          )
        }
      />
    </Route>

    <Route
      path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.edit}
      element={
        <BRLoanApplicationDetailsProvider>
          <LoanApplicationProvider>
            <LoanApplicationFormLayout>
              <LoanApplicationEdit />
            </LoanApplicationFormLayout>
          </LoanApplicationProvider>
        </BRLoanApplicationDetailsProvider>
      }
    />

    <Route
      element={
        <LoanApplicationFormLayout>
          <Outlet />
        </LoanApplicationFormLayout>
      }
    >
      <Route
        path={APP_PATH.LOAN_APPLICATION.INFORMATION.detail}
        lazy={() =>
          import(
            "@/modules/loan-application/components/layouts/LoanInformation"
          )
        }
      />
    </Route>

    <Route
      path={APP_PATH.LOAN_APPLICATION.SUBMISSION}
      element={
        <LoanApplicationProvider>
          <Outlet />
        </LoanApplicationProvider>
      }
      lazy={() =>
        import("@/modules/loan-application/components/layouts/LoanSubmission")
      }
    />
  </Route>
)

export { applicantRoutes }
