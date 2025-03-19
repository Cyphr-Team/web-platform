import LoanReadiness from "@/modules/loan-application/[module]-financial-projection/components/pages/FpLoanReadyPage.tsx"
import { BasicApplicationDrawer } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/BasicApplicationDrawer.tsx"

export default function BasicApplicationDetailLoanReady() {
  return (
    <div>
      <nav className="mb-6 md:mb-12">
        <div className="flex min-w-20 items-center gap-2">
          <div className="ml-auto">
            <BasicApplicationDrawer />
          </div>
        </div>
      </nav>

      <LoanReadiness />
    </div>
  )
}
