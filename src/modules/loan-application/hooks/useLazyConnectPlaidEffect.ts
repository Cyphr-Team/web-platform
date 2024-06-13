import { useCallback, useEffect } from "react"
import {
  PlaidLinkError,
  PlaidLinkOnEventMetadata,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkStableEvent,
  usePlaidLink
} from "react-plaid-link"
import { usePlaidContext } from "../providers"
import { exchangePublicTokenForAccessToken } from "../services"
import { IPlaidInstitutionProviderData } from "../constants"

/**
 * TODO: Correctly handle error
 * @description listen linkToken change to start the plaid immediately
 * @link https://github.com/plaid/pattern/blob/master/client/src/components/LaunchLink.tsx
 */
export const useLazyConnectPlaidEffect = () => {
  const {
    linkSuccess,
    linkToken,
    isPaymentInitiation,
    dispatch,
    institutions
  } = usePlaidContext()

  const removeLinkToken = useCallback(() => {
    dispatch({ type: "SET_STATE", state: { linkToken: "" } })
  }, [dispatch])

  const updateAccounts = useCallback(
    (metadata: PlaidLinkOnSuccessMetadata) => {
      if (
        metadata.institution === null ||
        !metadata.institution?.institution_id
      )
        return

      const newInstituions = institutions.filter(
        (ins) => ins.institutionId !== metadata.institution?.institution_id
      )

      const newAddedInstitution: IPlaidInstitutionProviderData = {
        institutionId: metadata.institution.institution_id,
        institutionName: metadata.institution.name,
        accounts: metadata.accounts.map((account) => ({
          id: account.id,
          name: account.name,
          mask: account.mask,
          type: account.type,
          subtype: account.subtype,
          verificationStatus: account.verification_status
        }))
      }

      dispatch({
        type: "SET_STATE",
        state: { institutions: [...newInstituions, newAddedInstitution] }
      })
    },
    [dispatch, institutions]
  )

  const onSuccess = useCallback(
    async (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => {
      // If the access_token is needed, send publicToken to server
      await exchangePublicTokenForAccessToken(publicToken, dispatch)

      // 'payment_initiation' products do not require the publicToken to be exchanged for an access_token.
      if (isPaymentInitiation) {
        dispatch({ type: "SET_STATE", state: { isItemAccess: false } })
      }

      dispatch({ type: "SET_STATE", state: { linkSuccess: true } })

      updateAccounts(metadata)

      removeLinkToken()
    },
    [dispatch, isPaymentInitiation, removeLinkToken, updateAccounts]
  )

  const onExit = useCallback(
    async (error: PlaidLinkError | null) => {
      if (error != null) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkTokenError: {
              errorCode: error?.error_code,
              errorMessage: error?.error_message || error?.display_message,
              errorType: ""
            }
          }
        })
      }

      removeLinkToken()
    },
    [dispatch, removeLinkToken]
  )

  const onEvent = useCallback(
    async (
      eventName: PlaidLinkStableEvent | string,
      metadata: PlaidLinkOnEventMetadata
    ) => {
      // handle errors in the event end-user does not exit with onExit function error enabled.
      if (eventName === "ERROR" && metadata?.error_code != null) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkTokenError: {
              errorCode: metadata?.error_code,
              errorMessage: metadata?.error_message ?? "",
              errorType: metadata?.error_type ?? ""
            }
          }
        })
      }
    },
    [dispatch]
  )

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
    onEvent,
    onExit
  }

  const { open, ready } = usePlaidLink(config)

  /**
   * @description The plaid will be ready when the linkToken is available
   */
  useEffect(() => {
    if (ready) {
      open()
    }
  }, [ready, open])

  return { open, ready, linkSuccess }
}
