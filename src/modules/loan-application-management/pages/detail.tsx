import { Navigate, Outlet } from "react-router-dom"
import { MainLayout } from "../components/layouts/MainLayout"
import { LoanApplicationDetailProvider } from "../providers/LoanApplicationDetailProvider"
import {
  checkIsLenderAdmin,
  checkIsLoanOfficer,
  checkIsJudge
} from "@/utils/check-roles"
import { APP_PATH } from "@/constants"

const RoleStrict = ({ children }: React.PropsWithChildren) => {
  const isLoanOfficerOrLenderAdminOrJudge =
    checkIsLoanOfficer() || checkIsLenderAdmin() || checkIsJudge()

  if (!isLoanOfficerOrLenderAdminOrJudge)
    return <Navigate to={APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX} replace />

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
