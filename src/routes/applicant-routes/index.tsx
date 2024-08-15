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
import { lazy, Suspense } from "react"
import { Loader2 } from "lucide-react"
import { LoanApplicationFormProvider } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { LoanProgressProvider } from "@/modules/loan-application/providers/LoanProgressProvider"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider"
import { PlaidProvider } from "@/modules/loan-application/providers/PlaidProvider"
import { isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"

/**
 * Loan applicant routes ("/loan"), only loan applicant can view these pages.
 * get user   ->  if success return children routes.
 *            ->  if fail navigate to ("/login").
 */

const LoanApplicationEdit = lazy(
  () => import("@/modules/loan-application/pages/LoanApplicationEdit")
)
const LoanApplicationDetailsReview = lazy(
  () => import("@/modules/loan-application/pages/LoanApplicationDetailsReview")
)
const FinancialToolkitPage = lazy(
  () =>
    import(
      "@/modules/financial-projection/components/pages/FinancialToolkitPage"
    )
)

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
      <Route
        path={APP_PATH.LOAN_APPLICATION.FINANCIAL.index}
        element={<FinancialToolkitPage />}
      />
    </Route>

    {/* --- NOTIFICATION --- */}
    {/* Temporarily hide for kcc bank */}
    {(!isKccBank() || !isSbb() || !isLaunchKC()) && notificationRoutes}

    <Route
      path={APP_PATH.LOAN_APPLICATION.SETTINGS}
      lazy={() =>
        import("@/modules/loan-application-management/pages/under-construction")
      }
    />
    <Route
      element={
        <PlaidProvider>
          <LoanProgramDetailProvider>
            <LoanProgressProvider>
              <LoanApplicationFormProvider>
                <BRLoanApplicationDetailsProvider>
                  <Outlet />
                </BRLoanApplicationDetailsProvider>
              </LoanApplicationFormProvider>
            </LoanProgressProvider>
          </LoanProgramDetailProvider>
        </PlaidProvider>
      }
    >
      <Route
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.detail}
        element={
          <LoanApplicationDetailLayout>
            <Outlet />
          </LoanApplicationDetailLayout>
        }
      >
        <Route index element={<LoanApplicationDetailsReview />} />
      </Route>
      <Route
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.edit}
        element={
          <LoanApplicationFormLayout>
            <Outlet />
          </LoanApplicationFormLayout>
        }
      >
        <Route index element={<LoanApplicationEdit />} />
      </Route>
    </Route>
    <Route
      element={
        <PlaidProvider>
          <LoanProgramDetailProvider>
            <LoanProgressProvider>
              <LoanApplicationFormLayout>
                <LoanApplicationFormProvider>
                  <Outlet />
                </LoanApplicationFormProvider>
              </LoanApplicationFormLayout>
            </LoanProgressProvider>
          </LoanProgramDetailProvider>
        </PlaidProvider>
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
