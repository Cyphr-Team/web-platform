import { useCallback, useEffect } from "react"
import {
  type PlaidLinkError,
  type PlaidLinkOnEventMetadata,
  type PlaidLinkOnSuccessMetadata,
  type PlaidLinkStableEvent,
  usePlaidLink
} from "react-plaid-link"
import { usePlaidContext } from "../../providers"
import { exchangePublicTokenForAccessToken } from "../../services"
import { type PlaidInstitutionProviderData } from "../../constants"
import { ErrorCode } from "@/utils/custom-error.ts"
import { useParams } from "react-router-dom"
import { useLinkPlaidItemId } from "@/modules/loan-application/hooks/form-cash-flow/useLinkPlaidItemId.ts"

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

  const { id: applicationId } = useParams()
  const { mutateAsync: mutateLinkPlaidItem } = useLinkPlaidItemId()

  const removeLinkToken = useCallback(() => {
    dispatch({ type: "SET_STATE", state: { linkToken: "" } })
  }, [dispatch])

  const updateAccounts = useCallback(
    (metadata: PlaidLinkOnSuccessMetadata) => {
      if (!metadata.institution?.institution_id) return

      const newInstitutions = institutions.filter(
        (ins) => ins.institutionId !== metadata.institution?.institution_id
      )

      const newAddedInstitution: PlaidInstitutionProviderData = {
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
        state: { institutions: [...newInstitutions, newAddedInstitution] }
      })
    },
    [dispatch, institutions]
  )

  const onSuccess = useCallback(
    async (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => {
      // If the institution is linked before, send error
      if (metadata?.institution?.institution_id) {
        const isLinked = institutions.some(
          (ins) => ins.institutionId === metadata.institution?.institution_id
        )

        if (isLinked) {
          dispatch({
            type: "SET_STATE",
            state: {
              isConnecting: false,
              linkTokenError: {
                errorCode: ErrorCode.bank_already_linked,
                errorMessage: `${metadata.institution.name} is already connected`,
                errorType: ErrorCode.bank_already_linked
              }
            }
          })
          removeLinkToken()

          return
        }
      }
      // If the access_token is needed, send publicToken to server
      try {
        const exchangedResponse = await exchangePublicTokenForAccessToken(
          publicToken,
          dispatch,
          metadata?.institution?.institution_id
        )

        // 'payment_initiation' products do not require the publicToken to be exchanged for an access_token.
        if (isPaymentInitiation) {
          dispatch({ type: "SET_STATE", state: { isItemAccess: false } })
        }

        dispatch({
          type: "SET_STATE",
          state: { linkSuccess: true, isConnecting: false }
        })

        updateAccounts(metadata)

        if (applicationId) {
          await mutateLinkPlaidItem({
            itemId: exchangedResponse.itemId,
            applicationId: applicationId
          })
        }
      } catch {
        // Set access token failed because some Plaid's product is not supported by the selected institution
        dispatch({
          type: "SET_STATE",
          state: {
            isConnecting: false,
            linkTokenError: {
              errorCode: ErrorCode.bank_not_supported,
              errorMessage: `Institution is not supported`,
              errorType: ErrorCode.bank_not_supported
            }
          }
        })
      } finally {
        removeLinkToken()
      }
    },
    [
      applicationId,
      dispatch,
      institutions,
      isPaymentInitiation,
      mutateLinkPlaidItem,
      removeLinkToken,
      updateAccounts
    ]
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

      dispatch({
        type: "SET_STATE",
        state: {
          isConnecting: false
        }
      })
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
      dispatch({
        type: "SET_STATE",
        state: { isConnecting: true }
      })
      open()
    }
  }, [ready, open, dispatch])

  return { open, ready, linkSuccess }
}
