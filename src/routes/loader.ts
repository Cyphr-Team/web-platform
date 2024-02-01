import { defer } from "react-router-dom"
import { inMemoryJWTService } from "@/services/jwt.service"

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
