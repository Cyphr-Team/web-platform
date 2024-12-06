import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { type PlaidConnectedBankAccountsByApplicationIdGetResponse } from "@/types/plaid/response/PlaidConnectedBankAccountsByApplicationIdGetResponse.ts"
import { skipToken, useQuery, type UseQueryResult } from "@tanstack/react-query"
import { type AxiosResponse } from "axios"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { isEnablePlaidV2 } from "@/utils/feature-flag.utils.ts"
import _ from "lodash"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { type PlaidInstitutionProviderData } from "@/modules/loan-application/constants"

interface FetchPlaidConnectedBankAccountsRequest {
  applicationId: string | undefined
}

interface UseGetPlaidConnectedBankAccountsProps<T> {
  request: FetchPlaidConnectedBankAccountsRequest
  selectFn?: (
    data: AxiosResponse<PlaidConnectedBankAccountsByApplicationIdGetResponse>
  ) => T
  options?: {
    enabled?: boolean
  }
}

function fetchPlaidConnectedBankAccounts(
  request: FetchPlaidConnectedBankAccountsRequest
): Promise<
  AxiosResponse<PlaidConnectedBankAccountsByApplicationIdGetResponse>
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
  institutions: PlaidInstitutionProviderData[]
): LoanApplicationBankAccount[] {
  const bankAccounts: LoanApplicationBankAccount[] = institutions.flatMap(
    (institution) =>
      (institution?.accounts ?? [])?.map((account) => ({
        institutionName: institution.institutionName,
        bankAccountPk: account.id,
        bankAccountName: account.name,
        mask: account?.mask,
        connectedOn:
          account.connectedOn || format(new Date(), FORMAT_DATE_MM_DD_YYYY)
      }))
  )

  return bankAccounts.sort(
    (a, b) =>
      (a?.institutionName ?? "")?.localeCompare(b?.institutionName ?? "")
  )
}

export function transformToInstitutions(
  data: PlaidConnectedBankAccountsByApplicationIdGetResponse
): PlaidInstitutionProviderData[] {
  const connectedBankAccountsGroup = _.groupBy(
    data.institutions,
    "institutionId"
  )

  return Object.entries(connectedBankAccountsGroup).map(
    ([insId, connectedBankAccounts]) => ({
      institutionId: insId,
      institutionName: connectedBankAccounts[0].institutionName,
      itemId: connectedBankAccounts[0].itemId,
      accounts: connectedBankAccounts.flatMap(({ accounts }) => accounts ?? [])
    })
  )
}

export function useGetPlaidConnectedBankAccountsResponse<T>({
  request,
  selectFn,
  options
}: UseGetPlaidConnectedBankAccountsProps<T>): UseQueryResult<T> {
  return useQuery({
    queryKey: [
      QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID,
      request.applicationId
    ],
    queryFn: request.applicationId
      ? () => fetchPlaidConnectedBankAccounts(request)
      : skipToken,
    select: selectFn,
    enabled: options?.enabled ?? true
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

export function useGetPlaidConnectedInstitutions({
  request,
  options
}: UseGetPlaidConnectedBankAccountsProps<PlaidInstitutionProviderData[]>) {
  return useGetPlaidConnectedBankAccountsResponse<
    PlaidInstitutionProviderData[]
  >({
    request,
    selectFn: (data) => {
      return transformToInstitutions(data?.data)
    },
    options
  })
}
