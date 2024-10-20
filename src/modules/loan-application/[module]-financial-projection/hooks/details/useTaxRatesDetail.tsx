import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { type ExpenseTaxRateFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/tax-rate-form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseTaxRatesDetailProps {
  expenseTaxRateFormResponse?: ExpenseTaxRateFormResponse
}

export const useTaxRatesDetail = ({
  expenseTaxRateFormResponse
}: UseTaxRatesDetailProps) => {
  const incomeTaxRate = expenseTaxRateFormResponse?.incomeTaxRate ?? 0

  const taxRatesDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.TAX_RATES,
    title: "Tax Rates",
    subTitle:
      "Income Tax: Enter a tax rate to cover income taxes (federal, state, local). A 20% rate is a good estimate. Taxes apply only when profitable, though unprofitable years may still incur some taxes.",
    financialApplicationFormData: [
      {
        id: "incomeTaxRate",
        title: "Estimate your income tax rate:",
        content:
          incomeTaxRate || incomeTaxRate === 0 ? `${incomeTaxRate}%` : "N/A"
      }
    ]
  }

  return { taxRatesDetail }
}
