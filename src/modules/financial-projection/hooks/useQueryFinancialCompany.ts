import { QUERY_KEY } from "@/modules/financial-projection/constants"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import { FinancialCompany } from "@/modules/financial-projection/types"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

type QueryFinancialCompanyResponse = FinancialCompany[]

export const useQueryFinancialCompany = () => {
  const { setCompanies } = useFinancialToolkitStore.use.action()

  const { data, isLoading } = useQuery<
    QueryFinancialCompanyResponse,
    ErrorResponse
  >({
    queryKey: [QUERY_KEY.FINANCIAL_COMPANY],
    queryFn: () => {
      // return getRequest({
      //   path: API_PATH.financialProjection.company.list
      // })
      return MOCK_COMPANIES
    }
  })

  // set companies to store
  setCompanies(data ?? [])

  return {
    isLoading: isLoading
  }
}

// TODO: clean me
const MOCK_COMPANIES: FinancialCompany[] = [
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
