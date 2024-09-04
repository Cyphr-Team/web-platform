import { useCallback } from "react"
import { useStytchB2BClient } from "@stytch/nextjs/dist/b2b"
import { APP_PATH } from "@/constants"
import { useTenant } from "@/providers/tenant-provider"
import { useMutation } from "@tanstack/react-query"

export const useLoginWithGoogleMFA = () => {
  const tenant = useTenant()
  const stytchClient = useStytchB2BClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!stytchClient) throw new Error("Stytch Client is not available")

      return stytchClient.oauth.google.start({
        organization_id:
          tenant.tenantData?.customFieldsOnDemand?.stytchOrganizationId ?? "",
        login_redirect_url: `${window.location.origin}${APP_PATH.REDIRECT_CALLBACK}`,
        signup_redirect_url: `${window.location.origin}${APP_PATH.REDIRECT_CALLBACK}`
      })
    }
  })

  const signInWithGoogle = useCallback(async () => {
    mutate()
  }, [mutate])

  return { signInWithGoogle, isLoading: isPending }
}
