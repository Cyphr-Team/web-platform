import { BadgeAlert, Loader2 } from "lucide-react"

export const UI_DATA_ACTIVATE_EMAIL_HEADER = {
  verifying: {
    HeaderIcon: Loader2,
    title: "Verifying link",
    description:
      "Please wait for a while. Our app is handling your verification link."
  },
  expired: {
    HeaderIcon: BadgeAlert,
    title: "Link expired",
    description:
      "No worries. It’s easy to get a new one. Fill in the email and request a new verification email link."
  }
}
