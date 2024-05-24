import { LoanApplicationStep, ILoanApplicationStepStrategy } from "./base"

export class LoanReadyLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  constructor() {
    super()
    this._buildSteps()
  }

  _buildSteps() {
    return this._build_LoanRequestStep()
      ._build_BusinessInformationStep()
      ._build_OwnerInformationStep()
      ._build_CashFlowVerification()
      ._build_ConfirmationStep()
  }
}
