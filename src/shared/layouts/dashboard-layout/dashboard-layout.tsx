import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Header } from "./dashboard-header"
import { Sidebar } from "./dashboard-sidebar"

import { Suspense } from "react"
import { UserInfo } from "@/common"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }

  const isLoanApplicant = checkIsLoanApplicant()

  if (isLoanApplicant)
    return <Navigate to={APP_PATH.LOAN_APPLICATION.INDEX} replace />

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<Navigate to={APP_PATH.LOGIN} replace />}
      >
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar className="w-1/6 hidden md:block" />
          <main className="flex-1 pt-16 overflow-x-hidden overflow-y-auto ">
            <Outlet />
          </main>
        </div>
      </Await>
    </Suspense>
  )
}
