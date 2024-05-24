import { LoanApplicationStep, ILoanApplicationStepStrategy } from "./base"

export class CapsightLoanApplicationStep
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
      ._build_FinancialInformationStep()
      ._build_ConfirmationStep()
  }
}
