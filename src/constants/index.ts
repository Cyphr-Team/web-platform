import { Icons } from "@/components/ui/icons"
import { NavItem } from "@/types"

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.route,
    label: "Dashboard"
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: Icons.route,
    label: "user"
  },
  {
    title: "Employee",
    href: "/dashboard/employee",
    icon: Icons.route,
    label: "employee"
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: Icons.route,
    label: "profile"
  },
  {
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: Icons.route,
    label: "kanban"
  },
  {
    title: "Login",
    href: "/",
    icon: Icons.route,
    label: "login"
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
  }
}

export const phoneRegex = new RegExp(
  "^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$"
)
