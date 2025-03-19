import { useFinancialApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useFinancialApplicationDetail"
import {
  useLoanApplicationFormContext,
  usePlaidContext
} from "@/modules/loan-application/providers"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

export function useApplicantFormFinancialProjectionApplicationDetails() {
  const { connectedAccounts } = usePlaidContext()

  const {
    loanRequest,
    loanRequestV2,
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
    loanRequest: isEnableFormV2() ? loanRequestV2 : loanRequest,
    businessInformation,
    ownerInformationForm,
    connectedBankAccounts: connectedAccounts
  })

  return { financialApplicationDetailData }
}
