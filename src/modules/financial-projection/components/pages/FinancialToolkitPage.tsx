import { memo } from "react"
import { FinancialToolkitTemplate } from "@/modules/financial-projection/components/templates"
import { FinancialCompany } from "@/modules/financial-projection/types"

// TODO: clean me
const data: FinancialCompany[] = [
  {
    id: "1",
    userId: "1001",
    companyName: "Alpha Capital",
    companyDescription: "A leading investment firm focusing on tech startups.",
    businessStage: "Growth",
    fiscalYearCycle: "January - December",
    firstYearOfForecast: "2024",
    lengthOfForecast: "5 years",
    monthlyDetail: "Monthly"
  },
  {
    id: "2",
    userId: "1002",
    companyName: "Beta Holdings",
    companyDescription: "A diversified financial services company.",
    businessStage: "Mature",
    fiscalYearCycle: "April - March",
    firstYearOfForecast: "2023",
    lengthOfForecast: "3 years",
    monthlyDetail: "Quarterly"
  },
  {
    id: "3",
    userId: "1003",
    companyName: "Gamma Ventures",
    companyDescription: "An early-stage venture capital firm.",
    businessStage: "Startup",
    fiscalYearCycle: "July - June",
    firstYearOfForecast: "2025",
    lengthOfForecast: "7 years",
    monthlyDetail: "Monthly"
  },
  {
    id: "4",
    userId: "1004",
    companyName: "Delta Investments",
    companyDescription: "A private equity firm specializing in healthcare.",
    businessStage: "Expansion",
    fiscalYearCycle: "October - September",
    firstYearOfForecast: "2023",
    lengthOfForecast: "10 years",
    monthlyDetail: "Monthly"
  },
  {
    id: "5",
    userId: "1005",
    companyName: "Epsilon Advisors",
    companyDescription:
      "A financial advisory firm focused on renewable energy.",
    businessStage: "Mature",
    fiscalYearCycle: "January - December",
    firstYearOfForecast: "2022",
    lengthOfForecast: "5 years",
    monthlyDetail: "Monthly"
  }
]

const FinancialToolkitPage = () => {
  return <FinancialToolkitTemplate data={data} />
}
export default memo(FinancialToolkitPage)
