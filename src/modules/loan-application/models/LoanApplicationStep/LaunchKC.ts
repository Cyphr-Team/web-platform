import {
  isIgnoredCashFlowSubmission,
  isIgnoredKycSubmission
} from "@/utils/feature-flag.utils"
import { type ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

export class LaunchKCLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  constructor() {
    super()
    this._buildPreStep()
  }

  _buildPreStep() {
    this._build_PreQualificationStep()
  }

  _buildSteps() {
    this._build_BusinessInformationStep()._build_OwnerInformationStep()

    if (!isIgnoredKycSubmission()) this._build_IdentityVerificationStep()

    if (!isIgnoredCashFlowSubmission()) this._build_CashFlowVerificationStep()

    this._build_CurrentLoansStep()
      ._build_ProductServiceStep()
      ._build_MarketOpportunityStep()
      ._build_BusinessModelStep()
      ._build_ExecutionStep()
      ._build_BusinessDocumentsStep()
      ._build_LaunchKCFitStep()

    this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
