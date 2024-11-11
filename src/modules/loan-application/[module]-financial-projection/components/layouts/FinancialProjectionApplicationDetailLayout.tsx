import { Outlet } from "react-router-dom"
import { FinancialProjectionApplicationDetailTopHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details/FinancialProjectionApplicationDetailTopHeader.tsx"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export function FinancialProjectionApplicationDetailLayout() {
  return (
    <div className="flex flex-col w-full h-full md:pt-4">
      <div className="flex flex-col space-y-3xl border-b mt-xl">
        <FinancialProjectionApplicationDetailTopHeader />
      </div>

      <div className="p-4xl flex-1 overflow-auto bg-gray-50">
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
