import { APP_PATH } from "@/constants"
import { Component as ApplicantLayout } from "@/modules/loan-application/page"
import { BRLoanApplicationDetailsProvider } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { LoanApplicationFormProvider } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider"
import { LoanProgressProvider } from "@/modules/loan-application/providers/LoanProgressProvider"
import { PlaidProvider } from "@/modules/loan-application/providers/PlaidProvider"
import { LoanApplicationDetailLayout } from "@/shared/layouts/LoanApplicationDetailLayout"
import { LoanApplicationFormLayout } from "@/shared/layouts/LoanApplicationFormLayout"
import { handleCrumb } from "@/utils/crumb.utils"
import { isKccBank, isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import { Loader2 } from "lucide-react"
import { lazy, Suspense } from "react"
import { Outlet, Route } from "react-router-dom"
import { userLoader } from "../loader"
import { availableLoanProgramRoutes } from "./available-loan-program-routes"
import { notificationRoutes } from "./notification-routes"
import { applicantFinancialProjectionRoutes } from "@/routes/applicant-routes/financial-projection-routes"
import { paymentRoutes } from "@/routes/applicant-routes/payment-routes"
import { FinancialProjectionApplicationDetailLayout } from "@/modules/loan-application/[module]-financial-projection/components/layouts/FinancialProjectionApplicationDetailLayout.tsx"
import { applicantFinancialProjectionRoutesV2 } from "@/routes/applicant-routes/financial-projection-routes-v2"

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
const FinancialProjectionApplicationDetails = lazy(
  () =>
    import(
      "@/modules/loan-application/[module]-financial-projection/components/organisms/details/FinancialProjectionApplicationDetails"
    )
)
const BasicApplicationDetailLoanReady = lazy(
  () =>
    import(
      "@/modules/loan-application/[module]-financial-projection/components/organisms/details/BaiscApplicationDetailLoanReady"
    )
)

const applicantRoutes = (
  <Route
    element={<ApplicantLayout />}
    handle={handleCrumb(APP_PATH.LOAN_APPLICATION.INDEX)}
    loader={userLoader}
    path={APP_PATH.LOAN_APPLICATION.INDEX}
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
        lazy={() =>
          import(
            isLoanReady()
              ? "@/modules/loanready/pages/Applications"
              : "@/modules/loan-application/pages/LoanApplications"
          )
        }
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.index}
      />
    </Route>
    {isLoanReady() && applicantFinancialProjectionRoutes}
    {isLoanReady() && paymentRoutes}
    {/* --- NOTIFICATION --- */}
    {/* Temporarily hide for kcc bank */}
    {(!isKccBank() || !isSbb() || !isLaunchKC()) && notificationRoutes}
    <Route
      lazy={() =>
        import("@/modules/loan-application-management/pages/under-construction")
      }
      path={APP_PATH.LOAN_APPLICATION.SETTINGS}
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
        element={<FinancialProjectionApplicationDetailLayout />}
        path={APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detail}
      >
        <Route index element={<FinancialProjectionApplicationDetails />} />
        <Route
          element={<BasicApplicationDetailLoanReady />}
          path={
            APP_PATH.LOAN_APPLICATION.FINANCIAL_APPLICATIONS.detailReadiness
          }
        />
        {applicantFinancialProjectionRoutesV2}
      </Route>
      <Route
        element={
          <LoanApplicationDetailLayout>
            <Outlet />
          </LoanApplicationDetailLayout>
        }
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.detail}
      >
        <Route index element={<LoanApplicationDetailsReview />} />
      </Route>
      <Route
        element={
          <LoanApplicationFormLayout>
            <Outlet />
          </LoanApplicationFormLayout>
        }
        path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.edit}
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
        lazy={() =>
          import(
            "@/modules/loan-application/components/layouts/LoanInformation"
          )
        }
        path={APP_PATH.LOAN_APPLICATION.INFORMATION.detail}
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
        lazy={() =>
          import("@/modules/loan-application/components/layouts/LoanSubmission")
        }
        path={APP_PATH.LOAN_APPLICATION.SUBMISSION}
      />
    </Route>
  </Route>
)

export { applicantRoutes }
