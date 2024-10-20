import { APP_PATH } from "@/constants"
import useCanAccess, { type FeatureKey } from "@/hooks/useCanAccess"
import { Navigate, Outlet } from "react-router-dom"

interface IProtectedRouteProps {
  featureKey: FeatureKey
}

export function ProtectedRoute({ featureKey }: IProtectedRouteProps) {
  const { getCanAccess } = useCanAccess({ featureKey })
  const can = getCanAccess()

  return can ? (
    <Outlet />
  ) : (
    <Navigate replace to={{ pathname: APP_PATH.INDEX }} />
  )
}
