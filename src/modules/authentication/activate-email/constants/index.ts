import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { BadgeAlert, CheckCircle2, Loader2 } from "lucide-react"

export const UI_DATA_ACTIVATE_EMAIL_HEADER = {
  verifying: {
    HeaderIcon: Loader2,
    title: "Verifying link",
    description:
      "Please wait for a while. Our app is handling your verification link."
  },
  verified: {
    HeaderIcon: CheckCircle2,
    title: "Already Verified",
    description: `The email has already been verified. Please check your email for instructions on setting up your profile.`
  },
  signedUp: {
    HeaderIcon: CheckCircle2,
    title: "Already Signed Up",
    description: `The email already has an account associated with it. Click the button below to go to the log in page.`
  },
  expired: {
    HeaderIcon: BadgeAlert,
    title: "Link expired",
    description:
      "No worries. It’s easy to get a new one. Please click the button below to receive a new email verification link sent to your email address."
  },
  success: {
    HeaderIcon: CheckCircle2,
    title: "Successfully verified email",
    description: "You will be navigated to setup profile page."
  },
  registered: {
    HeaderIcon: BadgeAlert,
    title: "Already Verified",
    description: getCustomErrorMsgByCode(ErrorCode.user_registered)
  }
}
