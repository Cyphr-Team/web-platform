import {
  isEnableReviewApplicationStep,
  isIgnoredKycAndCashFlowSubmission
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

export class KansasCityLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  constructor() {
    super()
    this._buildSteps()
  }

  _buildSteps() {
    this._build_LoanRequestStep()
      ._build_OwnerInformationStep()
      ._build_BusinessInformationStep()

    if (!isIgnoredKycAndCashFlowSubmission())
      this._build_CashFlowVerificationStep()

    this._build_CurrentLoansStep()._build_OperatingExpensesStep()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
