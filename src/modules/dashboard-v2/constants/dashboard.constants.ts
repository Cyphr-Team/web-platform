import { TimeRangeValue } from "@/types/time-range.type"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { type DashboardState, type CCStatsResponse } from "../types/stats.types"
import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"

const QUERY_KEY = {
  /**
   * Use for invalidate all the api in dashboard v2
   */
  DASHBOARD_V2: "DASHBOARD_V2",

  INSTITUTION_USAGE: "INSTITUTION_USAGE",
  LOAN_APPLICATION_RATES: "LOAN_APPLICATION_RATES",
  AVERAGE_LOAN_SIZE: "AVERAGE_LOAN_SIZE",
  AGGREGATE_ARPPOVED_LOAN_AMOUNT: "AGGREGATE_ARPPOVED_LOAN_AMOUNT",
  AVERAGE_APPROVAL_RATE: "AVERAGE_APPROVAL_RATE",
  AVERAGE_TIME_TO_APPROVAL: "AVERAGE_TIME_TO_APPROVAL",
  LOAN_APPLICATION_ACTIVITIES: "LOAN_APPLICATION_ACTIVITIES",
  INSTITUTION_ACTIVITIES: "INSTITUTION_ACTIVITIES",
  AVERAGE_TIME_TO_DECISION: "AVERAGE_TIME_TO_DECISION",
  AVERAGE_APPROVED_LOAN_AMOUNT: "AVERAGE_APPROVED_LOAN_AMOUNT"
}

const DEFAULT_DASHBOARD_STATE: DashboardState = {
  filter: {
    timeRange: {
      selectedTimeRange: TimeRangeValue.THIS_MONTH,
      ...getTimeRangeDates(TimeRangeValue.THIS_MONTH)
    }
  },
  approvalRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageLoanSizeFrequency: GRAPH_FREQUENCY.MONTHLY,
  portfolioGrowthFrequency: GRAPH_FREQUENCY.MONTHLY,
  loanApplicationActivitiesFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageTimeToDecisionFrequency: GRAPH_FREQUENCY.MONTHLY,
  averageApprovedLoanAmountFrequency: GRAPH_FREQUENCY.MONTHLY,
  loanApplicationRatesFrequency: GRAPH_FREQUENCY.MONTHLY,
  loanProgramIds: []
}

const LABEL_CONFIG = {
  fontSize: 12,
  position: "top",
  fontWeight: "500",
  fill: "black"
} as const

const CARTESIAN_GRID = {
  strokeDasharray: "3 3",
  vertical: false
}

const CHART_DEFAULT = {
  fontSize: 12,
  submittedColor: "#4A86E8",
  closedColor: "#000000",
  deniedColor: "#EA4335",
  approvedColor: "#34A853",
  inreviewColor: "#FBBC04",
  draftColor: "#B3B3B3",
  draftLineColor: "#B3B3B3",
  approvalLineColor: "#34A853",
  deniedLineColor: "#EA4335"
}

// TODO: another way to code simpler, using a const enum
const CC_DASHBOARD_CARDS: {
  status: LoanApplicationStatus
  valueMapping: keyof CCStatsResponse
}[] = [
  {
    status: LoanApplicationStatus.DRAFT,
    valueMapping: "totalDraft"
  },
  {
    status: LoanApplicationStatus.SUBMITTED,
    valueMapping: "totalSubmitted"
  },
  {
    status: LoanApplicationStatus.READY_FOR_REVIEW,
    valueMapping: "totalReadyForReview"
  },
  {
    status: LoanApplicationStatus.IN_REVIEW,
    valueMapping: "totalApplicationInReview"
  },
  {
    status: LoanApplicationStatus.CCC_APPLICATION_MISSING_INFO,
    valueMapping: "totalApplicationMissingInfo"
  },
  {
    status: LoanApplicationStatus.CCC_READY_FOR_UNDERWRITING,
    valueMapping: "totalReadyForUnderwriting"
  },
  {
    status: LoanApplicationStatus.CCC_UNDERWRITING,
    valueMapping: "totalUnderwriting"
  },
  {
    status: LoanApplicationStatus.CCC_APPROVED,
    valueMapping: "totalApproved"
  },
  {
    status: LoanApplicationStatus.CCC_DECLINED,
    valueMapping: "totalDeclined"
  },
  {
    status: LoanApplicationStatus.CCC_AGREEMENT_REQUESTED,
    valueMapping: "totalAgreementRequested"
  },
  {
    status: LoanApplicationStatus.CCC_AGREEMENT_SENT,
    valueMapping: "totalAgreementSent"
  },
  {
    status: LoanApplicationStatus.CCC_AGREEMENT_SIGNED,
    valueMapping: "totalAgreementSigned"
  },
  {
    status: LoanApplicationStatus.CCC_FUNDED,
    valueMapping: "totalFunded"
  }
]

export {
  QUERY_KEY,
  DEFAULT_DASHBOARD_STATE,
  LABEL_CONFIG,
  CARTESIAN_GRID,
  CHART_DEFAULT,
  CC_DASHBOARD_CARDS
}
