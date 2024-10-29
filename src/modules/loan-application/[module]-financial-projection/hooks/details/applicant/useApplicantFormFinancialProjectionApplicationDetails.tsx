import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useFinancialApplicationDetail"
import {
  useLoanApplicationFormContext,
  usePlaidContext
} from "@/modules/loan-application/providers"

export function useApplicantFormFinancialProjectionApplicationDetails() {
  const { connectedAccounts } = usePlaidContext()

  const {
    loanRequest,
    businessInformation,
    ownerInformationForm,
    revenue,
    people,
    fpOperatingExpenses,
    directCosts,
    equity,
    forecastingSetup,
    financialStatements,
    taxRates,
    assets,
    debtFinancing
  } = useLoanApplicationFormContext()

  const { financialApplicationDetailData } = useFinancialApplicationDetail({
    fpForm: {
      revenue,
      people,
      fpOperatingExpenses,
      directCosts,
      equity,
      forecastingSetup,
      financialStatements,
      taxRates,
      assets,
      debtFinancing
    },
    loanRequest,
    businessInformation,
    ownerInformationForm,
    connectedBankAccounts: connectedAccounts
  })

  return { financialApplicationDetailData }
}
