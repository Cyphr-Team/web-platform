import { Institution } from "@/constants/tenant.constants"
import { CyphrLoanApplicationStep } from "./Cyphr"
import { DefaultLoanApplicationStep } from "./Default"
import { KCChamberLoanApplicationStep } from "./KCChamber"
import { LoanReadyLoanApplicationStep } from "./LoanReady"
import { CapsightLoanApplicationStep } from "./Capsight"
import { SBBLoanApplicationStep } from "./SBB"
import { LaunchKCLoanApplicationStep } from "./LaunchKC"
import { matchSubdomain } from "@/utils/domain.utils"
import { KansasCityLoanApplicationStep } from "./KansasCity"

export class LoanApplicationStepStrategy {
  institutionLoanApplicationSteps = {
    [Institution.KCChamber]: KCChamberLoanApplicationStep,
    [Institution.CyphrV2]: CyphrLoanApplicationStep,
    [Institution.LoanReady]: LoanReadyLoanApplicationStep,
    [Institution.Capsight]: CapsightLoanApplicationStep,
    [Institution.LaunchKC]: LaunchKCLoanApplicationStep,
    [Institution.SBB]: SBBLoanApplicationStep,
    [Institution.KansasCity]: KansasCityLoanApplicationStep
  }
  #strategy

  /**
   * [options] params is optional, use for adding more data to constructor of each tenant
   * Look at constructor of SBBLoanApplicationStep for more detail
   * */
  constructor(institution: Institution, options?: unknown) {
    for (const [key, LoanApplicationStep] of Object.entries(
      this.institutionLoanApplicationSteps
    )) {
      if (matchSubdomain(institution, key)) {
        this.#strategy = new LoanApplicationStep(options)
        return
      }
    }
    this.#strategy = new DefaultLoanApplicationStep()
  }

  getStrategy() {
    return this.#strategy
  }
}
