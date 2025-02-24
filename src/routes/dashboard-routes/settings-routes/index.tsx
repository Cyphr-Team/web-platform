import { APP_PATH } from "@/constants"
import { Route } from "react-router-dom"
import { handleCrumb } from "@/utils/crumb.utils.ts"
import { userLoader } from "@/routes/loader.ts"
import { WrapperLayout } from "@/modules/settings/components/layouts/wrapper-layout.tsx"
import { SettingsLayout } from "@/modules/settings/components/layouts/settings-layout.tsx"
import { LoanReadyRoutes } from "@/routes/dashboard-routes/settings-routes/loanready-routes.tsx"
import { isLoanReady } from "@/utils/domain.utils.ts"
import { isEnablePIISelfService } from "@/utils/feature-flag.utils.ts"

/**
 * Cyphr settings routes ("/").
 */
const settingsRoutes = (
  <Route
    element={<WrapperLayout />}
    handle={handleCrumb(APP_PATH.INDEX)}
    loader={userLoader}
  >
    <Route
      element={<SettingsLayout />}
      handle={handleCrumb(APP_PATH.SETTINGS.index)}
      path={APP_PATH.SETTINGS.index}
    >
      {isEnablePIISelfService() && (
        <>
          <Route
            index
            lazy={() =>
              import("@/modules/settings/components/pages/profile-page")
            }
            path={APP_PATH.SETTINGS.profile}
          />
          <Route
            index
            lazy={() =>
              import("@/modules/settings/components/pages/privacy-page")
            }
            path={APP_PATH.SETTINGS.privacy}
          />
        </>
      )}

      {isLoanReady() && LoanReadyRoutes}

      {/* Default fallback routes */}
      <Route
        index
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/under-construction"
          )
        }
        path={APP_PATH.SETTINGS.profile}
      />
      <Route
        index
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/under-construction"
          )
        }
        path={APP_PATH.SETTINGS.privacy}
      />
      <Route
        index
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/under-construction"
          )
        }
        path={APP_PATH.SETTINGS.users}
      />
      <Route
        index
        lazy={() =>
          import(
            "@/modules/loan-application-management/pages/under-construction"
          )
        }
        path={APP_PATH.SETTINGS.teamMembers}
      />
    </Route>
  </Route>
)

export { settingsRoutes }
