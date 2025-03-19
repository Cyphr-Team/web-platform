import { CheckCircle2, Lock } from "lucide-react"

export const UI_DATA_SETUP_PASSWORD_HEADER = {
  success: {
    HeaderIcon: CheckCircle2,
    title: "Password reset",
    description:
      "Your password has been successfully reset. Click below to log in magically."
  },
  enterPassword: {
    HeaderIcon: Lock,
    title: "Set new password",
    description:
      "Your new password must be different to previously used passwords."
  }
}
