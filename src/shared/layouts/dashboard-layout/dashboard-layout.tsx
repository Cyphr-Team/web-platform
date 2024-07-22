import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Header } from "./dashboard-header"

import { Suspense } from "react"
import { UserInfo } from "@/types/user.type"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { DASHBOARD_NAV_ITEM } from "@/constants/nav-item.constant"
import { Loader2 } from "lucide-react"
import { useVerifyToken } from "@/hooks/useVerifyToken"
import { useLogout } from "@/hooks/useLogout"
import { isEnableSignUpReorder } from "@/utils/feature-flag.utils"

const RoleStrict = ({ children }: React.PropsWithChildren) => {
  const isLoanApplicant = checkIsLoanApplicant()
  const isInvalidToken = !useVerifyToken()
  const { clearUserInfo } = useLogout()

  if (isInvalidToken) {
    clearUserInfo()
    return (
      <Navigate
        to={isEnableSignUpReorder() ? APP_PATH.SIGN_UP : APP_PATH.LOGIN}
        replace
      />
    )
  }

  if (isLoanApplicant)
    return <Navigate to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list} replace />

  return children
}

export function Component() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserInfo>
  }

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <Await
        resolve={userPromise}
        errorElement={
          <Navigate
            to={isEnableSignUpReorder() ? APP_PATH.SIGN_UP : APP_PATH.LOGIN}
            replace
          />
        }
      >
        <RoleStrict>
          <Header items={DASHBOARD_NAV_ITEM} />
          <div className="flex h-dvh overflow-hidden">
            <SideNav items={DASHBOARD_NAV_ITEM} className="hidden md:flex" />
            <main className="flex-1 pt-14 md:pt-0 overflow-x-hidden overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}
