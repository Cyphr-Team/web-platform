import FormStrategy from "./FormStrategy"

class SmbFormStrategy extends FormStrategy {
  constructor() {
    super()
    /**
      this.forms = [FORM_TYPE.KYB, FORM_TYPE.KYC, FORM_TYPE.FINANCIAL]
    this.formsComponents = [
        {
            formType: FORM_TYPE.KYB,
            step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
            component: <BusinessInformationForm />
        },
        {
            formType: FORM_TYPE.KYC,
            step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
            component: <OwnerInformationForm />
        },
        {
            formType: FORM_TYPE.FINANCIAL,
            step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
            component: <FinancialInformationForm />
        }
    ]
    this.loanType = [LoanType.READINESS] // , LoanType.MCIRO

     */
  }
}

export default SmbFormStrategy
