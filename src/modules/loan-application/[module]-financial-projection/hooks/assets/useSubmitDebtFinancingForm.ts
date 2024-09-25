import { API_PATH } from "@/constants"
import {
  DebtFinancingField,
  DebtFinancingFormValue,
  EMPTY_DEBT_FINANCING_ITEM
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  DebtFinancingLiabilityMutateRequest,
  DebtFinancingLiabilityResponse,
  DebtFinancingMutateRequest,
  DebtFinancingResponse
} from "@/modules/loan-application/[module]-financial-projection/types/debt-financing"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type Props = {
  rawData: DebtFinancingFormValue
}

export const useSubmitDebtFinancingForm = <
  T extends DebtFinancingMutateRequest,
  P extends DebtFinancingResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.debtFinancing.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.debtFinancing.submit
  )

  const submitDebtFinancing = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.debtFinancingId?.length
      ? updateMutation
      : submitMutation

    const isHasOutstandingLoans =
      rawData?.hasOutstandingLoans === BINARY_VALUES.YES

    const formattedLoanForms = isHasOutstandingLoans
      ? rawData?.debtFinancing
      : []

    const formattedData = rawData?.debtFinancingId?.length
      ? {
          financialProjectionSetupId: loanApplicationId,
          commonForm: {
            id: rawData.debtFinancingId,
            startingPaidInCapital: rawData?.startingPaidInCapital
          },
          loanForms: formattedLoanForms
        }
      : ({
          financialProjectionSetupId: loanApplicationId,
          startingPaidInCapital: rawData?.startingPaidInCapital,
          forms: formattedLoanForms
        } as T)

    const result = await mutationToUse.mutateAsync(formattedData as T)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_FP_DEBT_FINANCING_FORM]
    })
    return result
  }
  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitDebtFinancing
  }
}

export const useSubmitDebtFinancingLiabilityForm = <
  T extends DebtFinancingLiabilityMutateRequest,
  P extends DebtFinancingLiabilityResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.liability.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.financialProjection.liability.submit
  )

  const subDebtFinancingLiability = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.liabilityId?.length
      ? updateMutation
      : submitMutation

    const formattedData = {
      financialProjectionSetupId: loanApplicationId,
      payableDays: rawData.payableDays
    } as T

    const result = await mutationToUse.mutateAsync(formattedData as T)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_FP_DEBT_FINANCING_LIABILITY_FORM]
    })
    return result
  }
  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: subDebtFinancingLiability
  }
}

/**
 * Reverse data from server to match Debt Financing Form value
 */
interface ReverseFormatDebtFinancingFormProps {
  debtFinancingResponse: DebtFinancingResponse | undefined
  debtFinancingLiabilityResponse: DebtFinancingLiabilityResponse | undefined
}
export const reverseFormatDebtFinancingForm = ({
  debtFinancingResponse,
  debtFinancingLiabilityResponse
}: ReverseFormatDebtFinancingFormProps): DebtFinancingFormValue => {
  const isHasOutstandingLoans =
    debtFinancingResponse?.loanForms &&
    debtFinancingResponse?.loanForms?.length > 0

  return {
    [DebtFinancingField.APPLICATION_ID]:
      debtFinancingResponse?.financialProjectionSetupId ??
      debtFinancingLiabilityResponse?.financialProjectionSetupId,
    [DebtFinancingField.LIABILITY_ID]: debtFinancingLiabilityResponse?.id,
    [DebtFinancingField.DEBT_FINANCING_ID]:
      debtFinancingResponse?.commonForm?.id,

    [DebtFinancingField.PAYABLE_DAYS]: (
      debtFinancingLiabilityResponse?.payableDays ?? ""
    )?.toString(),

    [DebtFinancingField.STARTING_PAID_IN_CAPITAL]:
      debtFinancingResponse?.commonForm?.startingPaidInCapital ?? 0,
    [DebtFinancingField.HAS_OUTSTANDING_LOANS]: isHasOutstandingLoans
      ? BINARY_VALUES.YES
      : BINARY_VALUES.NO,
    [DebtFinancingField.DEBT_FINANCING]: isHasOutstandingLoans
      ? debtFinancingResponse?.loanForms
      : [EMPTY_DEBT_FINANCING_ITEM]
  }
}
