import { Institution } from "@/constants/tenant.constants"
import { CyphrLoanApplicationStep } from "./Cyphr"
import { DefaultLoanApplicationStep } from "./Default"
import { KCChamberLoanApplicationStep } from "./KCChamber"
import { LoanReadyLoanApplicationStep } from "./LoanReady"
import { CapsightLoanApplicationStep } from "./Capsight"
import { SBBLoanApplicationStep } from "./SBB"

export class LoanApplicationStepStrategy {
  #strategy

  constructor(institution: Institution) {
    switch (institution) {
      case Institution.KCChamber:
        this.#strategy = new KCChamberLoanApplicationStep()
        break
      case Institution.CyphrV2:
        this.#strategy = new CyphrLoanApplicationStep()
        break
      case Institution.LoanReady:
        this.#strategy = new LoanReadyLoanApplicationStep()
        break
      case Institution.Capsight:
        this.#strategy = new CapsightLoanApplicationStep()
        break
      case Institution.SBB:
        this.#strategy = new SBBLoanApplicationStep()
        break
      default:
        this.#strategy = new DefaultLoanApplicationStep()
    }
  }

  getStrategy() {
    return this.#strategy
  }
}
