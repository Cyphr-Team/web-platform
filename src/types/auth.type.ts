// ENUM
enum SocialProvider {
  GOOGLE = "GOOGLE",
  APPLE = "APPLE"
}

export { SocialProvider }

// INTERFACE
// --- RESEND CODE ---
interface ResendCodeRequest {
  email: string
}
interface ResendCodeResponse {
  email: string
}

// -- STYTCH AUTH TYPES --
interface StytchMember {
  organizationId: string
  memberId: string
  mfaEnrolled: boolean
  mfaPhoneNumber: string
  mfaPhoneNumberVerified: boolean
}

interface StytchOrganization {
  organizationId: string
  organizationName: string
  organizationSlug: string
  mfaMethods: string
}

interface StytchPasswordAuthenticateResponse {
  requestId: string
  member: StytchMember
  intermediateSessionToken: string
}

interface StytchSendOtpResponse {
  requestId: string
  memberId: string
}

interface StytchAuthOtpResponse {
  requestId: string
  memberId: string
  sessionToken: string
  sessionJwt: string
}

export type {
  ResendCodeRequest,
  ResendCodeResponse,
  StytchMember,
  StytchOrganization,
  StytchSendOtpResponse,
  StytchAuthOtpResponse,
  StytchPasswordAuthenticateResponse
}
