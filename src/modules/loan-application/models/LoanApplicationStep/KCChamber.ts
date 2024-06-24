import {
  isEnablePersonaKycV1,
  isEnableReviewApplicationStep
} from "@/utils/feature-flag.utils"
import { LoanApplicationStep, ILoanApplicationStepStrategy } from "./base"

export class KCChamberLoanApplicationStep
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
      ._build_CashFlowVerification()
      ._build_CurrentLoansStep()
      ._build_OpertaingExpensesStep()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    if (isEnablePersonaKycV1()) this._build_IdentityVerificationStep()

    return this._build_ConfirmationStep()
  }
}
