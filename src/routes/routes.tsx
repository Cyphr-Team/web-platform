import { GlobalLayouts, NotFoundLayout } from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import { APP_PATH } from "@/constants"
import { userLoader } from "./loader"

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
      >
        <Route index lazy={() => import("@/modules/example-dashboard/page")} />

        {/* --- USERS MANAGEMENT --- */}
        <Route
          path={APP_PATH.ADMIN_USERS.index}
          lazy={() => import("@/modules/admin/user/page")}
        />

        {/* --- LOAN APPLICATION MANAGEMENT --- */}
        <Route path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX}>
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
          >
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.OVERVIEW}
              lazy={() =>
                import(
                  "@/modules/loan-application/components/layouts/LoanInformation"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYB.index}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/components/pages/KybDetails"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYC}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/components/pages/KycDetails"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.index}
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
            />
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
                  "@/modules/loan-application-management/pages/under-construction"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.BUSINESS_PLAN}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/pages/under-construction"
                )
              }
            />
            <Route
              path={APP_PATH.LOAN_APPLICATION_MANAGEMENT.LOAN_DECISION}
              lazy={() =>
                import(
                  "@/modules/loan-application-management/pages/loan-decision"
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
          path={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM}
          lazy={() =>
            import("@/modules/loan-application/components/layouts/LoanProgram")
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.APPLICATIONS}
          lazy={() =>
            import(
              "@/modules/loan-application-management/pages/under-construction"
            )
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
          index
          lazy={() =>
            import(
              "@/modules/loan-application/components/layouts/LoanIntroduction"
            )
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.INFORMATION}
          lazy={() =>
            import(
              "@/modules/loan-application/components/layouts/LoanInformation"
            )
          }
        />
        <Route
          path={APP_PATH.LOAN_APPLICATION.SUBMISSION}
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
