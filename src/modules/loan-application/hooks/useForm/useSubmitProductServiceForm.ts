import { ProductServiceFormValue } from "../../constants/form"
import { useSubmitProductServiceForm } from "../useMutation/useSubmitProductServiceForm"
import { useUpdateProductServiceForm } from "../useMutation/useUpdateProductServiceForm"

export const useSubmitLoanProductServiceForm = (
  rawData: ProductServiceFormValue
) => {
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateProductServiceForm()

  const { mutateAsync: submit, isPending: isSubmitting } =
    useSubmitProductServiceForm()
  // Call API
  const submitProductServiceForm = async () => {
    if (rawData?.id?.length) {
      await update({ ...rawData })
    } else {
      await submit({
        ...rawData
      })
    }
  }
  return {
    isLoading: isUpdating || isSubmitting,
    submitProductServiceForm
  }
}
