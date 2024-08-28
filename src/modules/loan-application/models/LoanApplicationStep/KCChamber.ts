import {
  isEnableKycReOrder,
  isEnablePersonaKycV1,
  isIgnoredCashFlowSubmission,
  isIgnoredKycSubmission
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

    if (
      isEnablePersonaKycV1() &&
      isEnableKycReOrder() &&
      !isIgnoredKycSubmission()
    )
      this._build_IdentityVerificationStep()

    if (!isIgnoredCashFlowSubmission()) this._build_CashFlowVerificationStep()

    this._build_CurrentLoansStep()._build_OperatingExpensesStep()

    this._build_ReviewApplicationStep()

    if (
      isEnablePersonaKycV1() &&
      !isEnableKycReOrder() &&
      !isIgnoredKycSubmission()
    )
      this._build_IdentityVerificationStep()

    return this._build_ConfirmationStep()
  }
}
