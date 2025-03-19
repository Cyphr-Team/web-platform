import { type PropsWithChildren, useEffect } from "react"
import { FpTopNav } from "@/modules/conference-demo/admin/components/molecules/FpTopNav.tsx"
import useRouter from "@/hooks/useRouter.ts"
import { APP_PATH } from "@/constants"
import { useLocation, useParams } from "react-router-dom"
import { Header } from "@/modules/conference-demo/admin/components/organisms/Header.tsx"
import { TopNav } from "@/modules/conference-demo/admin/components/organisms/TopNav.tsx"
import { cn } from "@/lib/utils.ts"

function ConferenceDemoApplicationFpAdminLayout({
  children
}: PropsWithChildren) {
  const location = useLocation()
  const { id = "" } = useParams()
  const { push } = useRouter()

  useEffect(() => {
    if (
      location.pathname ===
      APP_PATH.CONFERENCE_DEMO.admin.financialProjection.index(id)
    ) {
      push(APP_PATH.CONFERENCE_DEMO.admin.financialProjection.overview(id))
    }
  }, [location, push, id])

  return (
    <div className="flex size-full flex-col md:pt-4">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <Header />
        <TopNav />
      </div>
      <div
        className={cn(
          "container bg-[#F9FAFB] p-2xl",
          "md:p-4xl",
          "overflow-scroll"
        )}
      >
        <div className="my-4 mt-xl flex flex-col space-y-3xl">
          <FpTopNav />
        </div>
        <div className="flex-1 bg-gray-50 p-4xl pt-3xl">{children}</div>
      </div>
    </div>
  )
}

export default ConferenceDemoApplicationFpAdminLayout
