import { Outlet } from "react-router-dom"

const RoleStrict = ({ children }: React.PropsWithChildren) => {
  // const isLoanOfficer = checkIsLoanOfficer()
  // if (!isLoanOfficer)
  //   return <Navigate to={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX} replace />
  return children
}

export function Component() {
  return (
    <RoleStrict>
      <Outlet />
    </RoleStrict>
  )
}

Component.displayName = "ForesightAdminLayout"
