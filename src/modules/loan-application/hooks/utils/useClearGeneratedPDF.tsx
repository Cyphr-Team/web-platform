import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { useCallback } from "react"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"

export const useClearGeneratedPDF = () => {
  const { eSignForm, dispatchFormAction } = useLoanApplicationFormContext()
  const { removeCompleteSpecificStep } = useLoanApplicationProgressContext()

  return useCallback(() => {
    // Remove document after the user edit loan application data
    removeCompleteSpecificStep(LOAN_APPLICATION_STEPS.REVIEW_APPLICATION)

    if (eSignForm?.documentId) {
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        state: { documentId: "", sessionId: "" },
        key: LOAN_APPLICATION_STEPS.E_SIGN
      })
    }
  }, [dispatchFormAction, eSignForm?.documentId, removeCompleteSpecificStep])
}
