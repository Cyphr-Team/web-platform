import { ReactNode } from "react"
import { LOAN_APPLICATION_STEPS } from "../constants"
import { FORM_TYPE } from "../constants/type"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { BusinessInformationForm } from "../components/organisms/BusinessInformationForm"
import { OwnerInformationForm } from "../components/organisms/OwnerInformationForm"
import { ConfirmationForm } from "../components/organisms/ConfirmationForm"
import { CashFlowVerificationForm } from "../components/organisms/CashFlowVerificationForm"
import { FinancialInformationForm } from "../components/organisms/FinancialInformationForm"
import { CurrentLoansForm } from "../components/organisms/CurrentLoansForm"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"
import { OperatingExpensesForm } from "../components/organisms/OperatingExpensesForm"

interface FormComponent<T extends ReactNode> {
  formType: FORM_TYPE | null
  step: string
  component: T
}

abstract class FormStrategy {
  protected formsComponents: FormComponent<ReactNode>[] = []

  abstract generateComponents(): FormComponent<ReactNode>[]

  constructor() {
    this.generateComponents()
  }

  getFormComponents(): FormComponent<ReactNode>[] {
    return this.formsComponents
  }

  getFormComponent(step: string): FormComponent<ReactNode> | undefined {
    return this.formsComponents.find(
      (formComponent) => formComponent.step === step
    )
  }
}

class MicroLoanFormStrategy extends FormStrategy {
  generateComponents(): FormComponent<ReactNode>[] {
    this.formsComponents = [
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        component: <LoanRequest />
      },
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
        formType: FORM_TYPE.KYC,
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        component: <FinancialInformationForm />
      },
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        component: <ConfirmationForm />
      }
    ]
    return this.formsComponents
  }
}

class ReadinessLoanFormStrategy extends FormStrategy {
  generateComponents(): FormComponent<ReactNode>[] {
    this.formsComponents = [
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        component: <LoanRequest />
      },
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
        formType: FORM_TYPE.KYC,
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        component: <CashFlowVerificationForm />
      },
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        component: <ConfirmationForm />
      }
    ]
    return this.formsComponents
  }
}

class CyphrV2LoanFormStrategy extends FormStrategy {
  generateComponents(): FormComponent<ReactNode>[] {
    this.formsComponents = [
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        component: <LoanRequest />
      },
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
        formType: FORM_TYPE.KYC,
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        component: <CashFlowVerificationForm />
      },
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        component: <ConfirmationForm />
      }
    ]
    if (isEnableCashFlowV2()) {
      this.formsComponents.splice(4, 0, {
        formType: FORM_TYPE.CURRENT_LOANS,
        step: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        component: <CurrentLoansForm />
      })
      this.formsComponents.splice(5, 0, {
        formType: FORM_TYPE.OPERATING_EXPENSES,
        step: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        component: <OperatingExpensesForm />
      })
    }
    return this.formsComponents
  }
}

class LenderForumLoanFormStrategy extends FormStrategy {
  generateComponents(): FormComponent<ReactNode>[] {
    this.formsComponents = [
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        component: <LoanRequest />
      },
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
      },
      {
        formType: null,
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        component: <ConfirmationForm />
      }
    ]
    if (isEnableCashFlowV2()) {
      this.formsComponents.splice(4, 0, {
        formType: FORM_TYPE.CURRENT_LOANS,
        step: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        component: <CurrentLoansForm />
      })
      this.formsComponents.splice(5, 0, {
        formType: FORM_TYPE.OPERATING_EXPENSES,
        step: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        component: <OperatingExpensesForm />
      })
    }
    return this.formsComponents
  }
}

export {
  FormStrategy,
  MicroLoanFormStrategy,
  ReadinessLoanFormStrategy,
  CyphrV2LoanFormStrategy,
  LenderForumLoanFormStrategy
}
