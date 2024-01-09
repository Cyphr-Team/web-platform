import DashboardPage from "@/modules/example-dashboard/page"
import SignUpPage from "@/modules/sign-up/page"

import {
  GlobalLayouts,
  NotFoundLayout,
  DashboardLayout
} from "@/shared/layouts"
import { AuthLayout } from "@/shared/layouts/auth-layout/auth-layout"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"

export const APP_PATH = {
  INDEX: "/",
  DASHBOARD: "/home",
  LOGIN: "/login",
  EXAMPLE_TABLE: "/example-table",
  SIGN_UP: "/sign-up",
  VERIFY_EMAIL: "/verify-email"
}

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={APP_PATH.INDEX}
      element={<GlobalLayouts />}
      errorElement={<NotFoundLayout />}
    >
      <Route element={<AuthLayout />}>
        <Route path={APP_PATH.SIGN_UP} element={<SignUpPage />} />
      </Route>
      <Route path={APP_PATH.DASHBOARD} element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path={APP_PATH.EXAMPLE_TABLE} element={<DashboardLayout />}>
        <Route index lazy={() => import("@/modules/example-table/page")} />
      </Route>
    </Route>
  )
)

export { routes }
