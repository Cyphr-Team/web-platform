import { CurrentLoansFormValue } from "../../constants/form"

export const useSubmitCurrentLoansForm = (
  rawData: CurrentLoansFormValue,
  formId: string
) => {
  // Call API
  console.log(rawData, formId)

  return {
    isLoading: false,
    form: null
  }
}
