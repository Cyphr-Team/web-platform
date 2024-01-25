import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { SideNav } from "./components/organisms/SideNav"
import { LoanApplicationProvider } from "./providers/LoanApplicationProvider"
import { UserInfo } from "@/common"
import { Suspense } from "react"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }

  const isLoanApplicant = checkIsLoanApplicant()

  if (!isLoanApplicant) return <Navigate to={APP_PATH.DASHBOARD} replace />

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<Navigate to={APP_PATH.LOGIN} replace />}
      >
        <LoanApplicationProvider>
          <div className="flex h-screen overflow-hidden">
            <SideNav />
            <div className="p-4xl flex-1 flex">
              <Outlet />
            </div>
          </div>
        </LoanApplicationProvider>
      </Await>
    </Suspense>
  )
}
