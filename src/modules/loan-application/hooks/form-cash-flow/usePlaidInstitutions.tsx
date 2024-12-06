import { useCallback, useEffect, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import { type AxiosResponse } from "axios"

import { postRequest } from "@/services/client.service.ts"
import { API_PATH, MAX_LIMIT_PLAID } from "@/constants"
import { QUERY_KEY_PLAID } from "@/constants/query-key.ts"
import { type InstitutionResponse } from "@/lib/plaid/plaid.types.ts"

export const usePlaidInstitutions = () => {
  const [searchField, setSearchField] = useState("")

  const { data, isFetching, error } = useQuery<
    AxiosResponse<InstitutionResponse>
  >({
    queryKey: [QUERY_KEY_PLAID.lists, searchField],
    queryFn: () =>
      postRequest({
        path: API_PATH.plaid.listInstitutions,
        data: {
          paginate: { limit: MAX_LIMIT_PLAID, offset: 0 },
          filter: searchField
        }
      }),
    enabled: !!searchField,
    placeholderData: keepPreviousData
  })

  const institutions = data?.data?.data ?? []
  const totalInstitutions = data?.data?.total ?? 0

  const debouncedSearch = debounce((value: string) => {
    setSearchField(value)
  }, 300)

  const searchInstitutions = useCallback(
    (value: string) => {
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return {
    institutions,
    totalInstitutions,
    searchInstitutions,
    isLoading: isFetching,
    error,
    total: data?.data.total
  }
}
