import {
  isEnablePersonaKycV1,
  isEnableReviewApplicationStep
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"
import { FORM_TYPE } from "./type"

export class ConfigurationLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  constructor(formTypes: FORM_TYPE[] = []) {
    super()
    this._buildSteps(formTypes)
  }

  _buildSteps(formTypes: FORM_TYPE[] = []) {
    this._build_LoanRequestStep()
    formTypes.forEach((formType) => {
      switch (formType) {
        case FORM_TYPE.KYB:
          this._build_BusinessInformationStep()
          break
        case FORM_TYPE.KYC:
          this._build_OwnerInformationStep()
          break
        case FORM_TYPE.FINANCIAL:
          this._build_FinancialInformationStep()
          break
        case FORM_TYPE.CURRENT_LOANS:
          this._build_CurrentLoansStep()
          break
        case FORM_TYPE.CASH_FLOW:
          this._build_CashFlowVerificationStep()
          break
        case FORM_TYPE.OPERATING_EXPENSES:
          this._build_OperatingExpensesStep()
          break
        case FORM_TYPE.IDENTITY_VERIFICATION:
          isEnablePersonaKycV1() && this._build_IdentityVerificationStep()
          break
        case FORM_TYPE.REVIEW_APPLICATION:
          isEnableReviewApplicationStep() && this._build_ReviewApplicationStep()
          break
        default:
          break
      }
    })

    return this._build_ConfirmationStep()
  }
}
