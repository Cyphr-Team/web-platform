import { API_PATH } from "@/constants"
import { TOAST_MSG } from "@/constants/toastMsg"
import { postRequest } from "@/services/client.service"
import { Institution } from "@/types/institution.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { OnboardingFormValue } from "../types"
import { UserRoles } from "@/types/user.type"
import { getTenantDomain } from "@/utils/domain.utils"

export const useOnboardingInstitution = () => {
  return useMutation<
    AxiosResponse<Institution>,
    AxiosError<ErrorResponse>,
    OnboardingFormValue
  >({
    mutationFn: async (data) => {
      const institution = await postRequest<
        Pick<OnboardingFormValue, "name" | "subdomain">,
        Institution
      >({
        path: API_PATH.institution.create,
        data: { name: data.name, subdomain: data.subdomain }
      })

      await postRequest({
        path: API_PATH.institution.updateInstitutionMetadata,
        data: {
          institutionId: institution.data.id,
          logo: data.logo,
          textLogo: data.textLogo,
          supportEmail: data.supportEmail
        }
      })

      const baseUrl = getTenantDomain(institution.data.subdomain)

      await postRequest({
        path: API_PATH.admin.user.sendInvitation,
        data: {
          email: data.adminEmail,
          roles: [UserRoles.CDFI_ADMIN.toLowerCase()],
          institutionId: institution.data.id,
          baseUrl: `${baseUrl}/accept-invite`
        }
      })

      return institution
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.institution.create)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.institution.create,
        description: getAxiosError(error).message
      })
    }
  })
}
