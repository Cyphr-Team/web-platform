import { LoanType } from "@/types/loan-program.type"
import { FORM_TYPE } from "../../constants/type"
import { ReactNode } from "react"
import { LOAN_APPLICATION_STEPS } from "../../constants"

interface FormComponent {
  formType: FORM_TYPE
  step: LOAN_APPLICATION_STEPS
  component: ReactNode
}
abstract class FormStrategy {
  public forms: FORM_TYPE[] = []
  public formsComponents: FormComponent[] = []
  public loanType: LoanType[] = []
}

export default FormStrategy
