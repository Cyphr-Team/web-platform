import {
  isEnablePersonaKycV1,
  isEnableReviewApplicationStep,
  isIgnoredCashFlowSubmission,
  isIgnoredKycSubmission
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"
import { LoanProgramData } from "@/modules/loan-application/constants/type.ts"

const CURRENT_PROGRAM_KEY = "CURRENT_LOAN_PROGRAM"
const PROGRAM = {
  TERM_LOAN: "SBB_TERM_LOAN",
  BUSINESS_BANK_ACCOUNT: "SBB_BUSINESS_ACCOUNTS"
}

export class SBBLoanApplicationStep
  extends LoanApplicationStep
  implements ILoanApplicationStepStrategy
{
  #targetProgram

  constructor(program: unknown) {
    super()
    // must type cast here to use
    this.#targetProgram = (program as LoanProgramData)?.id
    if (this.#targetProgram !== undefined) {
      localStorage.setItem(CURRENT_PROGRAM_KEY, this.#targetProgram)
    } else {
      this.#targetProgram = localStorage.getItem(CURRENT_PROGRAM_KEY)
    }

    this._buildSteps()
  }

  _buildSteps() {
    if (this.#targetProgram === PROGRAM.TERM_LOAN) {
      this._build_LoanRequestStep()
    }

    this._build_BusinessInformationStepPartOne()._build_BusinessInformationStepPartTwo()

    this._build_OwnerInformationStep()

    if (isEnablePersonaKycV1() && !isIgnoredKycSubmission())
      this._build_IdentityVerificationStep()

    if (!isIgnoredCashFlowSubmission()) this._build_CashFlowVerificationStep()

    this._build_CurrentLoansStep()._build_OperatingExpensesStep()

    this._build_BusinessEINLetterStep()
      ._build_CertificateOfGoodStanding()
      ._build_FictitiousNameCertification()
      ._build_ArticlesOfOrganization()
      ._build_ByLaws()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
