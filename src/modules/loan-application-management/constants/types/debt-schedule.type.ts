export interface PaymentDetail {
  month: number
  principalPayment: number
  interestPayment: number
  totalPayment: number
  closingBalance: number
  openingBalance: number
}

interface AmortizationSchedule {
  paymentDetail: PaymentDetail[]
  outstandingBalance: number
  annualInterestRate: number
  loanTermMonths: number
  createdAt: string
  lenderName: string
}

export interface TotalMonthlyPayment {
  month: number
  amount: number
}

export interface FullAmortizationResponse {
  amortizationSchedule: AmortizationSchedule[]
  totalMonthlyPayment: TotalMonthlyPayment[]
}
