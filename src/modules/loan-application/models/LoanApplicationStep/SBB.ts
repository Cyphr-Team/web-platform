import {
  isEnablePersonaKycV1,
  isEnableReviewApplicationStep
} from "@/utils/feature-flag.utils"
import { ILoanApplicationStepStrategy, LoanApplicationStep } from "./base"

export class SBBLoanApplicationStep
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

    if (isEnablePersonaKycV1()) this._build_IdentityVerificationStep()

    this._build_FinancialInformationStep()
      ._build_CurrentLoansStep()
      ._build_OperatingExpensesStep()

    this._build_BusinessEINLetterStep()
      ._build_CertificateOfGoodStanding()
      ._build_FictitiousNameCertification()
      ._build_ArticlesOfOrganization()
      ._build_ByLaws()

    if (isEnableReviewApplicationStep()) this._build_ReviewApplicationStep()

    return this._build_ConfirmationStep()
  }
}
