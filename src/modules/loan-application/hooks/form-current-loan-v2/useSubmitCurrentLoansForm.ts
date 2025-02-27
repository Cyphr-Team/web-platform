import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2.ts"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { type ICurrentLoanFormValue } from "@/modules/loan-application/constants/form.ts"

interface Props {
  rawData: ICurrentLoanFormValue
}

export function serializeLoanCurrentLoansFormV2(
  currentLoansForm?: ICurrentLoanFormValue
): Record<string, unknown> {
  return {
    id: currentLoansForm?.id,
    loanApplicationId: currentLoansForm?.loanApplicationId,
    currentLoans: currentLoansForm?.currentLoans.map((currentLoan) => ({
      ...currentLoan,
      annualInterestRate: parseFloat(currentLoan.annualInterestRate.toString()),
      loanTermRemainingInMonths: parseInt(
        currentLoan.loanTermRemainingInMonths.toString()
      )
    })),
    hasOutstandingLoans: currentLoansForm?.hasOutstandingLoans
  }
}

export const useSubmitCurrentLoansFormV2 = ({ rawData }: Props) => {
  const submission = useMutateCommonForm({
    applicationId: rawData?.loanApplicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_CURRENT_LOANS_FORM_V2,
    formId: rawData?.id ?? "",
    metadata: serializeLoanCurrentLoansFormV2(rawData)
  })

  return {
    isLoading: submission.isSubmitting,
    submitCurrentLoansForm: (applicationId: string) =>
      submission.mutate(applicationId, FORM_TYPE.CURRENT_LOAN)
  }
}
