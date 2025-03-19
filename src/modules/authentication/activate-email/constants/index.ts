import {
  BadgeAlert,
  CheckCircle2,
  Loader2,
  ShieldCloseIcon
} from "lucide-react"

export const UI_DATA_ACTIVATE_EMAIL_HEADER = {
  verifying: {
    HeaderIcon: Loader2,
    title: "Verifying link",
    description:
      "Please wait for a while. Our app is handling your verification link."
  },
  verified: (email: string) => ({
    HeaderIcon: CheckCircle2,
    title: "Already Verified",
    description: `It seems like this email address ${email} has already been verified. Click the button below to continue your sign up process.`
  }),
  successSendingSetupProfileEmail: {
    HeaderIcon: CheckCircle2,
    title: "Finish Setup Profile",
    description: `We have sent a setup profile link to your email. Please check your email for instructions on setting up your profile.`
  },
  signedUp: (email: string) => ({
    HeaderIcon: CheckCircle2,
    title: "Already Signed Up",
    description: `It seems like ${email} already has an account associated with it. Click the button below to go to the log in page.`
  }),
  expired: {
    HeaderIcon: BadgeAlert,
    title: "Link Expired",
    description:
      "No worries. It’s easy to get a new one. Please click the button below to receive a new email verification link sent to your email address."
  },
  success: {
    HeaderIcon: CheckCircle2,
    title: "Successfully Verified Email",
    description: "You will be navigated to setup profile page."
  },
  invalid: {
    HeaderIcon: ShieldCloseIcon,
    title: "Invalid Verify Link",
    description:
      "This email verification link is invalid. Please go back to the sign up page."
  }
}
