import { APP_CONFIGS } from "@/configs"
import { toastError } from "@/utils"
import { Client } from "persona"
import { useCallback, useRef, useState } from "react"
import { useCreateSmartKyc } from "./persona.client"

export const usePersona = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const personaClientRef = useRef<Client | null>()

  const createSmartKyc = useCreateSmartKyc()

  const storePersonaClient = useCallback(
    (referenceId: string, inquiryId: string) => {
      personaClientRef.current = new Client({
        environment: APP_CONFIGS.VITE_PERSONA_ENVIRONMENT,
        inquiryId,
        referenceId,
        onComplete: () => {
          setIsCompleted(true)
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
        description: "Something when wrongs"
      })
    }
  }, [createSmartKyc, storePersonaClient])

  return { handleOpenPersona, isOpening: createSmartKyc.isPending, isCompleted }
}
