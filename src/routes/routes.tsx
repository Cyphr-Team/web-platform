import { GlobalLayouts, NotFoundLayout } from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import { APP_PATH } from "@/constants"
import { BRLoanApplicationDetailsProvider } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { LoanApplicationProvider } from "@/modules/loan-application/providers/LoanApplicationProvider"
import { SideNavApplicationDetails } from "@/shared/molecules/SideNavApplicationDetails"
import { SideNavLoanApplication } from "@/shared/molecules/SideNavLoanApplication"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route
} from "react-router-dom"
import { userLoader } from "./loader"
import { handleCrumb } from "@/utils/crumb.utils"
import { LoanApplicationEdit } from "@/modules/loan-application/pages/LoanApplicationEdit"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={APP_PATH.INDEX} element={<GlobalLayouts />}>
      {/* AUTHENTICATION ROUTES */}

      <Route element={<AuthLayout />}>
        <Route
          path={APP_PATH.LOGIN}
          lazy={() => import("@/modules/authentication/login/page")}
        />
        <Route
          path={APP_PATH.SIGN_UP}
          lazy={() => import("@/modules/authentication/sign-up/page")}
        />
        <Route
          path={APP_PATH.VERIFY_EMAIL.index}
          lazy={() => import("@/modules/authentication/verify-email/page")}
        />
        <Route
          path={APP_PATH.VERIFY_EMAIL.activateByToken}
          lazy={() => import("@/modules/authentication/activate-email/page")}
        />
        <Route
          path={APP_PATH.SETUP_PROFILE}
          lazy={() => import("@/modules/authentication/setup-profile/page")}
        />
        <Route
          path={APP_PATH.FORGOT_PASSWORD}
          lazy={() => import("@/modules/authentication/forgot-password/page")}
        />
        <Route
          path={APP_PATH.SETUP_PASSWORD_BY_TOKEN.index}
          lazy={() => import("@/modules/authentication/setup-password/page")}
        />
        <Route
          path={APP_PATH.ACCEPT_INVITE}
          lazy={() => import("@/modules/authentication/accept-invite/page")}
        />
      </Route>

      {/* DASHBOARD ROUTES */}

      <Route
        loader={userLoader}
        lazy={() =>
          import("@/shared/layouts/dashboard-layout/dashboard-layout")
        }
        handle={handleCrumb(APP_PATH.INDEX)}
      >
        <Route index lazy={() => import("@/modules/example-dashboard/page")} />

        {/* --- USERS MANAGEMENT --- */}
        <Route
          path={APP_PATH.ADMIN_USERS.index}
          lazy={() => import("@/modules/admin/user/page")}
        />

        {/* --- LOAN APPLICATION MANAGEMENT --- */}
        <Route
          path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX}
          handle={handleCrumb(APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX)}
        >
          {/* LIST */}
          <Route
            index
            lazy={() =>
              import("@/modules/loan-application-management/pages/list")
            }
          />

          {/* DETAIL */}
          <Route
            path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX}
            lazy={() =>
              import("@/modules/loan-application-management/pages/detail")
            }
            handle={handleCrumb(
              APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION.detail
            )}
          >
            <Route
              path={
                APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_VERIFICATION
                  .detail
              }
              lazy={() =>
                import(
                  "@/modules/loan-application-management/components/pages/BusinessVerification.page"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.index}
              handle={handleCrumb(
                APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.index
              )}
            >
              <Route
                index
                lazy={() =>
                  import(
                    "@/modules/loan-application-management/components/pages/Document"
                  )
                }
              />
              <Route
                path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.index}
                lazy={() =>
                  import(
                    "@/modules/loan-application-management/components/pages/DocumentDetails"
                  )
                }
                handle={handleCrumb(
                  APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.index
                )}
              />
            </Route>
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_SUMMARY}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/pages/loan-summary"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/components/pages/CashFlow.page"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.CASH_FLOW}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/pages/under-construction"
                )
              }
            />
          </Route>
        </Route>

        {/* --- LOAN PROGRAM --- */}
        <Route
          path={APP_PATH.LOAN_PROGRAM.index}
          lazy={() => import("@/modules/admin/loan-program/page")}
          handle={handleCrumb(APP_PATH.LOAN_PROGRAM.index)}
        />

        {/* --- NOTIFICATION --- */}
        <Route
          path={APP_PATH.NOTIFICATION.list}
          lazy={() => import("@/modules/admin/notification/page")}
        />

        {/* --- MESSAGES --- */}
        <Route
          path={APP_PATH.MESSAGES}
          lazy={() =>
            import(
              "@/modules/loan-application-management/pages/under-construction"
            )
          }
        />

        {/* --- SETTINGS --- */}
        <Route
          path={APP_PATH.SETTINGS}
          lazy={() =>
            import(
              "@/modules/loan-application-management/pages/under-construction"
            )
          }
        />
      </Route>

      {/* BORROWER ONBOARDING ROUTES */}

      <Route
        loader={userLoader}
        path={APP_PATH.LOAN_APPLICATION.INDEX}
        lazy={() => import("@/modules/loan-application/page")}
      >
        <Route
          index
          path={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list}
          lazy={() =>
            import("@/modules/loan-application/components/layouts/LoanProgram")
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detail}
          lazy={() =>
            import(
              "@/modules/loan-application/components/layouts/LoanProgramDetail"
            )
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.index}
          lazy={() =>
            import("@/modules/loan-application/pages/LoanApplications")
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.SETTINGS}
          lazy={() =>
            import(
              "@/modules/loan-application-management/pages/under-construction"
            )
          }
        />
        <Route
          element={
            <BRLoanApplicationDetailsProvider>
              <SideNavApplicationDetails />
              <div className="md:ml-36 w-full overflow-auto flex flex-col">
                <Outlet />
              </div>
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
                <SideNavLoanApplication />
                <div className="md:ml-36 w-full overflow-auto flex flex-col">
                  <LoanApplicationEdit />
                </div>
              </LoanApplicationProvider>
            </BRLoanApplicationDetailsProvider>
          }
        />

        <Route
          element={
            <>
              <SideNavLoanApplication />
              <div className="md:ml-36 w-full overflow-auto flex flex-col">
                <Outlet />
              </div>
            </>
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
            import(
              "@/modules/loan-application/components/layouts/LoanSubmission"
            )
          }
        />
      </Route>

      <Route path="*" element={<NotFoundLayout />} />
    </Route>
  )
)

export { routes }
