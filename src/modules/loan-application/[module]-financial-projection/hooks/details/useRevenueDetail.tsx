import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { CHARGE_FREQUENCIES } from "@/modules/loan-application/[module]-financial-projection/components/store/recurring-charges-store"
import {
  type FinancialApplicationDetailData,
  type FinancialApplicationFormDetailData
} from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  RevenueResponseType,
  type SubmitRevenueStreamResponse
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"

type RevenueElement = SubmitRevenueStreamResponse["forms"][number] | undefined
type DetailGenerator = (
  revenue: RevenueElement
) => FinancialApplicationFormDetailData[]

interface UseRevenueDetailProps {
  revenueStreamResponse?: SubmitRevenueStreamResponse
}

export const useRevenueDetail = ({
  revenueStreamResponse
}: UseRevenueDetailProps) => {
  const revenueDetail: FinancialApplicationDetailData[] =
    revenueStreamResponse?.forms?.map((revenue, index) => ({
      id: LOAN_APPLICATION_STEPS.REVENUE,
      subId: index.toString(),
      title: "Revenue",
      financialApplicationFormData: generateFormDetailByFormType(revenue)
    })) ?? []

  return { revenueDetail }
}

function generateUnitSaleDetail(
  revenue: RevenueElement
): FinancialApplicationFormDetailData[] {
  const unitSale = revenue?.unitSale

  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Unit Sales"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: revenue?.unitSale?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(unitSale?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateMonthlyUnitSales",
      title: "Estimate monthly unit sales:",
      content: unitSale?.estimateMonthlyUnitSales
        ? formatPerMonth(unitSale?.estimateMonthlyUnitSales)
        : "N/A"
    },
    {
      id: "estimateMonthlyIncreaseInSales",
      title: "Estimate monthly increase in sales:",
      content: unitSale?.estimateMonthlySalesIncreaseRate
        ? formatPercentage(unitSale?.estimateMonthlySalesIncreaseRate)
        : "N/A"
    },
    {
      id: "unitPrice",
      title: "Unit price:",
      content: formatCurrency(unitSale?.unitPrice ?? 0)
    }
  ]
}

function generateContractRevenueDetail(
  revenue: RevenueElement
): FinancialApplicationFormDetailData[] {
  const contract = revenue?.contract

  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Contract Revenue"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: contract?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(contract?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "revenueEndDate",
      title: "Revenue end date:",
      content: formatDate(contract?.endDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateMonthlyRevenue",
      title: "Estimate the monthly revenue from this stream:",
      content: formatCurrency(contract?.monthlyRevenue ?? 0)
    }
  ]
}

function generateRecurringChargesDetail(
  revenue: RevenueElement
): FinancialApplicationFormDetailData[] {
  const recurringCharge = revenue?.recurringCharge

  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Recurring Charges"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: recurringCharge?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(recurringCharge?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateNewMonthlyCustomerSignUps",
      title: "Estimate new monthly customer sign-ups:",
      content: recurringCharge?.monthlyNewCustomer
        ? formatPerMonth(recurringCharge?.monthlyNewCustomer)
        : "N/A"
    },
    {
      id: "recurringCharge",
      title: "Recurring charge:",
      content: formatCurrency(recurringCharge?.recurringCharge ?? 0)
    },
    {
      id: "chargeFrequency",
      title: "Specify how often this charge is assessed:",
      content:
        CHARGE_FREQUENCIES.find(
          (fre) => fre.value == recurringCharge?.frequency
        )?.label ?? "N/A"
    },
    {
      id: "expectedNonRenewalPercentage",
      title: "Percentage of customers you expect not to renew:",
      content: recurringCharge?.churnRate
        ? formatPercentage(recurringCharge?.churnRate)
        : "N/A"
    },
    {
      id: "upfrontFeeIndicator",
      title: "Indicate whether you will charge an upfront fee:",
      content: capitalizeWords(
        recurringCharge?.hasUpfrontFee ? BINARY_VALUES.YES : BINARY_VALUES.NO
      )
    },
    {
      id: "upfrontFee",
      title: "Upfront fee:",
      content: formatCurrency(recurringCharge?.upfrontFee ?? 0)
    }
  ]
}

function generateBillableHourDetail(
  revenue: RevenueElement
): FinancialApplicationFormDetailData[] {
  const billableHour = revenue?.billableHour

  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Billable Hours"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: billableHour?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(billableHour?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateNewMonthlyCustomerSignUps",
      title: "Estimate new monthly customer sign-ups:",
      content: billableHour?.monthlyNewCustomers
        ? formatPerMonth(billableHour?.monthlyNewCustomers)
        : "N/A"
    },
    {
      id: "estimateMonthlyIncreaseInNewCustomers",
      title: "Estimate the monthly increase in new customers:",
      content: billableHour?.monthlyNewCustomerIncreaseRate
        ? formatPercentage(billableHour?.monthlyNewCustomerIncreaseRate)
        : "N/A"
    },
    {
      id: "estimateAverageMonthlyBilledHoursPerCustomer",
      title: "Estimate average monthly billed hours per customer:",
      content: billableHour?.averageMonthlyHourBilledPerCustomer
        ? formatPerMonth(billableHour?.averageMonthlyHourBilledPerCustomer)
        : "N/A"
    },
    {
      id: "pricePerUnit",
      title: "Price per unit:",
      content: formatCurrency(billableHour?.hourlyRate ?? 0)
    }
  ]
}

// Map of revenue types to their respective detail generators
const revenueDetailGenerators: Record<RevenueResponseType, DetailGenerator> = {
  [RevenueResponseType.UnitSales]: generateUnitSaleDetail,
  [RevenueResponseType.Contracts]: generateContractRevenueDetail,
  [RevenueResponseType.RecurringCharges]: generateRecurringChargesDetail,
  [RevenueResponseType.BillableHours]: generateBillableHourDetail
}

const generateFormDetailByFormType = (
  revenue: RevenueElement
): FinancialApplicationFormDetailData[] => {
  const generator = revenue?.formType
    ? revenueDetailGenerators[revenue.formType]
    : null

  return generator ? generator(revenue) : []
}

// Utility functions
const formatCurrency = (value: number): string => toCurrency(value, 0)
const formatPercentage = (value: number): string => `${value}%`
const formatPerMonth = (value: number): string => `${value} /mo`
