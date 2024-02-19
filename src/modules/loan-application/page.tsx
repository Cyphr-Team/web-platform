import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { LoanApplicationProvider } from "./providers/LoanApplicationProvider"
import { UserInfo } from "@/types/user.type"
import { Suspense } from "react"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems } from "./constants"
import { Header } from "@/shared/layouts/dashboard-layout/dashboard-header"
import { Loader2 } from "lucide-react"

const RoleStrict = ({ children }: React.PropsWithChildren) => {
  const isLoanApplicant = checkIsLoanApplicant()

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
          <LoanApplicationProvider>
            <div className="flex h-screen overflow-hidden">
              <SideNav items={navItems} className="hidden md:flex" />
              <div className="p-4xl flex-1 flex pt-14 md:pt-4xl">
                <Outlet />
              </div>
            </div>
          </LoanApplicationProvider>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}
