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

export type { ResendCodeRequest, ResendCodeResponse }
