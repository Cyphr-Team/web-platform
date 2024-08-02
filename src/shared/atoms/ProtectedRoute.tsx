import { APP_PATH } from "@/constants"
import useCanAccess, { FeatureKey } from "@/hooks/useCanAccess"
import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

type IProtectedRouteProps = {
  featureKey: FeatureKey
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ featureKey }) => {
  const { getCanAccess } = useCanAccess({ featureKey })
  const can = getCanAccess()

  return can ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: APP_PATH.INDEX }} replace />
  )
}
