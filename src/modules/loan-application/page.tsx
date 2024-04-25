import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { UserInfo } from "@/types/user.type"
import { Suspense } from "react"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems } from "./constants"
import { Header } from "@/shared/layouts/dashboard-layout/dashboard-header"
import { Loader2 } from "lucide-react"
import { useVerifyToken } from "@/hooks/useVerifyToken"
import { useLogout } from "@/hooks/useLogout"

const RoleStrict = ({ children }: React.PropsWithChildren) => {
  const isLoanApplicant = checkIsLoanApplicant()
  const isInvalidToken = !useVerifyToken()
  const { clearUserInfo } = useLogout()

  if (isInvalidToken) {
    clearUserInfo()
    return <Navigate to={APP_PATH.LOGIN} replace />
  }

  if (!isLoanApplicant) return <Navigate to={APP_PATH.DASHBOARD} replace />

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
        errorElement={<Navigate to={APP_PATH.LOGIN} replace />}
      >
        <RoleStrict>
          <Header items={navItems} />

          <div className="flex h-dvh overflow-hidden">
            <SideNav items={navItems} className="hidden md:flex" />
            {/* For auto scroll to top, this tag must be overflow-hidden */}
            <main className="flex flex-1 pt-14 md:pt-0 overflow-hidden">
              <Outlet />
            </main>
          </div>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}
