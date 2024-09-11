import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { ExpensePeopleResponse } from "@/modules/loan-application/[module]-financial-projection/types/people-form"
import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetExpensePeopleForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<ExpensePeopleResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_EXPENSE_PEOPLE_FORM],
    enabled,
    path: API_PATH.application.financialProjection.expensePeople.index
  })
