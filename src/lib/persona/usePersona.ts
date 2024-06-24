import { APP_CONFIGS } from "@/configs"
import { toastError } from "@/utils"
import { Client } from "persona"
import { useCallback, useRef, useState } from "react"
import { useCreateSmartKyc } from "./persona.client"
import { CreatePersonaInquiryRequest } from "@/types/kyc/request/CreatePersonaInquiryRequest"

interface IPersonaInquiryData {
  inquiryId: string
  status: string
  fields: unknown
}

interface IUsePersona {
  applicationId?: string
}

export const usePersona = ({ applicationId }: IUsePersona) => {
  const [completeData, setCompleteData] = useState<IPersonaInquiryData>()

  const personaClientRef = useRef<Client | null>()

  const createSmartKyc = useCreateSmartKyc()

  const storePersonaClient = useCallback(
    (referenceId: string, inquiryId: string, sessionToken?: string) => {
      personaClientRef.current = new Client({
        environment: APP_CONFIGS.VITE_PERSONA_ENVIRONMENT,
        inquiryId,
        referenceId,
        sessionToken,
        onComplete: (inquiryData) => {
          setCompleteData(inquiryData)
        },
        onError: (error) => {
          console.error("Client got error", error)
        }
      })

      return personaClientRef.current
    },
    []
  )

  const handleOpenPersona = useCallback(async () => {
    try {
      /**
       * If we have one, no need to request more from server.
       * By keeping the credential for the current render.
       * When the client cancel and start again.
       */
      if (personaClientRef.current) {
        personaClientRef.current.open()
        return
      }

      const createPersonaInquiryRequest: CreatePersonaInquiryRequest = {
        applicationId
      }
      const createResponse = await createSmartKyc.mutateAsync(
        createPersonaInquiryRequest
      )
      const smartKyc = createResponse.data

      const personaClient = storePersonaClient(
        smartKyc.referenceId,
        smartKyc.inquiryId,
        smartKyc?.sessionToken
      )

      personaClient.open()
    } catch (e) {
      console.error(e)
      toastError({
        title: "Persona",
        description: "Something went wrong"
      })
    }
  }, [applicationId, createSmartKyc, storePersonaClient])

  return {
    handleOpenPersona,
    isOpening: createSmartKyc.isPending,
    completeData: completeData,
    isCompleted: !!completeData
  }
}
