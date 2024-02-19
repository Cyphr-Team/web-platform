export type BankStatementType = {
  transactions: BankTransaction[]
  bankAccount: BankAccount[]
}

type BankTransaction = {
  description: string
  amount: string
  transactionDate: string
}

export type BankAccount = {
  name: string
  bankName: string
  accountNumber: string
  accountType: string
  accountHolder: string
  holderZip: string
  holderAddress1: string
  holderAddress2: string
  holderCity: string
  holderState: string
  holderCountry: string
  accountCategory: string
}

export type W2DocumentType = {
  data: W2DocumentData[]
}

type W2DocumentData = {
  fieldName: string
  fieldValue: string
}

export type EmployerInformationType = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
}

export type EmployeeInformationType = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  maritalStatus: string
  taxIdType: string
  last4Digits: string
}

export type PayStubType = {
  payPeriodStartDate: string
  payPeriodEndDate: string
  netPay: string
  payDate: string
  provider: string
  frequency: string
}

export type PayStubDistributionType = {
  description: string
  bankName: string
  bankAccountType: string
  accountNumber: string
  amount: string
}

export type PayStubEarningType = {
  description?: string
  currentPay?: string
  ytdPay?: string
  currentHours?: string
  rate?: string
}

export type PayStubDeductionType = {
  currentPay: string
  ytdPay: string
  description: string
}

export type PayStubCapturedType = {
  employeeInformation: EmployeeInformationType
  employerInformation: EmployerInformationType
  payStubDetail: PayStubType
  earnings: PayStubEarningType[]
  deductions: PayStubDeductionType[]
  payDistribution: PayStubDistributionType[]
}

export enum DocumentType {
  BANK_STATEMENT = "BANK_STATEMENT",
  W2 = "W2",
  PAY_STUB = "PAY_STUB"
}
