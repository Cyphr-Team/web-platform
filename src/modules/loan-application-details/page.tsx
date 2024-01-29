import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { MainLayout } from "./components/layouts/MainLayout"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems } from "./constants"
import { LoanApplicationDetailProvider } from "./providers/LoanApplicationDetailProvider"
import { checkIsLoanOfficer } from "@/utils/check-roles"
import { UserInfo } from "@/common"
import { Suspense } from "react"
import { APP_PATH } from "@/constants"

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }
  const isLoanOfficer = checkIsLoanOfficer()

  if (!isLoanOfficer) return <Navigate to={APP_PATH.DASHBOARD} replace />

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<Navigate to={APP_PATH.LOGIN} replace />}
      >
        <LoanApplicationDetailProvider>
          <div className="flex h-screen">
            <SideNav className="border-r" items={navItems} />
            <div className="flex-1 pt-4xl flex flex-col">
              <MainLayout>
                <Outlet />
              </MainLayout>
            </div>
          </div>
        </LoanApplicationDetailProvider>
      </Await>
    </Suspense>
  )
}
