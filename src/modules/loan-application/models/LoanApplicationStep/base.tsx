import { uniqBy } from "lodash"
import {
  FORM_TYPE,
  ILoanApplicationStep,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
  STEP_MENU
} from "./type"
import { isEnableKycReOrder } from "@/utils/feature-flag.utils"

export interface ILoanApplicationStepStrategy {
  isEnabledKycReOrder: boolean

  _buildSteps(): this
}

export class LoanApplicationStep {
  isEnabledKycReOrder = isEnableKycReOrder()
  #steps: ILoanApplicationStep[] = []

  _build_PreQualificationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.PRE_QUALIFICATION,
          formType: null,
          label: "Pre Qualification",
          parent: STEP_MENU.PRE_QUALIFICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_BusinessEINLetterStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER,
          formType: null,
          label: "Business EIN Letter",
          parent: STEP_MENU.DOCUMENTATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_CertificateOfGoodStanding(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING,
          formType: null,
          label: "Certificate of Good Standing",
          parent: STEP_MENU.DOCUMENTATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_FictitiousNameCertification(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION,
          formType: null,
          label: "Fictitious Name Certification",
          parent: STEP_MENU.DOCUMENTATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_ArticlesOfOrganization(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION,
          formType: null,
          label: "Articles of Organization and Operating Agreement",
          parent: STEP_MENU.DOCUMENTATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_ByLaws(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.BY_LAWS,
          formType: null,
          label: "By laws",
          parent: STEP_MENU.DOCUMENTATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_LoanRequestStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
          formType: null,
          label: "Loan Request",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_BusinessInformationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
          formType: FORM_TYPE.KYB,
          label: "Business Information",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_OwnerInformationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
          formType: FORM_TYPE.KYC,
          label: "Individual Information",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_CashFlowVerificationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
          formType: FORM_TYPE.FINANCIAL,
          label: "Cash Flow Verification",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_FinancialInformationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
          formType: FORM_TYPE.FINANCIAL,
          label: "Financial Information",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_CurrentLoansStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
          formType: FORM_TYPE.CURRENT_LOAN,
          label: "Current Loans",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_OperatingExpensesStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
          formType: FORM_TYPE.OPERATING_EXPENSES,
          label: "Operating Expenses",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_ConfirmationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.CONFIRMATION,
          formType: null,
          label: "Sign and Submit",
          parent: STEP_MENU.SIGNATURE,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_IdentityVerificationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION,
          formType: null,
          label: "Identity Verification",
          parent: this.isEnabledKycReOrder
            ? STEP_MENU.APPLICATION
            : STEP_MENU.SIGNATURE,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_ReviewApplicationStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION,
          formType: null,
          label: "Review Application",
          parent: STEP_MENU.SIGNATURE,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_ProductServiceStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.PRODUCT_SERVICE,
          formType: FORM_TYPE.PRODUCT_SERVICE,
          label: "Product and Service",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_MarketOpportunityStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY,
          formType: FORM_TYPE.MARKET_OPPORTUNITY,
          label: "Market Opportunity",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_BusinessModelStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.BUSINESS_MODEL,
          formType: FORM_TYPE.BUSINESS_MODEL,
          label: "Business Model",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_ExecutionStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.EXECUTION,
          formType: FORM_TYPE.EXECUTION,
          label: "Execution",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_BusinessDocumentsStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS,
          formType: FORM_TYPE.DOCUMENT_UPLOADS,
          label: "Document Uploads",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_LaunchKCFitStep(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT,
          formType: FORM_TYPE.LAUNCH_KC_FIT,
          label: "LaunchKC Fit",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )

    return this
  }

  _build_BusinessInformationStepPartOne(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE,
          formType: FORM_TYPE.KYB,
          label: "Business Information (part 1)",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  _build_BusinessInformationStepPartTwo(): this {
    this.#steps = uniqBy(
      [
        ...this.#steps,
        {
          step: LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO,
          formType: FORM_TYPE.KYB,
          label: "Business Information (part 2)",
          parent: STEP_MENU.APPLICATION,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ],
      "step"
    )
    return this
  }

  getSteps(): ILoanApplicationStep[] {
    return this.#steps
  }
}
