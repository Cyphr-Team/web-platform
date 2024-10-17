import { useCallback, useEffect } from "react"
import { usePlaidContext } from "../providers"
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link"
import { useLocation } from "react-router-dom"
import { exchangePublicTokenForAccessToken, generateToken } from "../services"

export const useConnectPlaid = () => {
  const { linkSuccess, linkToken, isPaymentInitiation, dispatch } =
    usePlaidContext()

  const currentLocation = useLocation()
  const currentPathName = currentLocation.pathname

  const onSuccess = useCallback(
    (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      // If the access_token is needed, send public_token to server
      exchangePublicTokenForAccessToken(
        public_token,
        dispatch,
        metadata?.institution?.institution_id
      )

      // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
      if (isPaymentInitiation) {
        dispatch({ type: "SET_STATE", state: { isItemAccess: false } })
      }

      // set linkSuccess to true and trigger the redirect
      dispatch({ type: "SET_STATE", state: { linkSuccess: true } })
      window.history.pushState("", "", currentPathName)
    },
    [dispatch, isPaymentInitiation, currentPathName]
  )

  let isOauth = false
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess
  }

  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href
    isOauth = true
  }

  const { open, ready } = usePlaidLink(config)

  useEffect(() => {
    if (isOauth && ready) {
      open()
    }
  }, [ready, open, isOauth])

  useEffect(() => {
    const init = async () => {
      // used to determine which path to take when generating token
      // do not generate a new token for OAuth redirect;
      //  instead setLinkToken from localStorage
      if (window.location.href.includes("?oauth_state_id=")) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkToken: localStorage.getItem("link_token")
          }
        })
        return
      }
      generateToken(dispatch)
    }
    init()
  }, [dispatch])

  return { open, ready, linkSuccess }
}
