import { LoanReadyTransactionsPage } from "@/modules/loanready/components/pages/Transactions"
import { isLoanReady } from "@/utils/domain.utils"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"

import { Component as UnderConstruction } from "@/modules/loan-application-management/pages/under-construction"

export function TransactionsPage() {
  if (isLoanReady() && isEnableLoanReadyV2()) {
    return <LoanReadyTransactionsPage />
  }

  return <UnderConstruction />
}
