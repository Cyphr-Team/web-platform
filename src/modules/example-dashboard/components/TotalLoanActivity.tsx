import { toCurrency } from "@/utils"
import { DollarSign, File, FileCheck } from "lucide-react"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardCard } from "./DashboardCard"

export const TotalLoanActivity = () => {
  const { statsData, isLoading } = useDashboard()

  const data = {
    usageOfApplications: `${statsData?.totalApplication} / ${statsData?.applicationUsageLimit}`,
    totalApprovedLoans: statsData?.totalApplicationApproved,
    aggregateLoanAmount: toCurrency(statsData?.totalLoanAmount ?? 0)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Total Loan Activity</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardCard
          title="Usage of Applications"
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
