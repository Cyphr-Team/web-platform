import {
  isIgnoredCashFlowSubmission,
  isIgnoredKycSubmission
} from "@/utils/feature-flag.utils"
import { type ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"
import {
  FORM_TYPE,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

export class CapitalCollabLoanApplicationStep
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

    if (!isIgnoredKycSubmission()) this._build_IdentityVerificationStep()

    if (!isIgnoredCashFlowSubmission()) this._build_CashFlowVerificationStep()

    this._build_extendedSteps([
      {
        step: LOAN_APPLICATION_STEPS.DIRECT_COSTS,
        formType: FORM_TYPE.DIRECT_COSTS,
        label: "Direct Costs",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
        formType: FORM_TYPE.FP_OPERATING_EXPENSES,
        label: "Operating Expenses",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.ASSETS,
        formType: FORM_TYPE.ASSETS,
        label: "Assets",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
        formType: FORM_TYPE.DEBT_FINANCING,
        label: "Debt Financing",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ])

    this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
