import { useQueryClient } from "@tanstack/react-query"
import { useLinkPlaidItemId } from "./useLinkPlaidItemId.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"

interface Props {
  plaidItemIds: string[]
  onSuccess: (plaidItemIds: string[]) => void
}

export const useSubmitLinkPlaidItemIds = ({
  plaidItemIds,
  onSuccess
}: Props) => {
  const { mutateAsync, isPending } = useLinkPlaidItemId()

  const queryClient = useQueryClient()

  const submitLinkPlaidItemds = async (loanApplicationId: string) => {
    await Promise.all(
      plaidItemIds.map((itemId) =>
        mutateAsync({
          applicationId: loanApplicationId,
          itemId
        })
      )
    ).then((responses) => {
      const isSuccess = responses.every((response) => response.status === 200)

      if (isSuccess) {
        onSuccess(plaidItemIds)
      }
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_PLAID_ITEM_IDS, loanApplicationId]
    })
    queryClient.invalidateQueries({
      queryKey: [
        QUERY_KEY.GET_PLAID_CONNECTED_BANK_ACCOUNTS_BY_APPLICATION_ID,
        loanApplicationId
      ]
    })
  }

  return {
    isLoading: isPending,
    submitLinkPlaidItemds
  }
}
