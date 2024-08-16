import { LoanType } from "@/types/loan-program.type"
import { snakeCaseToUrlPattern } from "@/utils"

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
  MAGIC_LINK: "/magic-link",
  SETUP_PROFILE: "/setup-profile",
  ACCEPT_INVITE: "/accept-invite",

  // ONBOARDING
  LOAN_APPLICATION: {
    SETTINGS: "/loan/settings",
    APPLICATIONS: {
      index: "/loan/applications",
      detail: "/loan/:loanProgramId/applications/:id",
      edit: "/loan/:loanProgramId/applications/:id/edit",
      details: (id: string, loanProgramId: string) =>
        `/loan/${loanProgramId}/applications/${id}`,
      editing: (id: string, loanProgramId: string) =>
        `/loan/${loanProgramId}/applications/${id}/edit`
    },
    LOAN_PROGRAM: {
      all: "/loan/loan-program",
      list: "/loan/loan-program",
      detail: "/loan/loan-program/:loanProgramId",
      detailWithId: (id: string) => `/loan/loan-program/${id}`
    },
    INDEX: "/loan",
    SUBMISSION: "/loan/submission",
    PRE_QUALIFICATION: {
      index: "/loan/pre-qualification",
      detail: "/loan/pre-qualification/:loanProgramId",
      detailWithId: (loanProgramId: string) =>
        `/loan/pre-qualification/${loanProgramId}`
    },
    INFORMATION: {
      detail: "/loan/loan-program/:loanProgramId/information",
      detailWithId: (loanProgramId: string) =>
        `/loan/loan-program/${loanProgramId}/information`
    },
    NOTIFICATION: {
      all: "/loan/notifications",
      list: "/loan/notifications",
      detail: "/loan/notifications/:id",
      details: (id: string) => `/loan/notifications/${id}`
    },
    FINANCIAL: {
      index: "/loan/financial",
      detail: "/loan/financial/:id",
      details: (id: string) => `/loan/financial/${id}`,
      company: {
        index: "/loan/financial/company",
        create: "/loan/financial/company/create",
        detail: "/loan/financial/company/:id",
        details: (id: string) => `/loan/financial/company/${id}`,
        scenarios: {
          index: "/loan/financial/company/:companyId/scenarios",
          list: (companyId: string) =>
            `/loan/financial/company/${companyId}/scenarios`
        }
      }
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
    },
    DEBT_SCHEDULE: "/application/:id/debt-schedule"
  },

  // ADMIN USERS
  ADMIN_USERS: {
    USER: {
      index: "/users"
    },
    INVITATION: {
      index: "/invitations"
    }
  },

  // Loan Program
  LOAN_PROGRAM: {
    index: "/loan-program"
  },
  NOTIFICATION: {
    all: "/notifications",
    list: "/notifications",
    detail: "/notifications/:id",
    details: (id: string) => `/notifications/${id}`
  },
  SETTINGS: "/settings",
  MESSAGES: "/messages",
  ONBOARD: "/onboard",
  SUBSCRIPTIONS: "/subscriptions",
  FEATURE_FLAGS: "/feature-flags"
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
      get: "api/admin/user",
      sendInvitation: "api/admin/user/invite",
      sendBulkListInvitation: "api/admin/invitation/bulk-invite-list",
      sendBulkCsvInvitation: "api/admin/invitation/bulk-invite-csv",
      updateRoles: "api/admin/user/update-roles",
      listUsersByInstitutionId: `api/admin/users/by-institution`,
      listUsersByUserIds: "api/admin/users/by-user-ids",
      list: () => `${API_PATH.admin.user.all}/users`,
      deactivate: (userId: string) =>
        `${API_PATH.admin.user.all}/user/${userId}/deactivate`,
      reactivate: (userId: string) =>
        `${API_PATH.admin.user.all}/user/${userId}/reactivate`
    },
    invitation: {
      all: "api/admin/invitation",
      list: "api/admin/invitation/list",
      bulkInviteCsvTemplate: "api/admin/invitation/bulk-invite-csv-template",
      delete: (invitationId: string) =>
        `${API_PATH.admin.invitation.all}/${invitationId}`
    }
  },
  workspaceAdmin: {
    selectRoundLoanApplication: "api/workspace-admin/applications/round",
    getAssignableList: "api/workspace-admin/judge/assignable-list",
    // Nudge
    getActiveNudges: (applicationId: string) =>
      `api/workspace-admin/loan-applications/${applicationId}/judge/active-nudges`,
    sendNudge: `api/workspace-admin/loan-applications/judge/send-nudge`,
    applicationStageStat: `api/workspace-admin/application/stats/institution-application-stage`
  },
  loanProgram: {
    list: "api/user-loan/program/list",
    detail: (id: string, loanType: string = LoanType.MICRO) =>
      `api/user-loan/${snakeCaseToUrlPattern(loanType)}-loan/program?id=${id}`,
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
    },
    adminSelectLoanProgramList: "api/admin-loan/program/list",
    formsConfiguration: "api/user-loan/program/forms-configuration"
  },
  application: {
    list: "api/user-loan/application/list",
    details: (loanType: LoanType) =>
      `api/user-loan/${snakeCaseToUrlPattern(loanType)}-loan/application`,
    create: (loanType: LoanType) =>
      `api/user-loan/${snakeCaseToUrlPattern(loanType)}-loan/application`,
    update: (id: string, loanType: LoanType) =>
      `api/user-loan/${snakeCaseToUrlPattern(
        loanType
      )}-loan/application/?id=${id}`,
    detail: (id: string) => `api/user-loan/application/?id=${id}`,
    kybForm: "api/form/kyb",
    kycForm: "api/form/kyc",
    financialForm: "api/form/financial",
    confirmationForm: "api/form/confirmation",
    currentLoansForm: "api/form/current-loan",
    operatingExpensesForm: "api/form/operating-expenses",
    uploadDocument: "api/form/document/upload",
    documents: "api/form/document/by-form-id",
    deleteDocuments: "api/form/document/delete",
    getIncomeCategories: "api/form/financial/income-categories",
    getCashflowVerification: (id: string) =>
      `api/user-loan/application/${id}/cash-flow`,
    linkInquiry: "api/form/smart-kyc/inquiry/link",
    getInquiry: "api/form/smart-kyc/inquiry/by-application-id",
    linkPlaidItem: "api/plaid/item/link",
    getPlaidItemIds: "api/plaid/item/list",
    getPlaidConnectedBankAccountsByApplicationId:
      "api/plaid/item/connected-bank-accounts/by-application-id",
    preQualification: {
      index: "api/form/pre-qualification",
      detail: "api/form/pre-qualification/by-application-id"
    },
    productServiceForm: {
      all: "api/form/product-service",
      detail: "api/form/product-service/by-application-id"
    },
    launchKCFitForm: {
      index: "api/form/launchkc-fit",
      detail: "api/form/launchkc-fit/by-application-id"
    },
    executionForm: {
      index: "api/form/execution",
      detail: "api/form/execution/by-application-id"
    },
    businessModelForm: {
      index: "api/form/business-model",
      detail: "api/form/business-model/by-application-id"
    },
    marketOpportunity: {
      index: "api/form/market-opportunity",
      detail: "api/form/market-opportunity/by-application-id"
    },
    businessDocuments: {
      index: "api/form/document-upload",
      detail: "api/form/document-upload/by-application-id"
    },
    sbbDocument: {
      index: "api/form/sbb-documents/by-application-id",
      upload: "api/form/sbb-documents/documents/upload",
      submit: "api/form/sbb-documents/submit",
      deleteByType: "api/form/sbb-documents/documents/delete-by-type",
      deleteById: "api/form/sbb-documents/documents/delete-by-id"
    }
  },
  // For workspace admin
  loanApplicationAdmin: {
    viewJudgesScores: (applicationId: string) =>
      `api/workspace-admin/loan-applications/${applicationId}/scorecard`,
    all: "api/workspace-admin/application",
    list: () => `${API_PATH.loanApplicationAdmin.all}/list`
  },
  // For loan officer
  loanApplication: {
    details: (loanType: LoanType = LoanType.MICRO) =>
      `api/loan-officer/${snakeCaseToUrlPattern(loanType)}-loan/application`,
    list: "api/loan-officer/applications",
    getDocuments: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/documents`,
    submitDecision: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/underwrite`,
    reviewLoanApplication: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/review`
  },
  judgeApplication: {
    all: "api/judge/loan-applications",
    list: () => `${API_PATH.judgeApplication.all}`,
    detail: (applicationId: string) =>
      `${API_PATH.judgeApplication.all}/${applicationId}/score`
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
      `api/loan-officer/applications/${applicationId}/cash-flow/revenue-expense`,
    // Cash Flow 2.0
    getCashFlowGlanceV2: (applicationId: string) =>
      `api/v2/loan-officer/applications/${applicationId}/cash-flow/glance`,
    getCashFlowRevenueVsExpenseGraph: (applicationId: string) =>
      `api/v2/loan-officer/applications/${applicationId}/cash-flow/revenue-expense`,
    getCashFlowNoiVsTotalDebtPaymentGraph: (applicationId: string) =>
      `api/v2/loan-officer/applications/${applicationId}/cash-flow/noi-total-debt-payment`,
    getSmartKycPersonaDetail: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/identity-verification`,
    // Judge
    getAssignableJudges: () => `api/workspace-admin/judge/assignable-list`,
    getJudges: () => `api/workspace-admin/judge/list`,
    updateAssignedJudges: () =>
      `api/workspace-admin/loan-applications/judge/update`,
    getApplicationWithStageScoresResponse: () =>
      `api/workspace-admin/application/by-id`,
    getFullAmortizationSchedule: (applicationId: string) =>
      `api/loan-officer/applications/${applicationId}/full-amortization-schedule`
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
    all: "api/lender",
    allStats: "api/lender/stats",
    getInstitutionActivity: () =>
      `${API_PATH.dashboard.allStats}/institution-activity`,
    getApprovalRate: () =>
      `${API_PATH.dashboard.allStats}/performance-metrics/approval-rate`,
    getIncompleteApplicationRate: () =>
      `${API_PATH.dashboard.allStats}/performance-metrics/incomplete-rate`,
    getAverageTimeToApprovalMetrics: () =>
      `${API_PATH.dashboard.allStats}/performance-metrics/average-time-to-approval`,
    getAverageLoanSize: () =>
      `${API_PATH.dashboard.allStats}/performance-metrics/average-approved-loan-size`,
    getPortfolioGrowth: () =>
      `${API_PATH.dashboard.allStats}/performance-metrics/portfolio-growth`,
    getInstitutionUsage: () => `${API_PATH.dashboard.all}/usage`
  },
  dashboardV1: {
    all: "api/v1/lender/stats",
    getAverageApprovalRate: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/average-approval-rate`,
    getAggregateApprovedLoanAmount: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/aggregate-approved-loan-amount`,
    getAverageTimeToApproval: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/average-time-to-approval`,
    getLoanApplicationActivities: () =>
      `${API_PATH.dashboardV1.all}/application-activity/loan-application-activities`,
    getAverageLoanSize: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/average-approved-loan-size`,
    getAverageTimeToDecision: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/average-time-to-decision`,
    getAverageApprovedLoanAmount: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/average-approved-loan-amount`,
    getInstitutionActivity: () =>
      `${API_PATH.dashboardV1.all}/institution-activity`,
    getLoanApplicationRates: () =>
      `${API_PATH.dashboardV1.all}/performance-metrics/incomplete-rate`
  },
  institution: {
    list: "api/admin/internal/institutions",
    listAll: "api/admin/institution/list-all",
    create: "api/admin/institution/create",
    updateInstitutionMetadata: "api/admin/institution-metadata/update",
    getInstitutionMetadata: "api/users/public/institution-metadata"
  },
  asset: {
    upload: "api/asset/upload"
  },
  subscriptions: {
    all: "api/admin/subscription",
    list: () => `${API_PATH.subscriptions.all}/list`
  },
  plan: {
    all: "api/admin/plan",
    institutionUsage: (institutionId: string) =>
      `${API_PATH.plan.all}/usage/${institutionId}`
  },
  featureFlag: {
    all: "api/admin/feature-flag",
    public: "api/feature-flag/list",
    list: () => `${API_PATH.featureFlag.all}/list`,
    listFeatureFlagByUserId: () => "api/feature-flag/list/by-user-id",
    create: () => `${API_PATH.featureFlag.all}`,
    detail: (id: string) => `${API_PATH.featureFlag.all}/by-id?id=${id}`,
    toggleStatus: (id: string) => `${API_PATH.featureFlag.all}/action?id=${id}`,
    toggleRolloutType: (id: string) =>
      `${API_PATH.featureFlag.all}/rollout-type/update?id=${id}`,
    delete: (id: string) => `${API_PATH.featureFlag.all}/delete-by-id?id=${id}`,
    update: () => `${API_PATH.featureFlag.all}/update`
  },
  whitelistUser: {
    all: "api/admin/whitelist-user",
    detail: (id: string) =>
      `api/admin/whitelist-user/by-feature-flag-id?id=${id}`,
    update: () => "api/admin/whitelist-user"
  },
  financialProjection: {
    company: {
      // TODO: fix this
      list: "api/financial-projection/company",
      scenario: {
        create: "api/financial-projection/scenarios/create",
        list: "api/financial-projection/scenarios/list",
        update: "api/financial-projection/scenarios/update"
      }
    }
  }
}

export const phoneRegex =
  /^(?:\\+\\d{1,3}|0\\d{1,3}|00\\d{1,2})?(?:\\s?\\(\\d+\\))?(?:[-/\\s.]|\\d)+$/

export const SSN_PATTERN = "000-00-0000"
export const EIN_PATTERN = "00-0000000"
export const YEAR_PATTERN = "0000"
export const NUMBER_PATTERN = "0000000000000000000000000000000000000000"

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

export const REQUEST_LIMIT_PARAM_FOR_SELECT = 200

export const MAX_REMEMBER_ME_DAYS = 30

export const ACCEPTED_IMAGE_FORMAT = "image/jpg,image/jpeg,image/png"
