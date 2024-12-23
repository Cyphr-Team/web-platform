import { cn } from "@/lib/utils"
import { BusinessInformationDetails } from "./BusinessInformationDetails"
import LoanRequestDetails from "./LoanRequestDetails"
import { CashFlowTable } from "./CashflowTable"
import BusinessPlanDetails from "./BusinessPlanDetails"

export default function ApplicationDetails() {
  return (
    <div className={cn("flex flex-col gap-2", "md:grid md:grid-cols-4")}>
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Application</h3>
        </div>
      </div>
      <div className="col-span-3 max-w-screen-sm flex flex-col gap-4">
        <LoanRequestDetails />
        <BusinessInformationDetails />
        <BusinessPlanDetails />
        <CashFlowTable />
      </div>
    </div>
  )
}
