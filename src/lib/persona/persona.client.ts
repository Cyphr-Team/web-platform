import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { type SmartKyc } from "./persona.types"
import { type CreatePersonaInquiryRequest } from "@/types/kyc/request/CreatePersonaInquiryRequest"
import { toastError } from "../../utils"
import { TOAST_MSG } from "../../constants/toastMsg"
import { getAxiosError } from "../../utils/custom-error"

const PERSONA_ENDPOINTS = {
  all: "api/form/smart-kyc",
  createSmartKyc: () => PERSONA_ENDPOINTS.all,
  getSmartKyc: () => `${PERSONA_ENDPOINTS.all}/inquiry`
}

const useCreateSmartKyc = () => {
  return useMutation({
    mutationFn: (request: CreatePersonaInquiryRequest) => {
      return postRequest<typeof request, SmartKyc>({
        path: PERSONA_ENDPOINTS.createSmartKyc(),
        data: request
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.identityVerification.createFailed,
        description: getAxiosError(error).message
      })
    }
  })
}

export { PERSONA_ENDPOINTS, useCreateSmartKyc }
