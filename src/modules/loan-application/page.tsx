import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useNavigate
} from "react-router-dom"
import { type UserInfo } from "@/types/user.type"
import { Suspense, useEffect } from "react"
import { APP_PATH } from "@/constants"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { SideNav } from "@/shared/molecules/SideNav"
import { navItems } from "./constants"
import { Header } from "@/shared/layouts/dashboard-layout/dashboard-header"
import { Loader2 } from "lucide-react"
import { useVerifyToken } from "@/hooks/useVerifyToken"
import { useLogout } from "@/hooks/useLogout"
import { toast } from "sonner"
import { useFinancialToolkitStore } from "@/modules/legacy-financial-projection/stores/useFinancialToolkitStore.ts"

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

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <Await
        errorElement={<Navigate replace to={APP_PATH.LOGIN} />}
        resolve={userPromise}
      >
        <RoleStrict>
          <Header items={navItems} />

          <div className="flex h-dvh overflow-hidden">
            <SideNav className="hidden md:flex" items={navItems} />
            {/* For auto scroll to top, this tag must be overflow-hidden */}
            <main className="flex flex-1 pt-14 md:pt-0 overflow-hidden">
              <StartApplicationToast />
              <Outlet />
            </main>
          </div>
        </RoleStrict>
      </Await>
    </Suspense>
  )
}

function StartApplicationToast() {
  const navigate = useNavigate()
  const x = useFinancialToolkitStore()

  useEffect(() => {
    if (x.ching === null || x.ching) return

    const toastId = toast.info("Ready to Start?", {
      classNames: {
        actionButton: "self-end"
      },
      description:
        "Your Loan Ready report is ready to use. Start your application now or access it anytime from your applications",
      duration: Infinity,
      position: "bottom-right",
      action: {
        label: "Start",
        onClick: () =>
          navigate(
            "/loan/loan-program/e0f70f20-da08-4567-964b-cfdc12d94d1a/information"
          )
      }
    })

    x.action.chong(toastId)
  }, [navigate, x.action, x.ching])

  return null
}
