import { Icons } from "@/components/ui/icons"
import { NavItem } from "@/types"

export const navItems: NavItem[] = [
  {
    title: "Users",
    href: "/users",
    icon: Icons.user,
    label: "users"
  }
]

export const APP_PATH = {
  INDEX: "/",
  DASHBOARD: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  SETUP_PASSWORD_BY_TOKEN: {
    index: "/setup-password/:token",
    detail: (token: string) => `/setup-password/${token}`
  },
  EXAMPLE_TABLE: "/example-table",
  SIGN_UP: "/sign-up",
  VERIFY_EMAIL: {
    index: "/verify-email/:email",
    detail: (email: string) => `/verify-email/${email}`,
    activateByToken: "/activation"
  },
  SETUP_PROFILE_BY_TOKEN: {
    index: `/setup-profile/:email`,
    detail: (email: string) => `/setup-profile/${email}`
  },
  // Click button "verify email" in the email
  LOAN_APPLICATION: {
    INDEX: "/onboarding",
    INFORMATION: "information",
    SUBMISSION: "submission"
  },

  // ADMIN USERS
  USERS: {
    index: "/users"
  }
}

export const API_PATH = {
  users: {
    forgotPassword: "api/users/public/forgot-password",
    resendForgotPassword: "api/users/resend-activation-secret",
    setupPassword: "api/users/public/reset-password",
    getStart: "api/users/start",
    activateByOtpCode: "api/users/activate-by-otp-code",
    activateByToken: "api/users/activate-by-token",
    // Resend activate code
    resendVerificationEmail: "api/users/resend-verification-email",
    // Setup name, password after activate successfully
    signUp: "api/users/sign-up"
  },
  login: {
    loginBySocial: "login/social"
  },
  admin: {
    user: {
      sendInvitation: "api/admin/user/invite"
    }
  }
}

export const phoneRegex = new RegExp(
  "^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$"
)

export interface QueryResponse<T> {
  data: T
}

export interface QueryResponseError {
  code: number
  message: string
}

export const REQUEST_RATE_LIMIT_TIME = 60 * 1000
