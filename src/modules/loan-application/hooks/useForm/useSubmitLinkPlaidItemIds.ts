import { useQueryClient } from "@tanstack/react-query"
import { useLinkPlaidItemId } from "../useMutation/useLinkPlaidItemId"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitLinkPlaidItemIds = (plaidItemIds: string[]) => {
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
    )
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.GET_PLAID_ITEM_IDS, loanApplicationId]
    })
  }

  return {
    isLoading: isPending,
    submitLinkPlaidItemds
  }
}
