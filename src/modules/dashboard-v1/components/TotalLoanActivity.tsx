import { toCurrency } from "@/utils"
import { DollarSign, File, FileCheck } from "lucide-react"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardCard } from "./DashboardCard"

export const TotalLoanActivity = () => {
  const { statsData, isLoading } = useDashboard()

  const data = {
    // Only show usage for Lender Admin
    usageOfApplications: statsData?.totalApplication ?? 0,
    totalApprovedLoans: statsData?.totalApplicationApproved,
    aggregateLoanAmount: toCurrency(statsData?.totalLoanAmount ?? 0)
  }

  return (
    <div>
      <h1 className="text-xl font-medium mb-2">Total Loan Activity</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardCard
          title={"Total Loan Applications"}
          isLoading={isLoading}
          value={data.usageOfApplications}
          icon={<File />}
        />
        <DashboardCard
          title="Total Number of Approved Loans"
          isLoading={isLoading}
          value={data.totalApprovedLoans}
          icon={<FileCheck />}
        />
        <DashboardCard
          title="Aggregate Loan Amount"
          isLoading={isLoading}
          value={data.aggregateLoanAmount}
          icon={<DollarSign />}
        />
      </div>
    </div>
  )
}
