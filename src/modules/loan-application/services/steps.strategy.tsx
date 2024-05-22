import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "../constants"
import { ApplicationStep } from "../constants/type"

abstract class StepStrategy {
  protected steps: ApplicationStep[] = []

  abstract generateSteps(): ApplicationStep[]

  constructor() {
    this.generateSteps()
  }

  getSteps(): ApplicationStep[] {
    return this.steps
  }

  getStep(step: string): ApplicationStep | undefined {
    return this.steps.find((stepItem) => stepItem.step === step)
  }

  getStatus(step: string): boolean {
    const stepItem = this.getStep(step)
    return stepItem?.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
  }
}

class MicroLoanStepStrategy extends StepStrategy {
  generateSteps(): ApplicationStep[] {
    this.steps = [
      {
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
        nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        label: "Loan Request",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        label: "Business Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        label: "Owner Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.CONFIRMATION,
        label: "Financial Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
        label: "Signature and Submission",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]
    return this.steps
  }
}

class ReadinessStepStrategy extends StepStrategy {
  generateSteps(): ApplicationStep[] {
    this.steps = [
      {
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
        nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        label: "Loan Request",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        label: "Business Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        label: "Individual Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.CONFIRMATION,
        label: "Cash Flow Verification",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
        label: "Review and Sign",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]
    return this.steps
  }
}

class CyphrV2StepStrategy extends StepStrategy {
  generateSteps(): ApplicationStep[] {
    this.steps = [
      {
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
        nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        label: "Loan Request",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        label: "Business Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        label: "Individual Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        nextStep: isEnableCashFlowV2()
          ? LOAN_APPLICATION_STEPS.CURRENT_LOANS
          : LOAN_APPLICATION_STEPS.CONFIRMATION,
        label: "Cash Flow Verification",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        previousStep: isEnableCashFlowV2()
          ? LOAN_APPLICATION_STEPS.OPERATING_EXPENSES
          : LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
        label: "Review and Sign",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]
    if (isEnableCashFlowV2()) {
      this.steps.splice(4, 0, {
        step: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        label: "Current Loans",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      })
      this.steps.splice(5, 0, {
        step: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        previousStep: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        nextStep: LOAN_APPLICATION_STEPS.CONFIRMATION,
        label: "Operating Expenses",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      })
    }
    return this.steps
  }
}

class LenderForumStepStrategy extends StepStrategy {
  generateSteps(): ApplicationStep[] {
    this.steps = [
      {
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
        nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        label: "Loan Request",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        label: "Business Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        label: "Individual Information",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        nextStep: isEnableCashFlowV2()
          ? LOAN_APPLICATION_STEPS.CURRENT_LOANS
          : LOAN_APPLICATION_STEPS.CONFIRMATION,
        label: "Cash Flow Verification",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      },
      {
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        previousStep: isEnableCashFlowV2()
          ? LOAN_APPLICATION_STEPS.OPERATING_EXPENSES
          : LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
        label: "Review and Sign",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]
    if (isEnableCashFlowV2()) {
      this.steps.splice(4, 0, {
        step: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        nextStep: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        label: "Current Loans",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      })
      this.steps.splice(5, 0, {
        step: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        previousStep: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        nextStep: LOAN_APPLICATION_STEPS.CONFIRMATION,
        label: "Operating Expenses",
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      })
    }
    return this.steps
  }
}

export {
  MicroLoanStepStrategy,
  ReadinessStepStrategy,
  CyphrV2StepStrategy,
  LenderForumStepStrategy
}
