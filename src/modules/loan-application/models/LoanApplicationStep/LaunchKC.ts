import {
  isEnablePersonaKycV1,
  isEnableReviewApplicationStep
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

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
    this._build_BusinessInformationStep()
      ._build_OwnerInformationStep()
      ._build_CashFlowVerificationStep()
      ._build_CurrentLoansStep()
      ._build_OperatingExpensesStep()
      ._build_ProductServiceStep()
      ._build_MarketOpportunityStep()
      ._build_BusinessModelStep()
      ._build_ExecutionStep()
      ._build_DocumentUploadsStep()
      ._build_LaunchKCFitStep()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    if (isEnablePersonaKycV1()) this._build_IdentityVerificationStep()

    return this._build_ConfirmationStep()
  }
}
