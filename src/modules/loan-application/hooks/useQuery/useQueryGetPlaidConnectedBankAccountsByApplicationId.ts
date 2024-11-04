import { API_PATH } from "@/constants"

import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import {
  type IPlaidConnectedBankAccountsByApplicationIdGetResponse,
  type IPlaidConnectedBankAccountsInstitution
} from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse"
import { skipToken, useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { type FormDetailsQueryProps } from "."
import { isEnablePlaidV2 } from "@/utils/feature-flag.utils"
import _ from "lodash"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { format } from "date-fns"

export const useQueryGetPlaidConnectedBankAccountsByApplicationId = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) => {
  return useQuery<
    AxiosResponse<IPlaidConnectedBankAccountsByApplicationIdGetResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID,
      applicationId
    ],
    queryFn: () => {
      return postRequest({
        path: isEnablePlaidV2()
          ? API_PATH.application.getPlaidConnectedBankAccountsByApplicationIdV2
          : API_PATH.application.getPlaidConnectedBankAccountsByApplicationId,
        data: { applicationId: applicationId }
      })
    },
    enabled: enabled && !!applicationId
  })
}

interface FetchPlaidConnectedBankAccountsRequest {
  applicationId: string | undefined
}

interface UseGetPlaidConnectedBankAccountsProps<T> {
  request: FetchPlaidConnectedBankAccountsRequest
  selectFn?: (
    data: AxiosResponse<IPlaidConnectedBankAccountsByApplicationIdGetResponse>
  ) => T
}

function fetchPlaidConnectedBankAccounts(
  request: FetchPlaidConnectedBankAccountsRequest
): Promise<
  AxiosResponse<IPlaidConnectedBankAccountsByApplicationIdGetResponse>
> {
  const { applicationId } = request

  return postRequest({
    path: isEnablePlaidV2()
      ? API_PATH.application.getPlaidConnectedBankAccountsByApplicationIdV2
      : API_PATH.application.getPlaidConnectedBankAccountsByApplicationId,
    data: { applicationId }
  })
}

export function transformToConnectedAccounts(
  institutions: IPlaidConnectedBankAccountsInstitution[]
): LoanApplicationBankAccount[] {
  return institutions
    .flatMap((institution) =>
      institution.accounts.map((account) => ({
        institutionName: institution.institutionName,
        bankAccountPk: account.id,
        bankAccountName: account.name,
        connectedOn:
          account.connectedOn || format(new Date(), FORMAT_DATE_MM_DD_YYYY)
      }))
    )
    .sort((a, b) => a.institutionName.localeCompare(b.institutionName))
}

export function transformToInstitutions(
  data: IPlaidConnectedBankAccountsByApplicationIdGetResponse
): IPlaidConnectedBankAccountsInstitution[] {
  const connectedBankAccountsGroup = _.groupBy(
    data.institutions,
    "institutionId"
  )

  return Object.entries(connectedBankAccountsGroup).map(
    ([insId, connectedBankAccounts]) => ({
      institutionId: insId,
      institutionName: connectedBankAccounts[0].institutionName,
      itemId: connectedBankAccounts[0].itemId,
      accounts: connectedBankAccounts.flatMap(({ accounts }) => accounts)
    })
  )
}

export function useGetPlaidConnectedBankAccountsResponse<T>({
  request,
  selectFn
}: UseGetPlaidConnectedBankAccountsProps<T>) {
  return useQuery({
    queryKey: [
      QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID,
      request
    ],
    queryFn: request.applicationId
      ? () => fetchPlaidConnectedBankAccounts(request)
      : skipToken,
    select: selectFn
  })
}

export function useGetPlaidConnectedBankAccounts({
  request
}: UseGetPlaidConnectedBankAccountsProps<LoanApplicationBankAccount[]>) {
  return useGetPlaidConnectedBankAccountsResponse<LoanApplicationBankAccount[]>(
    {
      request,
      selectFn: (data) => {
        const institutions = transformToInstitutions(data?.data)

        return transformToConnectedAccounts(institutions)
      }
    }
  )
}
