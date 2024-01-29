export const APP_PATH = {
  INDEX: "/",
  DASHBOARD: "/",

  // AUTHENTICATION
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  SETUP_PASSWORD_BY_TOKEN: {
    index: "/setup-password/:token",
    detail: (token: string) => `/setup-password/${token}`
  },
  SIGN_UP: "/sign-up",
  VERIFY_EMAIL: {
    index: "/verify-email/:email",
    detail: (email: string) => `/verify-email/${email}`,
    activateByToken: "/activation"
  },
  SETUP_PROFILE: "/setup-profile",
  ACCEPT_INVITE: "/accept-invite",

  // ONBOARDING
  LOAN_APPLICATION: {
    INDEX: "/onboarding",
    INFORMATION: "information",
    SUBMISSION: "submission"
  },

  LOAN_APPLICATION_DETAILS: {
    INDEX: "/application",
    OVERVIEW: "/application/:id/overview",
    KYB: "/application/:id/kyb",
    KYC: "/application/:id/kyc"
  },

  // ADMIN USERS
  ADMIN_USERS: {
    index: "/users"
  },
  ADMIN_LOAN_APPLICATION: {
    index: "/application"
  },

  // Loan Program
  LOAN_PROGRAM: {
    index: "/loan-program"
  },
  NOTIFICATION: {
    index: "/notifications"
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
    signUp: "api/users/sign-up",
    acceptInvite: "api/users/public/invitation/accept"
  },
  login: {
    loginBySocial: "login/social"
  },
  admin: {
    user: {
      sendInvitation: "api/admin/user/invite"
    }
  },
  loanProgram: {
    create: "api/admin-loan/micro-loan/program"
  },
  application: {
    create: "api/user-loan/micro-loan/application",
    submitKyb: "api/form/kyb"
  },
  loanApplication: {
    list: "api/loan-officer/applications"
  }
}

export const phoneRegex = new RegExp(
  "^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$"
)
export const SSN_REGEX = new RegExp("^[0-9]{3}-[0-9]{2}-[0-9]{4}$")

export interface QueryResponse<T> {
  data: T
}

export interface QueryResponseError {
  code: number
  message: string
}

export const REQUEST_RATE_LIMIT_TIME = 60 * 1000

// PASSWORD_REGEX
export enum PasswordRegex {
  AT_LEAST_ONE_SPECIAL_CHARACTER = "AT_LEAST_ONE_SPECIAL_CHARACTER",
  AT_LEAST_ONE_UPPERCASE = "AT_LEAST_ONE_UPPERCASE",
  AT_LEAST_ONE_LOWERCASE = "AT_LEAST_ONE_LOWERCASE",
  AT_LEAST_ONE_DIGIT = "AT_LEAST_ONE_DIGIT",
  NONE_SPACES = "NONE_SPACES"
}

export const PASSWORD_REGEX = {
  [PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER]:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])^.+$/,
  [PasswordRegex.AT_LEAST_ONE_UPPERCASE]: /(?=.*[A-Z])^.+$/,
  [PasswordRegex.AT_LEAST_ONE_LOWERCASE]: /(?=.*[a-z])^.+$/,
  [PasswordRegex.AT_LEAST_ONE_DIGIT]: /(?=.*\d)^.+$/,
  [PasswordRegex.NONE_SPACES]: /^[^\s]*$/
}

export const APP_BREADS = {
  LOAN_APPLICATION_DETAILS: {
    list: [
      {
        to: APP_PATH.LOAN_APPLICATION_DETAILS.INDEX,
        label: "Applications"
      }
    ]
  }
}

// QUERY REQUEST

export const REQUEST_LIMIT_PARAM = 10
