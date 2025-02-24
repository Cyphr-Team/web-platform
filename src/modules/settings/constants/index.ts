import { APP_PATH } from "@/constants"
import { isLoanReady } from "@/utils/domain.utils.ts"

export const ADMIN_SETTINGS_MENU = [
  {
    name: "Profile",
    href: APP_PATH.SETTINGS.profile
  },
  ...(isLoanReady()
    ? [
        {
          name: "Payment Transactions",
          href: APP_PATH.SETTINGS.payments
        }
      ]
    : []),
  {
    name: "Team Members",
    href: APP_PATH.SETTINGS.teamMembers
  },
  {
    name: "Users",
    href: APP_PATH.SETTINGS.users
  }
]

export const APPLICANT_SETTINGS_MENU = [
  {
    name: "Profile",
    href: APP_PATH.SETTINGS.profile
  },
  {
    name: "Privacy & Data",
    href: APP_PATH.SETTINGS.privacy
  },
  ...(isLoanReady()
    ? [
        {
          name: "Payments",
          href: APP_PATH.SETTINGS.payments
        }
      ]
    : [])
]

export const VIEWER_SETTINGS_MENU = [
  {
    name: "Profile",
    href: APP_PATH.SETTINGS.profile
  }
]
