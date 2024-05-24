import { LoanApplicationStep, ILoanApplicationStepStrategy } from "./base"

export class CyphrLoanApplicationStep
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
      ._build_CurrentLoansStep()
      ._build_OpertaingExpensesStep()
      ._build_ConfirmationStep()
  }
}
