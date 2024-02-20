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
    SETTINGS: "/onboarding/settings",
    APPLICATIONS: "/onboarding/applications",
    LOAN_PROGRAM: {
      list: "/onboarding/loan-program",
      detail: "/onboarding/loan-program/:loanProgramId",
      detailWithId: (id: string) => `/onboarding/loan-program/${id}`
    },
    INDEX: "/onboarding",
    INFORMATION: "information",
    SUBMISSION: "submission"
  },

  LOAN_APPLICATION_MANAGEMENT: {
    INDEX: "/application",
    OVERVIEW: "/application/:id/overview",
    KYB: {
      index: "/application/:id/kyb",
      detail: (id: string) => `/application/${id}/kyb`
    },
    KYC: "/application/:id/kyc",
    DOCUMENTS: {
      index: "/application/:id/document",
      details: (id: string) => `/application/${id}/document`
    },
    LOAN_SUMMARY: "/application/:id/loan-summary",
    CASH_FLOW: "/application/:id/cash-flow",
    BUSINESS_PLAN: "/application/:id/business-plan",
    LOAN_DECISION: "/application/:id/loan-decision",
    DOCUMENT: {
      index: "/application/:id/document/:documentId",
      detail: (id: string, documentId: string) =>
        `/application/${id}/document/${documentId}`
    }
  },

  // ADMIN USERS
  ADMIN_USERS: {
    index: "/users"
  },

  // Loan Program
  LOAN_PROGRAM: {
    index: "/loan-program"
  },
  NOTIFICATION: {
    list: "/notifications"
  },
  SETTINGS: "/settings",
  MESSAGES: "/messages"
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
    submitKyb: "api/form/kyb",
    submitKyc: "api/form/kyc",
    submitFinancial: "api/form/financial",
    uploadDocument: "api/form/document/upload",
    getIncomeCategories: "api/form/financial/income-categories"
  },
  loanApplication: {
    list: "api/loan-officer/applications"
  },
  loanApplicationDetails: {
    getKYB: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/kyb`,
    getKYC: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/kyc`
  }
}

export const phoneRegex = new RegExp(
  "^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$"
)

export const SSN_REGEX = /^\d{3}-\d{2}-\d{4}$/

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
  LOAN_APPLICATION_MANAGEMENT: {
    list: [
      {
        to: APP_PATH.LOAN_APPLICATION_MANAGEMENT.INDEX,
        label: "Applications"
      }
    ]
  }
}

// QUERY REQUEST

export const REQUEST_LIMIT_PARAM = 10
