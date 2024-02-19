import { LoanProgramData } from "./type"

const ALTCAP_ARTCAP_EXPRESS: LoanProgramData = {
  type: "Microloan",
  name: "ARTcap Express",
  loanAmountRange: "Up to",
  amount: 25000,
  meta: {
    term: "Term: 3 - 5 years",
    rate: "Rate: Fixed at 9%",
    collateralRequired: "No collateral required",
    minimumCreditScore: "No minimum credit score required",
    decisionTime: "Decision in 5 - 7 business days"
  }
}

const ALTCAP_SMALL_BUSINESS_LOAN: LoanProgramData = {
  type: "SMB",
  name: "Small Business Loans",
  loanAmountRange: "Up to",
  amount: 250000,
  meta: {
    term: "Term: 3 years",
    rate: "Rate: Fixed, up to 12.5%",
    collateralRequired: "No collateral required",
    minimumCreditScore: "No minimum credit score required",
    decisionTime: "Decision in 15 business days"
  }
}

const ALTCAP_REVENUE_BASED_FINANCING: LoanProgramData = {
  type: "SMB",
  name: "Revenue-Based Financing",
  loanAmountRange: "Up to",
  amount: "1.5x revenue",
  meta: {
    term: "Term: 60 months",
    rate: "Rate: Capped at 20% APY/APR",
    payment: "Payment: 8% of total monthly revenue",
    collateralRequired: "No minimum credit score required",
    decisionTime: "Decision in 15 business days"
  }
}

const ALTCAP_NEW_MARKETS_TAX_CREDITS: LoanProgramData = {
  type: "Community Projects",
  name: "New Markets Tax Credits",
  loanAmountRange: "",
  amount: "Project-based",
  meta: {
    term: "Term: 84 months",
    rate: "Rate: Below market interest rate",
    payment: "Payment: Interest-only payments",
    collateralRequired: "Loan-to-Value (LTV): 125% on average",
    decisionTime: "DSCR: Lower than standard 1.0 "
  }
}

const ALTCAP_LOAN_PROGRAMS: LoanProgramData[] = [
  ALTCAP_ARTCAP_EXPRESS,
  ALTCAP_SMALL_BUSINESS_LOAN,
  ALTCAP_REVENUE_BASED_FINANCING,
  ALTCAP_NEW_MARKETS_TAX_CREDITS
]

export { ALTCAP_LOAN_PROGRAMS }
