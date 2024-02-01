import { Navigate, Outlet } from "react-router-dom"
import { MainLayout } from "../components/layouts/MainLayout"
import { LoanApplicationDetailProvider } from "../providers/LoanApplicationDetailProvider"
import { checkIsLoanOfficer } from "@/utils/check-roles"
import { APP_PATH } from "@/constants"

const RoleNavigate = () => {
  const isLoanOfficer = checkIsLoanOfficer()

  if (!isLoanOfficer) return <Navigate to={APP_PATH.DASHBOARD} replace />

  return null
}

export function Component() {
  return (
    <>
      <RoleNavigate />

      <LoanApplicationDetailProvider>
        <div className="flex h-screen">
          <div className="flex-1 pt-4xl flex flex-col max-w-full">
            <MainLayout>
              <Outlet />
            </MainLayout>
          </div>
        </div>
      </LoanApplicationDetailProvider>
    </>
  )
}
