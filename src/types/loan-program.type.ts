// ENUM
enum LoanType {
  MICRO = "micro",
  READINESS = "readiness"
}

enum InterestRateType {
  FIXED = "fixed",
  VARIABLE = "variable",
  FLOATING = "floating",
  PROMOTIONAL = "promotional"
}

export { LoanType, InterestRateType }

// INTERFACE
interface LoanProgram {
  id: string
  institutionId: string
  name: string
  type: string
  createdAt: string
  description: string
  minLoanAmount: number
  maxLoanAmount: number
  minTermInMonth: number
  maxTermInMonth: number
  interestRate: number
  interestRateType: string
  interestRateDescription: string
  originationFee: number
}

export type { LoanProgram }
