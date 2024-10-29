import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { CHARGE_FREQUENCIES } from "@/modules/loan-application/[module]-financial-projection/components/store/recurring-charges-store"
import {
  type FinancialApplicationDetailData,
  type FinancialApplicationFormDetailData
} from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  type BillableHour,
  type Contract,
  type RecurringCharge,
  RevenueResponseType,
  type RevenueStream,
  type UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"

type RevenueElement = UnitSale | BillableHour | RecurringCharge | Contract
type DetailGenerator = (
  revenue: RevenueElement
) => FinancialApplicationFormDetailData[]

interface UseRevenueDetailProps {
  revenueStreamFormValue?: RevenueStream
}

export const useRevenueDetail = ({
  revenueStreamFormValue
}: UseRevenueDetailProps) => {
  const revenueDetail: FinancialApplicationDetailData[] =
    [
      {
        formType: RevenueResponseType.UnitSales,
        revenues: revenueStreamFormValue?.unitSales
      },
      {
        formType: RevenueResponseType.BillableHours,
        revenues: revenueStreamFormValue?.billableHours
      },
      {
        formType: RevenueResponseType.RecurringCharges,
        revenues: revenueStreamFormValue?.recurringCharges
      },
      {
        formType: RevenueResponseType.Contracts,
        revenues: revenueStreamFormValue?.contracts
      }
    ].flatMap((revenue, index) => {
      const generator = revenue?.formType
        ? revenueDetailGenerators[revenue.formType]
        : null

      return (
        revenue?.revenues?.map((subRevenue, subIndex) => ({
          id: LOAN_APPLICATION_STEPS.REVENUE,
          subId: index.toString() + subIndex.toString(),
          title: "Revenue",
          financialApplicationFormData: generator ? generator(subRevenue) : []
        })) ?? []
      )
    }) ?? []

  return { revenueDetail }
}

function generateUnitSaleDetail(
  revenue: RevenueElement
): FinancialApplicationFormDetailData[] {
  const unitSale = revenue as UnitSale

  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Unit Sales"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: unitSale?.name
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
  const contract = revenue as Contract

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
  const recurringCharge = revenue as RecurringCharge

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
  const billableHour = revenue as BillableHour

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

// Utility functions
const formatCurrency = (value: number): string => toCurrency(value, 0)
const formatPercentage = (value: number): string => `${value}%`
const formatPerMonth = (value: number): string => `${value} /mo`
