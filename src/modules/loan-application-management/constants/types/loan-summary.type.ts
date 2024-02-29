import { LoanApplicationsKyb } from "../type"
import { LoanApplicationsKyc } from "./kyc"

enum SummaryCollectStatus {
  UNKNOWN = "UNKNOWN",
  COLLECTED = "COLLECTED",
  UNCOLLECTED = "UNCOLLECTED",
  UNCHECKED = "UNCHECKED"
}

export { SummaryCollectStatus }

type SummaryBusinessPlan = {
  threeYear: SummaryCollectStatus
  fiveYear: SummaryCollectStatus
}

type SummaryFinancialStatements = {
  balanceSheetHistorical: SummaryCollectStatus
  balanceSheetProjected: SummaryCollectStatus
  incomeStatementHistorical: SummaryCollectStatus
  incomeStatementProjected: SummaryCollectStatus
  cashFlowStatementHistorical: SummaryCollectStatus
  cashFlowStatementProjected: SummaryCollectStatus
}

type SummarySba7aForms = {
  sbaForm1919: SummaryCollectStatus
  sbaForm912: SummaryCollectStatus
  sbaForm413: SummaryCollectStatus
}

type SummaryCollateralDocumentation = {
  inventoryValuations: SummaryCollectStatus
  vehicleRegistrationCertificate: SummaryCollectStatus
  businessLeaseAgreement: SummaryCollectStatus
  purchaseOrders: SummaryCollectStatus
  realEstatePropertyDeed: SummaryCollectStatus
}

type SummaryCashFlowDocumentation = {
  businessTaxReturns: SummaryCollectStatus
  bankStatements: SummaryCollectStatus
  listOfOutstandingBusinessDebts: SummaryCollectStatus
}

type LoanSummary = {
  businessInfo: Pick<
    LoanApplicationsKyb,
    | "businessName"
    | "tax"
    | "formation"
    | "officeAddresses"
    | "tax"
    | "phoneNumber"
  >
  businessPlan: SummaryBusinessPlan
  financialStatements: SummaryFinancialStatements
  sba7aForms: SummarySba7aForms
  cashFlowDocumentation: SummaryCashFlowDocumentation
  collateralDocumentation: SummaryCollateralDocumentation
} & Pick<LoanApplicationsKyc, "personalInfo" | "idCheck" | "checkLists">

export type { LoanSummary }
