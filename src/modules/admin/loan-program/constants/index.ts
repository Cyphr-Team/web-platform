import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const FormDescription = {
  [FORM_TYPE.KYB]: "Verifying the identity and legitimacy of a business.",
  [FORM_TYPE.KYC]: "Verifying the identity of clients.",
  [FORM_TYPE.FINANCIAL]: "Pertaining to financial status and activities.",
  [FORM_TYPE.CASH_FLOW]: "Movement of money into and out of a business.",
  [FORM_TYPE.OPERATING_EXPENSES]: "Costs for daily business operations.",
  [FORM_TYPE.IDENTITY_VERIFICATION]:
    "Confirming an individual's or entity's identity",
  [FORM_TYPE.REVIEW_APPLICATION]: "Information about operating expenses.",
  [FORM_TYPE.CURRENT_LOAN]: "An existing loan being paid off."
}
