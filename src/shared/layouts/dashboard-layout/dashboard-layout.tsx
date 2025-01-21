import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Header } from "./dashboard-header"

import { Suspense } from "react"
import { type UserInfo } from "@/types/user.type"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { DASHBOARD_NAV_ITEM } from "@/constants/nav-item.constant"
import { Loader2 } from "lucide-react"
import { useVerifyToken } from "@/hooks/useVerifyToken"
import { useLogout } from "@/hooks/useLogout"
import { isAdmin } from "@/utils/domain.utils"

function RoleStrict({ children }: React.PropsWithChildren) {
  const isLoanApplicant = checkIsLoanApplicant()
  const isInvalidToken = !useVerifyToken()
  const { clearUserInfo } = useLogout()

  switch (true) {
    case isInvalidToken:
      clearUserInfo()

      return <Navigate replace to={APP_PATH.LOGIN} />
    case isLoanApplicant:
      return (
        <Navigate replace to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list} />
      )
    default:
      return children
  }
}

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <Await
        errorElement={
          isAdmin() ? (
            <Navigate replace to={APP_PATH.LOGIN} />
          ) : (
            <Navigate replace to={APP_PATH.SIGN_UP} />
          )
        }
        resolve={userPromise}
      >
        <RoleStrict>
          <Header items={DASHBOARD_NAV_ITEM} />
          <div className="flex h-dvh overflow-hidden">
            <SideNav className="hidden md:flex" items={DASHBOARD_NAV_ITEM} />
            <main className="flex-1 overflow-y-auto overflow-x-hidden pt-14 md:pt-0">
              <Outlet />
            </main>
          </div>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}
