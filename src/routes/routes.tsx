import DashboardPage from "@/modules/example-dashboard/page"

import {
  GlobalLayouts,
  NotFoundLayout,
  DashboardLayout
} from "@/shared/layouts"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"

export const APP_PATH = {
  INDEX: "/",
  DASHBOARD: "/home",
  LOGIN: "/login",
  EXAMPLE_TABLE: "/example-table"
}

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={APP_PATH.INDEX}
      element={<GlobalLayouts />}
      errorElement={<NotFoundLayout />}
    >
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
