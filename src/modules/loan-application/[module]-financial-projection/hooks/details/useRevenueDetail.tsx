import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import {
  RevenueResponseType,
  SubmitRevenueStreamResponse
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"

type RevenueElement = SubmitRevenueStreamResponse["forms"][number] | undefined

export const useRevenueDetail = () => {
  const { revenueFormQuery } = useGetFinancialProjectForms()

  return {
    revenueDetail:
      revenueFormQuery.data?.forms?.map((revenue, index) => ({
        id: LOAN_APPLICATION_STEPS.REVENUE,
        subId: index + "",
        title: "Revenue",
        financialApplicationFormData: getFormDetailByFormType(revenue)
      })) ?? []
  }
}

const getFormDetailByFormType = (revenue: RevenueElement) => {
  switch (revenue?.formType) {
    case RevenueResponseType.BILLABLE_HOURS:
      return toBillableHourDetail(revenue)
    case RevenueResponseType.CONTRACTS:
      return toContractRevenueDetail(revenue)
    case RevenueResponseType.RECURRING_CHARGES:
      return toRecurringChargesDetail(revenue)
    case RevenueResponseType.UNIT_SALES:
      return toUnitSaleDetail(revenue)
    default:
      return []
  }
}

const toUnitSaleDetail = (revenue: RevenueElement) => {
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
      content: formatDate(revenue?.unitSale?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateMonthlyUnitSales",
      title: "Estimate monthly unit sales:",
      content: revenue?.unitSale?.estimateMonthlyUnitSales
        ? `${revenue?.unitSale?.estimateMonthlyUnitSales} /mo`
        : "N/A"
    },
    {
      id: "estimateMonthlyIncreaseInSales",
      title: "Estimate monthly increase in sales:",
      content: revenue?.unitSale?.estimateMonthlySalesIncreaseRate
        ? `${revenue?.unitSale?.estimateMonthlySalesIncreaseRate}% /mo`
        : "N/A"
    },
    {
      id: "unitPrice",
      title: "Unit price:",
      content: toCurrency(revenue?.unitSale?.unitPrice ?? 0, 0)
    }
  ]
}

const toContractRevenueDetail = (revenue: RevenueElement) => {
  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Contract Revenue"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: revenue?.contract?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(revenue?.contract?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "revenueEndDate",
      title: "Revenue end date:",
      content: formatDate(revenue?.contract?.endDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateMonthlyRevenue",
      title: "Estimate the monthly revenue from this stream:",
      content: toCurrency(revenue?.contract?.monthlyRevenue ?? 0, 0)
    }
  ]
}

const toRecurringChargesDetail = (revenue: RevenueElement) => {
  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Recurring Charges"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: revenue?.recurringCharge?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(
        revenue?.recurringCharge?.startDate,
        FORMAT_DATE_MM_YYYY
      )
    },
    {
      id: "estimateNewMonthlyCustomerSignUps",
      title: "Estimate new monthly customer sign-ups:",
      content: revenue?.recurringCharge?.monthlyNewCustomer
        ? `${revenue?.recurringCharge?.monthlyNewCustomer} /mo`
        : "N/A"
    },
    {
      id: "recurringCharge",
      title: "Recurring charge:",
      content: toCurrency(revenue?.recurringCharge?.recurringCharge ?? 0, 0)
    },
    {
      id: "chargeFrequency",
      title: "Specify how often this charge is assessed:",
      content: CHARGE_FREQUENCY.find(
        (fre) => fre.value == revenue?.recurringCharge?.frequency
      )?.label
    },
    {
      id: "expectedNonRenewalPercentage",
      title: "Percentage of customers you expect not to renew:",
      content: revenue?.recurringCharge?.churnRate
        ? `${revenue?.recurringCharge?.churnRate}%`
        : "N/A"
    },
    {
      id: "upfrontFeeIndicator",
      title: "Indicate whether you will charge an upfront fee:",
      content: capitalizeWords(
        revenue?.recurringCharge?.hasUpfrontFee
          ? BINARY_VALUES.YES
          : BINARY_VALUES.NO
      )
    },
    {
      id: "upfrontFee",
      title: "Upfront fee:",
      content: toCurrency(revenue?.recurringCharge?.upfrontFee ?? 0, 0)
    }
  ]
}

const toBillableHourDetail = (revenue: RevenueElement) => {
  return [
    {
      id: "selectedRevenueModel",
      title: "Selected revenue model:",
      content: "Billable Hours"
    },
    {
      id: "revenueStreamTitle",
      title: "The revenue stream in your forecast should be titled:",
      content: revenue?.billableHour?.name
    },
    {
      id: "revenueStreamStartDate",
      title: "Revenue stream start date:",
      content: formatDate(revenue?.billableHour?.startDate, FORMAT_DATE_MM_YYYY)
    },
    {
      id: "estimateNewMonthlyCustomerSignUps",
      title: "Estimate new monthly customer sign-ups:",
      content: revenue?.billableHour?.monthlyNewCustomers
        ? `${revenue?.billableHour?.monthlyNewCustomers} /mo`
        : "N/A"
    },
    {
      id: "estimateMonthlyIncreaseInNewCustomers",
      title: "Estimate the monthly increase in new customers:",
      content: revenue?.billableHour?.monthlyNewCustomerIncreaseRate
        ? `${revenue?.billableHour?.monthlyNewCustomerIncreaseRate}% /mo`
        : "N/A"
    },
    {
      id: "estimateAverageMonthlyBilledHoursPerCustomer",
      title: "Estimate average monthly billed hours per customer:",
      content: revenue?.billableHour?.averageMonthlyHourBilledPerCustomer
        ? `${revenue?.billableHour?.averageMonthlyHourBilledPerCustomer} /mo`
        : "N/A"
    },
    {
      id: "pricePerUnit",
      title: "Price per unit:",
      content: toCurrency(revenue?.billableHour?.hourlyRate ?? 0, 0)
    }
  ]
}

const CHARGE_FREQUENCY = [
  {
    label: "Monthly",
    value: "1"
  },
  {
    label: "Quarterly",
    value: "4"
  },
  {
    label: "Semi-Annually",
    value: "6"
  },
  {
    label: "Annually",
    value: "12"
  }
]
