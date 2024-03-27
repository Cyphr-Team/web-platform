import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { inMemoryJWTService } from "@/services/jwt.service"
import { isAxiosError } from "axios"
import { defer } from "react-router-dom"

/**
 * Asynchronous function to load user data.
 * It retrieves a new access token using inMemoryJWTService,
 * encapsulates it in a promise, and returns it wrapped in a defer object.
 *
 * @returns An object containing a promise for user data.
 */
export const userLoader = async () => {
  const userPromise = inMemoryJWTService.getNewAccessToken()
  return defer({ userPromise })
}

export const institutionLoader = async () => {
  try {
    // Attempt to fetch institution metadata using an HTTP request
    const institution = await getRequest({
      path: API_PATH.institution.getInstitutionMetadata
    })

    return institution
  } catch (error) {
    console.error(error)

    if (isAxiosError(error)) {
      // To prevent large area affected, we only throw with 404 issue
      if (error.response?.status === 404)
        throw new Error("Institution Not found")
    }
  }
}
