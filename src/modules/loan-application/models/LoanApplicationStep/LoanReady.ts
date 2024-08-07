import {
  isEnableReviewApplicationStep,
  isIgnoredKycAndCashFlowSubmission
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

export class LoanReadyLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  constructor() {
    super()
    this._buildSteps()
  }

  _buildSteps() {
    this._build_LoanRequestStep()._build_BusinessInformationStep()

    if (!isIgnoredKycAndCashFlowSubmission())
      this._build_OwnerInformationStep()._build_CashFlowVerificationStep()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
