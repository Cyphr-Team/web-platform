import { API_PATH } from "@/constants"
import { PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { SubmissionHook } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { formatExpensePeopleForm } from "@/modules/loan-application/[module]-financial-projection/services/form.services"
import {
  ExpensePeople,
  ExpensePeopleResponse
} from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type Props = {
  rawData: PeopleFormValue
}

export const useSubmitPeopleForm = <
  T extends ExpensePeople,
  P extends ExpensePeopleResponse
>({
  rawData
}: Props): SubmissionHook<P> => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.application.financialProjection.expensePeople.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.application.financialProjection.expensePeople.submit
  )

  const submitPeopleForm = async (
    loanApplicationId: string
  ): Promise<AxiosResponse<P>> => {
    const mutationToUse = rawData?.id?.length ? updateMutation : submitMutation
    const formattedData = rawData && formatExpensePeopleForm(rawData)
    if (!rawData?.id?.length) {
      const result = await mutationToUse.mutateAsync({
        ...formattedData,
        financialProjectionSetupId: loanApplicationId
      } as T)
      return result
    }

    const result = await mutationToUse.mutateAsync(formattedData as T)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_EXPENSE_PEOPLE_FORM]
    })
    return result
  }
  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitForm: submitPeopleForm
  }
}
