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
    // Currently, we MUST HAVE ConfirmationStep
    // We will separate them later
    formTypes.forEach((formType) => {
      switch (formType) {
        case FORM_TYPE.LOAN_REQUEST:
          this._build_LoanRequestStep()
          break
        case FORM_TYPE.KYB:
          this._build_BusinessInformationStep()
          break
        case FORM_TYPE.KYC:
          this._build_OwnerInformationStep()
          break
        case FORM_TYPE.FINANCIAL:
          this._build_FinancialInformationStep()
          break
        case FORM_TYPE.CURRENT_LOAN:
          this._build_CurrentLoansStep()
          break
        case FORM_TYPE.CASH_FLOW:
          this._build_CashFlowVerificationStep()
          break
        case FORM_TYPE.OPERATING_EXPENSES:
          this._build_OperatingExpensesStep()
          break
        case FORM_TYPE.IDENTITY_VERIFICATION:
          this._build_IdentityVerificationStep()
          break
        case FORM_TYPE.PRODUCT_SERVICE:
          this._build_ProductServiceStep()
          break
        case FORM_TYPE.MARKET_OPPORTUNITY:
          this._build_MarketOpportunityStep()
          break
        case FORM_TYPE.BUSINESS_MODEL:
          this._build_BusinessModelStep()
          break
        case FORM_TYPE.EXECUTION:
          this._build_ExecutionStep()
          break
        case FORM_TYPE.LAUNCH_KC_FIT:
          this._build_LaunchKCFitStep()
          break
        case FORM_TYPE.PRE_QUALIFICATION:
          this._build_PreQualificationStep()
          break
        case FORM_TYPE.BUSINESS_EIN_LETTER:
          this._build_BusinessEINLetterStep()
          break
        case FORM_TYPE.CERTIFICATE_OF_GOOD_STANDING:
          this._build_CertificateOfGoodStanding()
          break
        case FORM_TYPE.FICTITIOUS_NAME_CERTIFICATION:
          this._build_FictitiousNameCertification()
          break
        case FORM_TYPE.ARTICLES_OF_ORGANIZATION:
          this._build_ArticlesOfOrganization()
          break
        case FORM_TYPE.BY_LAWS:
          this._build_ByLaws()
          break
        case FORM_TYPE.REVIEW_APPLICATION:
          this._build_ReviewApplicationStep()
          break
        default:
          break
      }
    })

    return this._build_ConfirmationStep()
  }
}
