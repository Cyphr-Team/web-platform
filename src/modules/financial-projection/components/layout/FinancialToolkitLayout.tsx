import { memo, Suspense } from "react"
import { LogoHeader } from "@/shared/atoms/LogoHeader.tsx"
import FinancialToolkitSidebar from "@/modules/financial-projection/components/organisms/FinancialToolkitSidebar.tsx"
import { FinancialToolkitHeader } from "@/modules/financial-projection/components/organisms"
import { Loader2 } from "lucide-react"
import { Outlet } from "react-router-dom"
import { cn } from "@/lib/utils.ts"

const FinancialToolkitLayout = () => {
  return (
    <div
      className={cn(
        "absolute h-full w-full z-40 flex left-0 top-0 mt-14 pb-14",
        "md:mt-0 md:pb-0"
      )}
    >
      <div className="flex flex-row w-full">
        <div className="flex-col md:flex bg-background-disabled w-72 flex-shrink-0  mb-3xl overflow-auto h-dvh">
          <div className="pl-3xl pr-2xl items-center mb-4 justify-between flex bg-white border-b h-20">
            <LogoHeader className="justify-center" />
          </div>
          <FinancialToolkitSidebar />
        </div>

        <div className="w-full flex-col">
          <FinancialToolkitHeader />
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default memo(FinancialToolkitLayout)
