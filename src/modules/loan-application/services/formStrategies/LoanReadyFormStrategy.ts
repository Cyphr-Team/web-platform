import FormStrategy from "./FormStrategy"

class LoanReadyFormStrategy extends FormStrategy {
  constructor() {
    super()
    /**
     this.forms = [FORM_TYPE.KYB, FORM_TYPE.KYC]
    this.formsComponents = [
        {
            formType: FORM_TYPE.KYB,
            step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
            component: <BusinessInformationForm />,
        },
        {
            formType: FORM_TYPE.KYC,
            step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
            component: <OwnerInformationForm />
        }
    ]
    this.loanType = [LoanType.MICRO] // , LoanType.MCIRO
     */
  }
}

export default LoanReadyFormStrategy
