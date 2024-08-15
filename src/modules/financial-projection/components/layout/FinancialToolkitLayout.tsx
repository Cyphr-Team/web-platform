import { memo, Suspense } from "react"
import { LogoHeader } from "@/shared/atoms/LogoHeader.tsx"
import FinancialToolkitSidebar from "@/modules/financial-projection/components/organisms/FinancialToolkitSidebar.tsx"
import { FinancialToolkitHeader } from "@/modules/financial-projection/components/organisms"
import { Loader2 } from "lucide-react"
import { Outlet } from "react-router-dom"

const FinancialToolkitLayout = () => {
  return (
    <div className="flex flex-row">
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
  )
}

export default memo(FinancialToolkitLayout)
