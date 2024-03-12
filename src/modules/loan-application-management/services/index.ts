import { DotVariantProps } from "@/components/ui/dot"
import { LoanApplicationStatus, UseOfLoan } from "@/types/loan-application.type"
import {
  AUTHENTICITY_LEVEL,
  KYB_VERIFIED_FIELD_STATUS
} from "../constants/type"
import { KYC_STATUS } from "../constants/types/kyc"

export const getClassNameFromStatus = (
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS | AUTHENTICITY_LEVEL
) => {
  switch (status) {
    case KYB_VERIFIED_FIELD_STATUS.SUCCESS:
    case KYC_STATUS.PASSED:
    case KYC_STATUS.VERIFIED:
    case AUTHENTICITY_LEVEL.HIGH:
      return "success"
    case KYB_VERIFIED_FIELD_STATUS.FAILURE:
    case KYB_VERIFIED_FIELD_STATUS.UNKNOWN:
    case KYC_STATUS.FAILED:
    case KYC_STATUS.UNKNOWN:
    case AUTHENTICITY_LEVEL.LOW:
      return "error"
    case KYC_STATUS.UNCHECKED:
    case KYC_STATUS.UNVERIFIED:
    case KYB_VERIFIED_FIELD_STATUS.WARNING:
    case AUTHENTICITY_LEVEL.MEDIUM:
      return "warning"
    default:
      return "warning"
  }
}

export const getBadgeVariantByStatus = (status?: LoanApplicationStatus) => {
  const statusUppercase = status?.toUpperCase()
  switch (statusUppercase) {
    case LoanApplicationStatus.SUBMITTED:
      return "blue"
    case LoanApplicationStatus.DENIED:
      return "red"
    case LoanApplicationStatus.IN_REVIEW:
      return "yellow"
    case LoanApplicationStatus.APPROVED:
      return "green"
    default:
      return undefined
  }
}

export const getBadgeVariantByAuthenticityScore = (score: number) => {
  if (score > 50) return "green"
  else if (score < 50) return "red"
  else return "yellow"
}

const buildDecisionInfo = (
  variantColor: DotVariantProps["variantColor"],
  label: string,
  value: LoanApplicationStatus | null
) => ({
  variantColor,
  label,
  value
})

export const getSelectInfoByDecision = (decision?: LoanApplicationStatus) => {
  switch (decision) {
    case LoanApplicationStatus.APPROVED:
      return buildDecisionInfo(
        "green",
        "Approved",
        LoanApplicationStatus.APPROVED
      )
    case LoanApplicationStatus.DENIED:
      return buildDecisionInfo("red", "Denied", LoanApplicationStatus.DENIED)
    default:
      return buildDecisionInfo("yellow", "In Review", null)
  }
}

export const getUseOfLoan = (useOfLoan?: UseOfLoan) => {
  switch (useOfLoan) {
    case UseOfLoan.EQUIPMENT:
      return "Equipment Purchase"
    case UseOfLoan.GROWTH_OPPORTUNITIES:
      return "Growth Opportunities"
    case UseOfLoan.MATERIALS:
      return "Materials"
    case UseOfLoan.OTHER:
      return "Other"
    case UseOfLoan.STARTUP_COSTS:
      return "Startup Costs"
    case UseOfLoan.WORKING_CAPITAL:
      return "Working Capital"
    default:
      return ""
  }
}

export const getBankruptcyByChapter = (chapter?: number) => {
  const defaultChapter = {
    displayChapter: `Chapter ${chapter}`,
    title: "N/A",
    description: "N/A",
    link: ""
  }

  if (!chapter) return defaultChapter

  return (
    {
      7: {
        displayChapter: "Chapter 7",
        title: "Chapter 7: Liquidation Under the Bankruptcy Code",
        description:
          'The chapter of the Bankruptcy Code providing for "liquidation," ( i.e., the sale of a debtor\'s nonexempt property and the distribution of the proceeds to creditors.)',
        link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-7-bankruptcy-basics"
      },
      9: {
        displayChapter: "Chapter 9",
        title: "Chapter 9: Municipal Bankruptcy",
        description:
          "The chapter of the Bankruptcy Code providing for reorganization of municipalities (which includes cities and towns, as well as villages, counties, taxing districts, municipal utilities, and school districts).",
        link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-9-bankruptcy-basics"
      },
      11: {
        displayChapter: "Chapter 11",
        title: "Chapter 11: Reorganization Under the Bankruptcy Code",
        description:
          "The chapter of the Bankruptcy Code providing (generally) for reorganization, usually involving a corporation or partnership. (A chapter 11 debtor usually proposes a plan of reorganization to keep its business alive and pay creditors over time. People in business or individuals can also seek relief in chapter 11.)",
        link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-11-bankruptcy-basics"
      },
      12: {
        displayChapter: "Chapter 12",
        title:
          "Chapter 12: Family Farmer Bankruptcy or Family Fisherman Bankruptcy",
        description:
          'The chapter of the Bankruptcy Code providing for adjustment of debts of a "family farmer," or a "family fisherman" as those terms are defined in the Bankruptcy Code.',
        link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-12-bankruptcy-basics"
      },
      13: {
        displayChapter: "Chapter 13",
        title: "Chapter 13: Individual Debt Adjustment",
        description:
          "The chapter of the Bankruptcy Code providing for adjustment of debts of an individual with regular income. (Chapter 13 allows a debtor to keep property and pay debts over time, usually three to five years.)",
        link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-13-bankruptcy-basics"
      },
      15: {
        displayChapter: "Chapter 15",
        title: "Chapter 15: Ancillary and Other Cross-Border Cases",
        description:
          "The purpose of Chapter 15, and the Model Law on which it is based, is to provide effective mechanisms for dealing with insolvency cases involving debtors, assets, claimants, and other parties of interest involving more than one country.",
        link: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics/chapter-15-bankruptcy-basics"
      }
    }[chapter] ?? defaultChapter
  )
}

export const getApplicationTipByStatus = (
  status?: LoanApplicationStatus,
  isLoanProgramDeleted?: boolean
) => {
  if (isLoanProgramDeleted) return "This application is no longer available."

  switch (status?.toUpperCase()) {
    case LoanApplicationStatus.APPROVED:
    case LoanApplicationStatus.DENIED:
      return "This application is already underwritten."
    case LoanApplicationStatus.IN_REVIEW:
      return ""
    default:
      return "This application is in processing with 3rd party."
  }
}

export const getAuthenticityDataByScore = (score: number) => {
  if (score >= 80) {
    return {
      authenticityLevel: AUTHENTICITY_LEVEL.HIGH,
      description:
        "We did not find evidence of tampering / fraud on this document.",
      authenticityLevelColor: "#00A86B"
    }
  } else if (score >= 50 && score < 80) {
    return {
      authenticityLevel: AUTHENTICITY_LEVEL.MEDIUM,
      description:
        "We recommend manually reviewing this document as suspicious signals were found.",
      authenticityLevelColor: "#FFA500"
    }
  } else {
    return {
      authenticityLevel: AUTHENTICITY_LEVEL.LOW,
      description:
        "Based on the below reason codes, we do not believe this document to be authentic.",
      authenticityLevelColor: "#FF0000"
    }
  }
}
