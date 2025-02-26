import { Await, Navigate, Outlet, useLoaderData } from "react-router-dom"
import { applicantRoles, type UserInfo } from "@/types/user.type"
import { Suspense, useMemo } from "react"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems, updateNavItemWithFeatureFlags } from "./constants"
import { Header } from "@/shared/layouts/dashboard-layout/dashboard-header"
import { Loader2 } from "lucide-react"
import { useVerifyToken } from "@/hooks/useVerifyToken"
import { useLogout } from "@/hooks/useLogout"
import { isLoanReady } from "@/utils/domain.utils"
import {
  isEnableLoanReadyV2,
  isEnablePIISelfService
} from "@/utils/feature-flag.utils"
import { FeatureKey } from "@/hooks/useCanAccess"
import { Icons } from "@/components/ui/icons"

function RoleStrict({ children }: React.PropsWithChildren) {
  const isLoanApplicant = checkIsLoanApplicant()
  const isInvalidToken = !useVerifyToken()
  const { clearUserInfo } = useLogout()

  if (isInvalidToken) {
    clearUserInfo()

    return <Navigate replace to={APP_PATH.LOGIN} />
  }

  // If not an applicant, redirect to default page for that role and institution
  if (!isLoanApplicant) {
    return <Navigate replace to={APP_PATH.INDEX} />
  }

  return children
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
        roles: applicantRoles(),
        featureKey: FeatureKey.SETTINGS,
        disabled: !isLoanReady() && !isEnablePIISelfService()
      }
    ],
    []
  )

  const ffNavItems = useMemo(
    () => updateNavItemWithFeatureFlags(navItems, navItemsWithFeatureFlags),
    [navItemsWithFeatureFlags]
  )

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <Await
        errorElement={<Navigate replace to={APP_PATH.LOGIN} />}
        resolve={userPromise}
      >
        <RoleStrict>
          <Header items={ffNavItems} />

          <div className="flex h-dvh overflow-hidden">
            <SideNav className="hidden md:flex" items={ffNavItems} />
            {/* For auto scroll to top, this tag must be overflow-hidden */}
            <main className="flex flex-1 overflow-y-auto overflow-x-hidden pt-14 md:pt-0">
              <Outlet />
            </main>
          </div>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}
