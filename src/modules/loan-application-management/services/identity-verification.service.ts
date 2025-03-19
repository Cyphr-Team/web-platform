import {
  type PersonaGovernmentId,
  type PersonaSelfie,
  PersonaVerificationStatus
} from "../../../lib/persona/persona.types"
import { IdentityVerificationStatus } from "../constants/types/smart-kyc"

export const getBadgeVariantByIdentityVerificationStatus = (
  status?: IdentityVerificationStatus
) => {
  const statusUppercase = status?.toUpperCase()

  switch (statusUppercase) {
    case IdentityVerificationStatus.UNVERIFIED:
      return "yellow"
    case IdentityVerificationStatus.VERIFIED:
      return "green"
    default:
      return undefined
  }
}

export const getPassedGovVerification = ({
  governmentVerifications
}: {
  governmentVerifications?: PersonaGovernmentId[]
}): PersonaGovernmentId | null => {
  if (governmentVerifications == null) return null

  const passed =
    governmentVerifications.find(
      (govVer) =>
        govVer.status?.toLowerCase() ===
        PersonaVerificationStatus.PASSED.toLowerCase()
    ) ?? null

  return passed
}

export const getPassedSelfieVerification = ({
  selfieVers: selfieVerifications
}: {
  selfieVers?: PersonaSelfie[]
}): PersonaSelfie | null => {
  if (selfieVerifications == null) return null

  const passed =
    selfieVerifications.find(
      (selfieVerification) =>
        selfieVerification.status?.toLowerCase() ===
        PersonaVerificationStatus.PASSED.toLowerCase()
    ) ?? null

  return passed
}
