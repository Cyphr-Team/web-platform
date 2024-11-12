import { Outlet } from "react-router-dom"
import { FinancialProjectionApplicationDetailTopHeader } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details/FinancialProjectionApplicationDetailTopHeader.tsx"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export function FinancialProjectionApplicationDetailLayout() {
  return (
    <div className="flex size-full flex-col md:pt-4">
      <div className="mt-xl flex flex-col space-y-3xl border-b">
        <FinancialProjectionApplicationDetailTopHeader />
      </div>

      <div className="flex-1 overflow-auto bg-gray-50 p-4xl">
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
