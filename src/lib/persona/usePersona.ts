import { APP_CONFIGS } from "@/configs"
import { toastError } from "@/utils"
import { Client } from "persona"
import { useCallback, useRef, useState } from "react"
import { useCreateSmartKyc } from "./persona.client"

interface IPersonaInquiryData {
  inquiryId: string
  status: string
  fields: unknown
}

export const usePersona = () => {
  const [completeData, setCompleteData] = useState<IPersonaInquiryData>()

  const personaClientRef = useRef<Client | null>()

  const createSmartKyc = useCreateSmartKyc()

  const storePersonaClient = useCallback(
    (referenceId: string, inquiryId: string) => {
      personaClientRef.current = new Client({
        environment: APP_CONFIGS.VITE_PERSONA_ENVIRONMENT,
        inquiryId,
        referenceId,
        onComplete: (inquiryData) => {
          setCompleteData(inquiryData)
        },
        onCancel: () => {
          console.warn("Client cancels persona")
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
      const createResponse = await createSmartKyc.mutateAsync()
      const smartKyc = createResponse.data

      const personaClient = storePersonaClient(
        smartKyc.referenceId,
        smartKyc.inquiryId
      )

      personaClient.open()
    } catch (e) {
      console.error(e)
      toastError({
        title: "Persona",
        description: "Something when wrong"
      })
    }
  }, [createSmartKyc, storePersonaClient])

  return {
    handleOpenPersona,
    isOpening: createSmartKyc.isPending,
    completeData: completeData,
    isCompleted: !!completeData
  }
}
