import { Navigate, Outlet } from "react-router-dom"
import { MainLayout } from "../components/layouts/MainLayout"
import { LoanApplicationDetailProvider } from "../providers/LoanApplicationDetailProvider"
import {
  checkIsJudge,
  checkIsLoanOfficer,
  checkIsViewer,
  checkIsWorkspaceAdmin
} from "@/utils/check-roles"
import { APP_PATH } from "@/constants"

function RoleStrict({ children }: React.PropsWithChildren) {
  const hasReviewAccess =
    checkIsLoanOfficer() ||
    checkIsWorkspaceAdmin() ||
    checkIsJudge() ||
    checkIsViewer()

  if (!hasReviewAccess)
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
