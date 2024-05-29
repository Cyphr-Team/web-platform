import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { SmartKyc } from "./persona.types"
import { CreatePersonaInquiryRequest } from "@/types/kyc/request/CreatePersonaInquiryRequest"

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
    }
  })
}

export { PERSONA_ENDPOINTS, useCreateSmartKyc }
