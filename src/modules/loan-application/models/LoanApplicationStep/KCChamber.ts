import {
  isEnableKycReOrder,
  isEnablePersonaKycV1,
  isEnableReviewApplicationStep
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

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

    if (isEnablePersonaKycV1() && isEnableKycReOrder())
      this._build_IdentityVerificationStep()

    this._build_CashFlowVerificationStep()
      ._build_CurrentLoansStep()
      ._build_OperatingExpensesStep()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    if (isEnablePersonaKycV1() && !isEnableKycReOrder())
      this._build_IdentityVerificationStep()

    return this._build_ConfirmationStep()
  }
}
