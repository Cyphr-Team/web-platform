import { isIgnoredCashFlowSubmission } from "@/utils/feature-flag.utils"
import { type ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

export class CyphrLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  constructor() {
    super()
    this._buildSteps()
  }

  _buildSteps() {
    this._build_LoanRequestStep()
      ._build_BusinessInformationStep()
      ._build_OwnerInformationStep()

    if (!isIgnoredCashFlowSubmission()) this._build_CashFlowVerificationStep()

    this._build_CurrentLoansStep()._build_OperatingExpensesStep()

    this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
