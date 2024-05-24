import { APP_PATH } from "@/constants"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import { Navigate, Outlet } from "react-router-dom"

const RoleStrict = ({ children }: React.PropsWithChildren) => {
  const isForesightAdmin = checkIsForesightAdmin()
  if (!isForesightAdmin)
    return <Navigate to={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX} replace />
  return children
}

export function Component() {
  return (
    <RoleStrict>
      <Outlet />
    </RoleStrict>
  )
}

Component.displayName = "AdminLayout"
