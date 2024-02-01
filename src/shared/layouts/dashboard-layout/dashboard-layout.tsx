import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Header } from "./dashboard-header"

import { Suspense } from "react"
import { UserInfo } from "@/types/user.type"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { DASHBOARD_NAV_ITEM } from "@/constants/nav-item.constant"

const RoleNavigate = () => {
  const isLoanApplicant = checkIsLoanApplicant()

  if (isLoanApplicant)
    return <Navigate to={APP_PATH.LOAN_APPLICATION.INDEX} replace />

  return null
}

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<Navigate to={APP_PATH.LOGIN} replace />}
      >
        <RoleNavigate />

        <Header />
        <div className="flex h-screen overflow-hidden">
          <SideNav items={DASHBOARD_NAV_ITEM} className="hidden md:flex" />
          <main className="flex-1 pt-16 md:pt-0 overflow-x-hidden overflow-y-auto ">
            <Outlet />
          </main>
        </div>
      </Await>
    </Suspense>
  )
}
