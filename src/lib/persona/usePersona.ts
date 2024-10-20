import { APP_CONFIGS } from "@/configs"
import { toastError } from "@/utils"
import { Client } from "persona"
import { useCallback, useEffect, useRef, useState } from "react"
import { useCreateSmartKyc } from "./persona.client"
import { type CreatePersonaInquiryRequest } from "@/types/kyc/request/CreatePersonaInquiryRequest"
import { EPersonaStatus } from "../../types/kyc"

interface IPersonaInquiryData {
  inquiryId: string
  status: string
  fields: unknown
}

interface IUsePersona {
  applicationId?: string
}

export const usePersona = ({ applicationId }: IUsePersona) => {
  const [inquiryData, setInquiryData] = useState<IPersonaInquiryData>()

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
          setInquiryData(inquiryData)
        },
        onCancel: ({ inquiryId }: { inquiryId?: string }) => {
          if (inquiryId != undefined) {
            setInquiryData({
              inquiryId: inquiryId,
              status: EPersonaStatus.UNKNOWN.toLowerCase(),
              fields: null
            })
          }
        },
        onError: (error) => {
          throw new Error(error.message)
          // console.error("Client got error", error)
        }
      })

      return personaClientRef.current
    },
    []
  )

  const handleOpenPersona = useCallback(async () => {
    /**
     * If we have one, no need to request more from server.
     * By keeping the credential for the current render.
     * When the client cancel and start again.
     */
    const createPersonaInquiryRequest: CreatePersonaInquiryRequest = {
      applicationId
    }
    const createResponse = await createSmartKyc.mutateAsync(
      createPersonaInquiryRequest
    )

    try {
      if (personaClientRef.current) {
        personaClientRef.current.open()

        return
      }

      const smartKyc = createResponse.data

      const personaClient = storePersonaClient(
        smartKyc.referenceId,
        smartKyc.inquiryId,
        smartKyc?.sessionToken
      )

      personaClient.open()
    } catch (e) {
      // console.error(e)
      // Open Persona client failed
      toastError({
        title: "Persona",
        description: "Something went wrong"
      })
    }
  }, [applicationId, createSmartKyc, storePersonaClient])

  useEffect(() => {
    return () => {
      personaClientRef.current?.destroy()
    }
  }, [])

  return {
    handleOpenPersona,
    isOpening: createSmartKyc.isPending,
    inquiryData: inquiryData,
    isCompleted: !!inquiryData
  }
}
