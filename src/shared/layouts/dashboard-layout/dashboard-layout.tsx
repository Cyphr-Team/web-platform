import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { Header } from "./dashboard-header"

import { Suspense, useMemo } from "react"
import { type UserInfo } from "@/types/user.type"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { Loader2 } from "lucide-react"
import { useVerifyToken } from "@/hooks/useVerifyToken"
import { useLogout } from "@/hooks/useLogout"
import { isAdmin, isLoanReady } from "@/utils/domain.utils"
import { Icons } from "@/components/ui/icons.tsx"
import { FeatureKey } from "@/hooks/useCanAccess.ts"
import {
  isEnableLoanReadyV2,
  isEnablePIISelfService
} from "@/utils/feature-flag.utils.ts"
import { updateNavItemWithFeatureFlags } from "@/modules/loan-application/constants"
import { DASHBOARD_NAV_ITEM } from "@/constants/nav-item.constant.ts"

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

  const navItemsWithFeatureFlags = useMemo(
    () => [
      {
        title: "Financial Projections",
        href: APP_PATH.LOAN_APPLICATION.FINANCIAL.INDEX,
        icon: Icons.financial,
        label: "Financial Projections",
        featureKey: FeatureKey.FINANCIAL,
        disabled: isLoanReady() ? isEnableLoanReadyV2() : true
      },
      {
        title: "Settings",
        href: APP_PATH.SETTINGS.index,
        icon: Icons.setting,
        label: "Settings",
        className: "mt-auto mb-3",
        featureKey: FeatureKey.SETTINGS,
        disabled: !isLoanReady() && !isEnablePIISelfService()
      }
    ],
    []
  )

  const ffNavItems = useMemo(
    () =>
      updateNavItemWithFeatureFlags(
        DASHBOARD_NAV_ITEM,
        navItemsWithFeatureFlags
      ),
    [navItemsWithFeatureFlags]
  )

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
          <Header items={ffNavItems} />
          <div className="flex h-dvh overflow-hidden">
            <SideNav className="hidden md:flex" items={ffNavItems} />
            <main className="flex-1 overflow-y-auto overflow-x-hidden pt-14 md:pt-0">
              <Outlet />
            </main>
          </div>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}
