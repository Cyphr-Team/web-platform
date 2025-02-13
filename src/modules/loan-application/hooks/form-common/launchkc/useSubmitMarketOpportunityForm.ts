import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2"
import { type MarketOpportunityFormValue } from "@/modules/loan-application/constants/form"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { serializeLoanMarketOpportunityFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/market-opportunity-store"

interface Props {
  rawData: MarketOpportunityFormValue
  onSuccess: (data: FormV2Data) => void
}

export const useSubmitMarketOpportunityForm = ({
  rawData,
  onSuccess
}: Props) => {
  const submission = useMutateCommonForm({
    applicationId: rawData?.loanApplicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_MARKET_OPPORTUNITY,
    formId: rawData?.id ?? "",
    metadata: serializeLoanMarketOpportunityFormV2(rawData),
    onSuccess
  })

  return {
    isLoading: submission.isSubmitting,
    submitLoanMarketOpportunity: (applicationId: string) =>
      submission.mutate(applicationId, FORM_TYPE.MARKET_OPPORTUNITY)
  }
}
