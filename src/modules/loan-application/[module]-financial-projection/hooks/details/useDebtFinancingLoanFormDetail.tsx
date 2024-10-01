import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants"
import { FinancialApplicationFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { DebtFinancingField } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { DebtFinancingResponse } from "@/modules/loan-application/[module]-financial-projection/types/debt-financing"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { useGetFinancialProjectForms } from "@/modules/loan-application/hooks/useGetFinancialProjectForms"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, snakeCaseToText, toCurrency } from "@/utils"
import { formatDate } from "@/utils/date.utils"

const toDebtFinancingDetail = (data: DebtFinancingResponse | undefined) => {
  return data?.loanForms?.map((debt, index) => (
    <FinancialApplicationFormDetail
      key={`LOAN ${index + 1}`}
      isSubChildren
      financialApplicationFormData={[
        {
          id: "key",
          title: `LOAN ${index + 1}`,
          content: ""
        },
        {
          id: "loanName",
          title: "Enter name of loan:",
          content: debt?.name
        },
        {
          id: "lenderName",
          title: "Enter name of Lender/Financial Institution:",
          content: debt?.lenderName
        },
        {
          id: "loanType",
          title: "Type of loan:",
          content: capitalizeWords(snakeCaseToText(debt?.type))
        },
        {
          id: "loanDate",
          title: "Date of loan:",
          content: formatDate(debt?.loanDate, FORMAT_DATE_MM_YYYY)
        },
        {
          id: "remainingLoanBalance",
          title: "Remaining loan balance:",
          content: toCurrency(debt?.remainingLoanBalance ?? 0, 0)
        },
        {
          id: "monthlyLoanPayment",
          title: "Loan term per month:",
          content: debt?.termsRemaining ? `${debt?.termsRemaining} /mo` : "N/A"
        },
        {
          id: "annualInterestRate",
          title: "Annual interest rate:",
          content: debt?.annualInterestRate
        }
      ]}
    />
  ))
}

export const useDebtFinancingLoanFormDetail = () => {
  const { debtFinancingFormQuery } = useGetFinancialProjectForms()
  const totalInvestment =
    debtFinancingFormQuery?.data?.commonForm?.[
      DebtFinancingField.STARTING_PAID_IN_CAPITAL
    ] ?? 0

  const outstandingLoans =
    debtFinancingFormQuery?.data?.loanForms &&
    debtFinancingFormQuery?.data?.loanForms?.length > 0

  const debtFinancingLoanFormDetail = {
    id: LOAN_APPLICATION_STEPS.DEBT_FINANCING,
    subId: "loanForm",
    title: "Debt Financing",
    subTitle:
      "Debt financing, including loan financing, involves borrowing money that you agree to repay over time with interest. This option provides immediate funds while allowing you to retain full ownership of your business, but it also adds a financial obligation with regular payments that must be met, impacting your cash flow.",
    financialApplicationFormData: [
      {
        id: "totalInvestment",
        title:
          "State the total investment made in the company for ownership or equity:",
        content: toCurrency(totalInvestment, 0)
      },
      {
        id: "outstandingLoans",
        title: "Indicate whether your business has any outstanding loans:",
        content: capitalizeWords(
          outstandingLoans ? BINARY_VALUES.YES : BINARY_VALUES.NO
        )
      }
    ],
    subChildren: toDebtFinancingDetail(debtFinancingFormQuery.data)
  }

  return { debtFinancingLoanFormDetail }
}
