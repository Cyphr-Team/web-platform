import { isIgnoredCashFlowSubmission } from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"
import {
  FORM_TYPE,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

export class LoanReadyLoanApplicationStep
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

    this._build_extendedSteps([
      {
        step: LOAN_APPLICATION_STEPS.FORECASTING_SETUP,
        formType: FORM_TYPE.FORECASTING_SETUP,
        label: "Forecasting Setup",
        parent: STEP_MENU.FORECASTING_SETUP,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FINANCIAL_STATEMENTS,
        formType: FORM_TYPE.FINANCIAL_STATEMENTS,
        label: "Financial Statements",
        parent: STEP_MENU.FORECASTING_SETUP,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.REVENUE,
        formType: FORM_TYPE.REVENUE,
        label: "Revenue",
        parent: STEP_MENU.REVENUE_AND_EXPENSES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.PEOPLE,
        formType: FORM_TYPE.PEOPLE,
        label: "People",
        parent: STEP_MENU.REVENUE_AND_EXPENSES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ])

    if (!isIgnoredCashFlowSubmission()) {
      this._build_extendedSteps([
        {
          step: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
          formType: FORM_TYPE.FINANCIAL,
          label: "Cash Flow Verification",
          // Cash flow is in another group, so I re-build it right here
          // instead of use the this._build_CashFlowVerificationStep()
          parent: STEP_MENU.REVENUE_AND_EXPENSES,
          status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        }
      ])
    }

    this._build_extendedSteps([
      {
        step: LOAN_APPLICATION_STEPS.DIRECT_COSTS,
        formType: FORM_TYPE.DIRECT_COSTS,
        label: "Direct Costs",
        parent: STEP_MENU.REVENUE_AND_EXPENSES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
        formType: FORM_TYPE.FP_OPERATING_EXPENSES,
        label: "Operating Expenses",
        parent: STEP_MENU.REVENUE_AND_EXPENSES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.TAX_RATES,
        formType: FORM_TYPE.TAX_RATES,
        label: "Tax Rates",
        parent: STEP_MENU.REVENUE_AND_EXPENSES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ])

    // build step for assets
    this._build_extendedSteps([
      {
        step: LOAN_APPLICATION_STEPS.ASSETS,
        formType: FORM_TYPE.ASSETS,
        label: "Assets",
        parent: STEP_MENU.ASSETS_AND_LIABILITIES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
        formType: FORM_TYPE.DEBT_FINANCING,
        label: "Debt Financing",
        parent: STEP_MENU.ASSETS_AND_LIABILITIES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.EQUITY,
        formType: FORM_TYPE.EQUITY,
        label: "Equity",
        parent: STEP_MENU.ASSETS_AND_LIABILITIES,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ])

    this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
