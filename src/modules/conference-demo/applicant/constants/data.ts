import {
  LoanApplicationStatus,
  UseOfLoan,
  UserMicroLoanApplication
} from "@/types/loan-application.type.ts"
import {
  LoanProgramInterestRateType,
  LoanType
} from "@/types/loan-program.type.ts"
import { LoanDecisionEnum } from "../../../loan-application-management/constants/types/application"

export const PLAID_BANKING_ACCOUNTS = [
  {
    institutionId: "PNC",
    institutionName: "PNC",
    accounts: [
      {
        id: "account_1",
        name: "Plaid Money Market",
        type: "checking",
        subtype: "checking",
        verificationStatus: "Connected"
      },
      {
        id: "account_2",
        name: "Plaid Saving",
        type: "checking",
        subtype: "checking",
        verificationStatus: "Connected"
      }
    ]
  },
  {
    institutionId: "Chase",
    institutionName: "Chase",
    accounts: [
      {
        id: "account_3",
        name: "Plaid Checking",
        type: "checking",
        subtype: "checking",
        verificationStatus: "Connected"
      }
    ]
  }
]

export const MOCK_APPLICATIONS: UserMicroLoanApplication[] = [
  {
    id: "fake-id",
    loanProgram: {
      id: "fake-id",
      institutionId: "fake-id",
      name: "SBA Micro Loans",
      type: LoanType.MICRO,
      description: "Micro loan program",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      minTermInMonth: 3,
      maxTermInMonth: 12,
      interestRate: 9,
      interestRateType: LoanProgramInterestRateType.FIXED,
      interestRateDescription: "9% interest rate",
      originationFee: 0,
      minLoanAmount: 1000,
      maxLoanAmount: 25000
    },
    applicantId: "fake-id",
    businessId: "fake-id",
    loanAmount: 10000,
    loanTermInMonth: 6,
    proposeUseOfLoan: UseOfLoan.OTHER,
    status: LoanApplicationStatus.IN_REVIEW,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    decision: LoanDecisionEnum.APPROVED,
    decisionNote: "",
    latestProgress: 0
  }
]
