import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { SmartKyc } from "./persona.types"

const PERSONA_ENDPOINTS = {
  all: "api/form/smart-kyc",
  createSmartKyc: () => PERSONA_ENDPOINTS.all,
  getSmartKyc: () => `${PERSONA_ENDPOINTS.all}/inquiry`
}

const useCreateSmartKyc = () => {
  return useMutation({
    mutationFn: () => {
      return postRequest<unknown, SmartKyc>({
        path: PERSONA_ENDPOINTS.createSmartKyc()
      })
    }
  })
}

export { PERSONA_ENDPOINTS, useCreateSmartKyc }
