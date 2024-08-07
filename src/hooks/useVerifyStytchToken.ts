import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"

/**
 *
 * Check if Stytch token is valid
 */
export const useVerifyStytchToken = (): boolean => {
  const stytchClient = useStytchB2BClient()
  return stytchClient.session.getTokens() != null
}
