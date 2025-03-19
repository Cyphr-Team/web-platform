import { Navigate, Outlet } from "react-router-dom"
import { MainLayout } from "../components/layouts/MainLayout"
import { LoanApplicationDetailProvider } from "../providers/LoanApplicationDetailProvider"
import {
  checkIsWorkspaceAdmin,
  checkIsLoanOfficer,
  checkIsJudge
} from "@/utils/check-roles"
import { APP_PATH } from "@/constants"

function RoleStrict({ children }: React.PropsWithChildren) {
  const isLoanOfficerOrLenderAdminOrJudge =
    checkIsLoanOfficer() || checkIsWorkspaceAdmin() || checkIsJudge()

  if (!isLoanOfficerOrLenderAdminOrJudge)
    return <Navigate replace to={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX} />

  return children
}

export function Component() {
  return (
    <RoleStrict>
      <LoanApplicationDetailProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </LoanApplicationDetailProvider>
    </RoleStrict>
  )
}
