import { Outlet, Route } from "react-router-dom"
import { userLoader } from "../loader"
import { APP_PATH } from "@/constants"
import { handleCrumb } from "@/utils/crumb.utils"
import { Component as ApplicantLayout } from "@/modules/loan-application/page"
import { availableLoanProgramRoutes } from "./available-loan-program-routes"
import { notificationRoutes } from "./notification-routes"
import { BRLoanApplicationDetailsProvider } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { LoanApplicationDetailLayout } from "@/shared/layouts/LoanApplicationDetailLayout"
import { LoanApplicationFormLayout } from "@/shared/layouts/LoanApplicationFormLayout"
import { LoanApplicationEdit } from "@/modules/loan-application/pages/LoanApplicationEdit"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { LoanApplicationFormProvider } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { LoanProgressProvider } from "@/modules/loan-application/providers/LoanProgressProvider"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider"

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
        <LoanProgressProvider>
          <LoanApplicationFormProvider>
            <BRLoanApplicationDetailsProvider>
              <LoanApplicationDetailLayout>
                <Outlet />
              </LoanApplicationDetailLayout>
            </BRLoanApplicationDetailsProvider>
          </LoanApplicationFormProvider>
        </LoanProgressProvider>
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
        <LoanApplicationFormProvider>
          <LoanProgressProvider>
            <BRLoanApplicationDetailsProvider>
              <LoanApplicationFormLayout>
                <LoanApplicationEdit />
              </LoanApplicationFormLayout>
            </BRLoanApplicationDetailsProvider>
          </LoanProgressProvider>
        </LoanApplicationFormProvider>
      }
    />

    <Route
      element={
        <LoanProgramDetailProvider>
          <LoanProgressProvider>
            <LoanApplicationFormLayout>
              <LoanApplicationFormProvider>
                <Outlet />
              </LoanApplicationFormProvider>
            </LoanApplicationFormLayout>
          </LoanProgressProvider>
        </LoanProgramDetailProvider>
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
      element={
        <LoanApplicationFormProvider>
          <Outlet />
        </LoanApplicationFormProvider>
      }
    >
      <Route
        path={APP_PATH.LOAN_APPLICATION.SUBMISSION}
        lazy={() =>
          import("@/modules/loan-application/components/layouts/LoanSubmission")
        }
      />
    </Route>
  </Route>
)

export { applicantRoutes }
