import { useMutateCommonForm } from "@/modules/loan-application/hooks/form-common/useSubmitCommonFormV2"
import { type ProductServiceFormValue } from "@/modules/loan-application/constants/form"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { serializeLoanProductServiceFormV2 } from "@/modules/loan-application/hooks/form-common/launchkc/stores/product-service-store"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface Props {
  rawData: ProductServiceFormValue
  onSuccess: (data: FormV2Data) => void
}

export const useSubmitLoanProductServiceForm = ({
  rawData,
  onSuccess
}: Props) => {
  const submission = useMutateCommonForm({
    applicationId: rawData?.loanApplicationId ?? "",
    queryKeyToInvalidates: QUERY_KEY.GET_PRODUCT_SERVICE_FORM,
    formId: rawData?.id ?? "",
    metadata: serializeLoanProductServiceFormV2(rawData),
    onSuccess
  })

  return {
    isLoading: submission.isSubmitting,
    submitProductServiceForm: (applicationId: string) =>
      submission.mutate(applicationId, FORM_TYPE.PRODUCT_SERVICE)
  }
}
