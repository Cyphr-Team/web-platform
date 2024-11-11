import LoanReadiness from "@/modules/loan-application/[module]-financial-projection/components/pages/FpLoanReadyPage.tsx"
import { BasicApplicationDrawer } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/BasicApplicationDrawer.tsx"

export default function BasicApplicationDetailLoanReady() {
  return (
    <div>
      <nav className="mb-6 md:mb-12">
        <div className="flex items-center gap-2 min-w-20">
          <h1 className="text-lg font-semibold truncate min-w-20 md:text-2xl">
            Loan Ready
          </h1>

          <div className="ml-auto">
            <BasicApplicationDrawer />
          </div>
        </div>
      </nav>

      <LoanReadiness />
    </div>
  )
}
