import { GlobalLayouts, NotFoundLayout } from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import { APP_PATH } from "@/constants"
import { LoanApplicationEdit } from "@/modules/loan-application/pages/LoanApplicationEdit"
import { BRLoanApplicationDetailsProvider } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { LoanApplicationProvider } from "@/modules/loan-application/providers/LoanApplicationProvider"
import { ActiveEmailLayout } from "@/shared/layouts/ActiveEmailLayout"
import { InstitutionNotFoundLayout } from "@/shared/layouts/InstitutionNotFoundLayout"
import { SideNavApplicationDetails } from "@/shared/molecules/SideNavApplicationDetails"
import { SideNavLoanApplication } from "@/shared/molecules/SideNavLoanApplication"
import { handleCrumb } from "@/utils/crumb.utils"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route
} from "react-router-dom"
import { institutionLoader, userLoader } from "./loader"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      loader={institutionLoader}
      path={APP_PATH.INDEX}
      element={<GlobalLayouts />}
      errorElement={<InstitutionNotFoundLayout />}
    >
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
        <Route element={<ActiveEmailLayout />}>
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
          lazy={() => import("@/modules/notification/pages/Notifications")}
        />
        <Route
          path={APP_PATH.NOTIFICATION.detail}
          lazy={() =>
            import("@/modules/notification/pages/NotificationDetails")
          }
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

        {/* FORESIGHT ADMIN */}

        <Route
          path={APP_PATH.INDEX}
          lazy={() => import("@/modules/onboard/layout")}
        >
          {/* --- ONBOARD --- */}
          <Route
            path={APP_PATH.ONBOARD}
            lazy={() => import("@/modules/onboard/page")}
          />

          {/* --- ONBOARD --- */}
          <Route
            path={APP_PATH.SUBSCRIPTIONS}
            lazy={() => import("@/modules/subscriptions/pages/list")}
          />
        </Route>
      </Route>

      {/* BORROWER ONBOARDING ROUTES */}

      <Route
        loader={userLoader}
        path={APP_PATH.LOAN_APPLICATION.INDEX}
        lazy={() => import("@/modules/loan-application/page")}
        handle={handleCrumb(APP_PATH.LOAN_APPLICATION.INDEX)}
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
          handle={handleCrumb(APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detail)}
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.APPLICATIONS.index}
          lazy={() =>
            import("@/modules/loan-application/pages/LoanApplications")
          }
        />

        {/* --- NOTIFICATION --- */}
        <Route
          path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.list}
          lazy={() => import("@/modules/notification/pages/Notifications")}
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.NOTIFICATION.detail}
          lazy={() =>
            import("@/modules/notification/pages/NotificationDetails")
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
