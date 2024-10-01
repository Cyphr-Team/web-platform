import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const useTaxRatesDetail = () => {
  const { fpExpenseTaxRateFormQuery } = useGetFinancialProjectForms()
  const incomeTaxRate = fpExpenseTaxRateFormQuery?.data?.incomeTaxRate

  const taxRatesDetail = {
    id: LOAN_APPLICATION_STEPS.TAX_RATES,
    title: "Tax Rates",
    subTitle:
      "Income Tax: Enter a tax rate to cover income taxes (federal, state, local). A 20% rate is a good estimate. Taxes apply only when profitable, though unprofitable years may still incur some taxes.",
    financialApplicationFormData: [
      {
        id: "incomeTaxRate",
        title: "Estimate your income tax rate:",
        content: incomeTaxRate ? `${incomeTaxRate}%` : "N/A"
      }
    ]
  }
  return { taxRatesDetail }
}
