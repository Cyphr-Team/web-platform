import { DirectCost } from "@/modules/financial-projection/types"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type.ts"
import { useEffect } from "react"
import { QUERY_KEY } from "@/modules/financial-projection/constants/query-key.ts"

type QueryFinancialDirectCostsResponse = DirectCost[]

export const useQueryDirectCosts = () => {
  const { setDirectCost } = useFinancialToolkitStore.use.action()

  const { data, isLoading } = useQuery<
    QueryFinancialDirectCostsResponse,
    ErrorResponse
  >({
    queryKey: [QUERY_KEY.FINANCIAL_DIRECT_COSTS],
    queryFn: () => {
      // TODO: fix me when BE is done
      // return getRequest({
      //   path: API_PATH.financialProjection.company.list
      // })
      return MOCK_COST
    }
  })

  // set companies to store
  useEffect(() => {
    setDirectCost(data ?? [])
  }, [data, setDirectCost])

  return {
    isLoading: isLoading
  }
}

const MOCK_COST: DirectCost[] = [
  {
    id: "DC-001",
    name: "Employee Salaries",
    financialProjectId: "FP-001",
    startingMonth: "2024-08-16T08:41:17.410Z",
    percentageCost: 25
  },
  {
    id: "DC-002",
    name: "Software Licenses",
    financialProjectId: "FP-002",
    startingMonth: "2024-08-16T08:41:17.410Z",
    percentageCost: 15
  },
  {
    id: "DC-003",
    name: "Office Rent",
    financialProjectId: "FP-003",
    startingMonth: "2024-08-16T08:41:17.410Z",
    percentageCost: 20
  },
  {
    id: "DC-004",
    name: "Marketing Campaign",
    financialProjectId: "FP-004",
    startingMonth: "2024-08-16T08:41:17.410Z",
    percentageCost: 10
  },
  {
    id: "DC-005",
    name: "Contractor Payments",
    financialProjectId: "FP-005",
    startingMonth: "2024-08-16T08:41:17.410Z",
    percentageCost: 30
  }
]
