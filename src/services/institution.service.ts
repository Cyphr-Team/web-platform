import { API_PATH } from "@/constants"
import { TInstitutionResponse } from "@/types/institution.type"
import { getRequest } from "./client.service"

export const institutionManager = () => {
  let institution: TInstitutionResponse["data"]

  const getInstitution = (): TInstitutionResponse["data"] => {
    return institution
  }

  const setInstitution = (institutionResult: TInstitutionResponse["data"]) => {
    institution = institutionResult
  }

  const fetchInstitution = (): Promise<TInstitutionResponse> => {
    return getRequest<unknown, TInstitutionResponse>({
      path: API_PATH.institution.getInstitutionMetadata
    })
  }

  const handleFetchInstitution = async (): Promise<
    TInstitutionResponse["data"]
  > => {
    // Attempt to fetch institution metadata using an HTTP request
    const institutionResponse = await fetchInstitution()

    setInstitution(institutionResponse.data)

    return institutionResponse.data
  }

  return {
    getInstitution,
    handleFetchInstitution
  }
}

export const institutionService = institutionManager()
