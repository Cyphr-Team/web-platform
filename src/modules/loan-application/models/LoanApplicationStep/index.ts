import { Institution } from "@/constants/tenant.constants"
import { CyphrLoanApplicationStep } from "./Cyphr"
import { DefaultLoanApplicationStep } from "./Default"
import { KCChamberLoanApplicationStep } from "./KCChamber"
import { LoanReadyLoanApplicationStep } from "./LoanReady"
import { CapsightLoanApplicationStep } from "./Capsight"
import { SBBLoanApplicationStep } from "./SBB"
import { LaunchKCLoanApplicationStep } from "./LaunchKC"
import { matchSubdomain } from "@/utils/domain.utils"

export class LoanApplicationStepStrategy {
  #strategy

  institutionLoanApplicationSteps = {
    [Institution.KCChamber]: KCChamberLoanApplicationStep,
    [Institution.CyphrV2]: CyphrLoanApplicationStep,
    [Institution.LoanReady]: LoanReadyLoanApplicationStep,
    [Institution.Capsight]: CapsightLoanApplicationStep,
    [Institution.LaunchKC]: LaunchKCLoanApplicationStep,
    [Institution.SBB]: SBBLoanApplicationStep
  }

  constructor(institution: Institution) {
    for (const [key, LoanApplicationStep] of Object.entries(
      this.institutionLoanApplicationSteps
    )) {
      if (matchSubdomain(institution, key)) {
        this.#strategy = new LoanApplicationStep()
        return
      }
    }
    this.#strategy = new DefaultLoanApplicationStep()
  }

  getStrategy() {
    return this.#strategy
  }
}
