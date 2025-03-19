enum TransactionOrigin {
  LoanReadyBasic = "LOAN_READY_BASIC",
  LoanReadyPlus = "LOAN_READY_PLUS",
  Refund = "REFUND",
  Admin = "ADMIN"
}

enum TransactionIntent {
  Credit = "CREDIT",
  Debit = "DEBIT",
  Refund = "REFUND",
  Authorization = "AUTHORIZATION"
}

export { TransactionOrigin, TransactionIntent }
