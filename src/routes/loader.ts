import { defer } from "react-router-dom"
import { inMemoryJWTService } from "@/services/jwt.service"

export const userLoader = async () => {
  const userPromise = inMemoryJWTService.getNewAccessToken()
  return defer({ userPromise })
}
