import { ApprovedLoanAmountChart } from "../molecules/charts/ApprovedLoanAmountChart"
import { LoanDistributorChart } from "../molecules/charts/LoanDistributorChart"
import { AverageTimeToDecisionChart } from "../molecules/charts/AverageTimeToDecisionChart"
import ChartCard from "@/shared/molecules/chart-card"
import { LoanApprovalRateThroughRateChart } from "../molecules/charts/LoanApprovalRateThroughRateChart"
import { ApprovedLoanAmountUSDChart } from "../molecules/charts/ApprovedLoanAmountUSDChart"
import { LoanByIndustrySectorChart } from "../molecules/charts/LoanByIndustrySectorChart"
import { Separator } from "@/components/ui/separator"
import { PerformanceMetrics } from "../molecules/PerformanceMetrics"
import { cn } from "@/lib/utils"
import { TotalApplicationActivity } from "../organisms/TotalApplicationActivity"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import AddMetricsSection from "../molecules/AddMetricsSection"
import { FilterTimeRange } from "../molecules/FilterTimeRange"
import { LoanDistributionByRaceChart } from "../molecules/charts/LoanDistributionByRaceChart"

const chartList = [
  {
    title: "Avg. Approved Loan amount (USD) ",
    Chart: ApprovedLoanAmountUSDChart
  },
  {
    title: "Loan By Industry Sector",
    Chart: LoanByIndustrySectorChart
  },
  {
    title: "Loan Approval Rate/Pull-Through Rate ",
    Chart: LoanApprovalRateThroughRateChart
  },
  {
    title: (
      <div>
        Avg. Approved Loan amount (USD) <br />
        Change in $ vs starting month
      </div>
    ),
    Chart: ApprovedLoanAmountChart
  },
  {
    title: "Average Time to Decision",
    Chart: AverageTimeToDecisionChart
  },
  {
    title: "Loan Distributor by Gender",
    Chart: LoanDistributorChart
  },
  {
    title: "Loans Distribution by Race",
    Chart: LoanDistributionByRaceChart
  }
]

export function AdminApplicationDetails() {
  return (
    <div className="flex bg-active flex-col relative">
      <div
        className={cn(
          "sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b bg-white p-5",
          "md:px-8"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center">
          <FilterTimeRange />
        </div>
      </div>
      <div className={cn("flex-1 space-y-6 bg-active p-6", "md:p-8")}>
        <div className="flex flex-row-reverse">
          <Button variant="success">
            <Icons.folderDownload className="mr-1" />
            Download report
          </Button>
        </div>
        <TotalApplicationActivity />
        <Separator />
        <PerformanceMetrics />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {chartList.map(({ title, Chart }) => (
            <ChartCard key={Chart.name} title={title}>
              <Chart />
            </ChartCard>
          ))}
          <AddMetricsSection />
        </div>
      </div>
    </div>
  )
}
