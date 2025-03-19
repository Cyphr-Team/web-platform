import { routes } from "@/routes"
import { RouterProvider } from "react-router-dom"

export function AppRouterProvider() {
  return <RouterProvider router={routes} />
}
