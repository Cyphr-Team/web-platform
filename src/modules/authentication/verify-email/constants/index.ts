import * as z from "zod"
import { CheckCircle2, Mail } from "lucide-react"

export const verifyEmailFormSchema = z.object({
  codes: z.array(z.string().min(1, "Code is required"))
})

export type VerifyEmailFormSchema = z.infer<typeof verifyEmailFormSchema>

export const UI_DATA_VERIFY_EMAIL_HEADER = {
  sent: {
    HeaderIcon: Mail,
    title: "Verifying link",
    description: "We sent a verification link to"
  },
  verified: {
    HeaderIcon: CheckCircle2,
    title: "Already Verified",
    description: (email?: string) =>
      `This email address ${email} has already been verified. Click the button below to continue your sign up process.`
  },
  signedUp: {
    verifying: {
      HeaderIcon: CheckCircle2,
      title: "Already Signed Up",
      description: (email?: string) =>
        `This email address ${email} already has an account associated with it. Click the button below to go to the log in page.`
    }
  }
}
