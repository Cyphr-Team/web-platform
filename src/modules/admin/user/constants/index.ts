import { APP_PATH } from "@/constants"

export const USER_MENU = () => [
  {
    name: "User",
    href: APP_PATH.ADMIN_USERS.USER.index
  },
  {
    name: "Invitation",
    href: APP_PATH.ADMIN_USERS.INVITATION.index
  }
]

export const SETTINGS_MENU = [
  {
    name: "Payment Transactions",
    href: APP_PATH.SETTINGS.payment
  }
]
