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
    SETTINGS: "/loan/settings",
    APPLICATIONS: {
      index: "/loan/applications",
      detail: "/loan/applications/:id",
      edit: "/loan/:loanProgramId/applications/:id/edit",
      details: (id: string) => `/loan/applications/${id}`,
      editing: (id: string, loanProgramId: string) =>
        `/loan/${loanProgramId}/applications/${id}/edit`
    },
    LOAN_PROGRAM: {
      list: "/loan/loan-program",
      detail: "/loan/loan-program/:loanProgramId",
      detailWithId: (id: string) => `/loan/loan-program/${id}`
    },
    INDEX: "/loan",
    SUBMISSION: "/loan/submission",
    INFORMATION: {
      detail: "/loan/loan-program/:loanProgramId/information",
      detailWithId: (loanProgramId: string) =>
        `/loan/loan-program/${loanProgramId}/information`
    },
    NOTIFICATION: {
      list: "/loan/notifications",
      detail: "/loan/notifications/:id",
      details: (id: string) => `/loan/notifications/${id}`
    }
  },

  LOAN_APPLICATION_MANAGEMENT: {
    INDEX: "/application",
    KYB: {
      index: "/application/:id/kyb",
      detail: (id: string) => `/application/${id}/kyb`
    },
    BUSINESS_VERIFICATION: {
      detail: "/application/:id/business-verification",
      detailWithId: (id: string) => `/application/${id}/business-verification`
    },
    KYC: "/application/:id/kyc",
    DOCUMENTS: {
      index: "/application/:id/document",
      details: (id: string) => `/application/${id}/document`
    },
    LOAN_SUMMARY: "/application/:id/loan-summary",
    CASH_FLOW: "/application/:id/cash-flow",
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
    list: "/notifications",
    detail: "/notifications/:id",
    details: (id: string) => `/notifications/${id}`
  },
  SETTINGS: "/settings",
  MESSAGES: "/messages",
  ONBOARD: "/onboard"
}

export const API_PATH = {
  users: {
    me: "api/users/me",
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
      all: "api/admin",
      sendInvitation: "api/admin/user/invite",
      list: () => `${API_PATH.admin.user.all}/users`
    }
  },
  loanProgram: {
    list: "api/user-loan/micro-loan/program/list",
    detail: (id: string) => `api/user-loan/micro-loan/program?id=${id}`,
    cdfi: {
      all: "api/admin-loan/micro-loan/program",
      create: () => API_PATH.loanProgram.cdfi.all,
      list: () => `${API_PATH.loanProgram.cdfi.all}/list`,
      detail: () => API_PATH.loanProgram.cdfi.all,
      update: () => API_PATH.loanProgram.cdfi.all,
      delete: (loanProgramId: string) =>
        `api/admin-loan/program/${loanProgramId}`
    },
    loanOfficer: {
      list: "api/loan-officer/programs/list"
    }
  },
  application: {
    list: "api/user-loan/micro-loan/application/list",
    details: "api/user-loan/micro-loan/application",
    create: "api/user-loan/micro-loan/application",
    update: (id: string) => `api/user-loan/micro-loan/application/?id=${id}`,
    detail: (id: string) => `api/user-loan/application/?id=${id}`,
    kybForm: "api/form/kyb",
    kycForm: "api/form/kyc",
    financialForm: "api/form/financial",
    confirmationForm: "api/form/confirmation",
    uploadDocument: "api/form/document/upload",
    documents: "api/form/document/by-form-id",
    deleteDocuments: "api/form/document/delete",
    getIncomeCategories: "api/form/financial/income-categories"
  },
  loanApplication: {
    details: "api/loan-officer/micro-loan/application",
    list: "api/loan-officer/applications",
    getDocuments: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/documents`,
    submitDecision: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/underwrite`,
    reviewLoanApplication: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/review`
  },
  loanApplicationDetails: {
    all: "api/loan-officer/applications",
    getStatusDetail: (applicationId: string) =>
      `${API_PATH.loanApplicationDetails.all}/${applicationId}/status`,
    getKYB: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/kyb`,
    getKYC: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/kyc`,
    getDocumentDetails: (applicationId: string, documentId: string) =>
      `api/loan-officer/applications/${applicationId}/documents/${documentId}`,
    getVisualizationImage: (applicationId: string, documentId: string) =>
      `api/loan-officer/applications/${applicationId}/documents/${documentId}/visualization`,
    getLoanSummary: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/loan-summary`,
    getDownloadLoanSummary: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/loan-summary/download`,
    getCashFlow: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/cash-flow`,
    getBankAccounts: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/cash-flow/bank-accounts`,
    getBalanceGraph: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/cash-flow/balance-history`,
    getTransactionTags: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/cash-flow/transaction-tags`,
    getRevenueExpense: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/cash-flow/revenue-expense`
  },
  document: {
    getDocumentDownloadForOfficer:
      "api/loan-officer/document/download/by-document-id",
    getDocumentDownloadForApplicant: "api/form/document/download/by-document-id"
  },
  notification: {
    details: "api/notification/by-id",
    getUnreadNotifications: "api/notification/count-unread",
    getNotifications: "api/notification/list",
    markAllAsRead: "api/notification/mark-all-read",
    markAsRead: "api/notification/mark-read",
    markAsUnread: "api/notification/mark-unread"
  },
  dashboard: {
    all: "api/lender/stats",
    getInstitutionActivity: () =>
      `${API_PATH.dashboard.all}/institution-activity`
  },
  institution: {
    list: "api/admin/internal/institutions",
    create: "api/admin/institution/create",
    updateInstitutionMetadata: "api/admin/institution-metadata/update",
    getInstitutionMetadata: "api/users/public/institution-metadata"
  },
  asset: {
    upload: "api/asset/upload"
  }
}

export const phoneRegex =
  /^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$/

export const SSN_PATTERN = "000-00-0000"

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
  AT_LEAST_EIGHT_CHARACTER = "AT_LEAST_EIGHT_CHARACTER",
  AT_LEAST_ONE_SPECIAL_CHARACTER = "AT_LEAST_ONE_SPECIAL_CHARACTER",
  AT_LEAST_ONE_UPPERCASE = "AT_LEAST_ONE_UPPERCASE",
  AT_LEAST_ONE_LOWERCASE = "AT_LEAST_ONE_LOWERCASE",
  AT_LEAST_ONE_DIGIT = "AT_LEAST_ONE_DIGIT",
  NONE_SPACES = "NONE_SPACES",
  AT_MOST_255_CHARACTER = "AT_MOST_255_CHARACTER"
}

export const PASSWORD_REGEX = {
  [PasswordRegex.AT_LEAST_ONE_SPECIAL_CHARACTER]:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])^.+$/,
  [PasswordRegex.AT_LEAST_ONE_UPPERCASE]: /(?=.*[A-Z])^.+$/,
  [PasswordRegex.AT_LEAST_ONE_LOWERCASE]: /(?=.*[a-z])^.+$/,
  [PasswordRegex.AT_LEAST_ONE_DIGIT]: /(?=.*\d)^.+$/,
  [PasswordRegex.NONE_SPACES]: /^[^\s]*$/
}

// QUERY REQUEST

export const REQUEST_LIMIT_PARAM = 25

export const MAX_REMEMBER_ME_DAYS = 30

export const ACCEPTED_IMAGE_FORMAT = "image/jpg,image/jpeg,image/png"
