import { API_PATH } from "@/constants"
import { useQueryClient } from "@tanstack/react-query"

import { useCallback } from "react"
import {
  ExpensePeople,
  ExpensePeopleResponse
} from "@/modules/loan-application/[module]-financial-projection/types/people-form"

import { formatExpensePeopleForm } from "@/modules/loan-application/[module]-financial-projection/services/form.services"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { useCreateMutation } from "@/modules/loan-application/[module]-financial-projection/hooks"
import { PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"

type Props = {
  rawData: PeopleFormValue
  onSuccess: (data: ExpensePeopleResponse) => void
}

export const useSubmitPeopleForm = <
  T extends ExpensePeople,
  P extends ExpensePeopleResponse
>({
  rawData,
  onSuccess
}: Props) => {
  const queryClient = useQueryClient()

  const updateMutation = useCreateMutation<T, P>(
    API_PATH.application.financialProjection.expensePeople.update
  )

  const submitMutation = useCreateMutation<T, P>(
    API_PATH.application.financialProjection.expensePeople.submit
  )

  const onSubmitSuccess = useCallback(
    (data: ExpensePeopleResponse) => onSuccess(data),
    [onSuccess]
  )

  const submitPeopleForm = async (loanApplicationId: string) => {
    const mutationToUse = rawData?.id?.length ? updateMutation : submitMutation
    const formattedData = rawData && formatExpensePeopleForm(rawData)
    if (!rawData?.id?.length) {
      const result = await mutationToUse.mutateAsync({
        ...formattedData,
        financialProjectionSetupId: loanApplicationId
      } as T)
      onSubmitSuccess(result.data)
      return result
    }

    if (rawData?.id?.length) {
      const result = await mutationToUse.mutateAsync(formattedData as T)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_EXPENSE_PEOPLE_FORM]
      })
      return result
    }
  }
  return {
    isLoading: updateMutation.isPending || submitMutation.isPending,
    submitPeopleForm
  }
}
