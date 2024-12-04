import {
  ConnectedAccountDetail,
  FinancialOperatingExpensesFormDetail
} from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { DirectCostsFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details/DirectCostsFormDetail"
import { type DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { type FinancialStatementFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store"
import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { type DebtFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"
import { type FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"
import { type ExpenseTaxRateFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store"
import { type FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { type PeopleFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-people-expenses-store"
import { useAssetLongTermDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useAssetLongTermDetail"
import { useAssetReceivableDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useAssetReceivableDetail"
import { useBusinessInformationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useBusinessInformationDetail"
import { useCurrentEmployeesDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useCurrentEmployeesDetail"
import { useDebtFinancingAccountsPayableDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useDebtFinancingAccountsPayableDetail"
import { useDebtFinancingLoanFormDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useDebtFinancingLoanFormDetail"
import { useEquityFinancingDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useEquityFinancingDetail"
import { useFinancialStatementsDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useFinancialStatementsDetail"
import { useForecastingSetupDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useForecastingSetupDetail"
import { useFutureEmployeesDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useFutureEmployeesDetail"
import { useIndividualInformationDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useIndividualInformationDetail"
import { useLoanRequestDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useLoanRequestDetail"
import { useRevenueDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useRevenueDetail"
import { useTaxRatesDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useTaxRatesDetail"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { CashFlowTable } from "@/modules/loan-application/components/molecules/loan-application-details/CashFlowTable"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form"
import { type RevenueStream } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form"
import {
  type ILoanRequestFormValue,
  type LoanRequestFormValue
} from "@/modules/loan-application/constants/form"
import { type LoanReadyBusinessFormValue } from "@/modules/loan-application/constants/form.kyb"
import { type LoanReadyOwnerFormValue } from "@/modules/loan-application/constants/form.kyc"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { checkIsLoanApplicant } from "@/utils/check-roles"

interface FpFormDetail {
  forecastingSetup: ForecastingSetupFormValue
  financialStatements: FinancialStatementFormValue
  people: PeopleFormValue
  directCosts: DirectCostsFormValue
  fpOperatingExpenses: FpOperatingExpensesFormValue
  taxRates: ExpenseTaxRateFormValue
  assets: AssetsFormValue
  debtFinancing: DebtFinancingFormValue
  equity: FpEquityFinancingFormValue
  revenue: RevenueStream
}

interface UseFinancialApplicationDetailProps {
  connectedBankAccounts?: LoanApplicationBankAccount[]
  fpForm?: Partial<FpFormDetail>
  loanRequest?: LoanRequestFormValue | ILoanRequestFormValue
  businessInformation?: LoanReadyBusinessFormValue
  ownerInformationForm?: LoanReadyOwnerFormValue
}

export const useFinancialApplicationDetail = ({
  fpForm,
  connectedBankAccounts,
  businessInformation,
  ownerInformationForm,
  loanRequest
}: UseFinancialApplicationDetailProps) => {
  const connectedAccountData = {
    id: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
    financialApplicationFormData: [],
    subChildren: checkIsLoanApplicant() ? (
      <ConnectedAccountDetail overwriteBankAccounts={connectedBankAccounts} />
    ) : (
      <CashFlowTable wrapperClassName="-mt-8" />
    )
  }

  const directCostData: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.DIRECT_COSTS,
    title: "Direct Costs",
    subTitle: (
      <>
        <p className="text-sm">
          Direct Costs are expenses directly related to creating or delivering a
          product or service. Common direct costs are raw materials to make a
          product, manufacturing supplies, shipping costs, and costs of
          employees or third-party providers who directly contribute to
          production.
        </p>
        <p className="text-sm">
          This section shouldn’t include costs essential to keeping the business
          running, like rent for your office, salaries for your marketing team,
          or the electricity bill. Those are Operating Expenses; we’ll ask for
          those in the next section.
        </p>
      </>
    ),
    financialApplicationFormData: [],
    subChildren: (
      <DirectCostsFormDetail directCostsFormValue={fpForm?.directCosts} />
    )
  }

  const operatingExpensesData = {
    id: LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES,
    title: "Operating Expenses (monthly)",
    subTitle: (
      <>
        <p className="text-sm">
          Operating Expenses are costs directly related to the day-to-day
          functioning of your business. Please specify the amount for some
          common expense categories below, and add any that apply to your
          business. For categories which don’t apply, please leave them blank.
        </p>
        <p className="text-sm">
          (Note: This form excludes Non-Operating expenses such as Interest
          Expense, Income Taxes, Raw Materials, or Losses from Asset Sales).
        </p>
      </>
    ),
    financialApplicationFormData: [],
    subChildren: (
      <FinancialOperatingExpensesFormDetail
        fpOperatingExpensesFormValue={fpForm?.fpOperatingExpenses}
      />
    )
  }

  const financialApplicationDetailData: FinancialApplicationDetailData[] = [
    useLoanRequestDetail({
      loanRequestFormValue: loanRequest
    }).loanRequestDetail,
    useBusinessInformationDetail({
      businessInformationFormValue: businessInformation
    }).businessInformationDetail,
    useIndividualInformationDetail({
      ownerInformationFormValue: ownerInformationForm
    }).individualInformationDetail,
    useForecastingSetupDetail({
      forecastingSetupFormValue: fpForm?.forecastingSetup
    }).forecastingSetupDetail,
    useFinancialStatementsDetail({
      financialStatementFormValue: fpForm?.financialStatements
    }).financialStatementsDetail,
    ...useRevenueDetail({
      revenueStreamFormValue: fpForm?.revenue
    }).revenueDetail,
    useCurrentEmployeesDetail({
      expensePeopleFormValue: fpForm?.people
    }).currentEmployeesDetail,
    useFutureEmployeesDetail({
      expensePeopleFormValue: fpForm?.people
    }).futureEmployeesDetail,
    connectedAccountData,
    directCostData,
    operatingExpensesData,
    useTaxRatesDetail({
      taxRateFormValue: fpForm?.taxRates
    }).taxRatesDetail,
    useAssetReceivableDetail({
      assetsFormValue: fpForm?.assets
    }).assetReceivableDetail,
    useAssetLongTermDetail({
      assetsFormValue: fpForm?.assets
    }).assetLongTermDetail,
    useDebtFinancingAccountsPayableDetail({
      debtFinancingFormValue: fpForm?.debtFinancing
    }).debtFinancingAccountsPayableDetail,
    useDebtFinancingLoanFormDetail({
      debtFinancingFormValue: fpForm?.debtFinancing
    }).debtFinancingLoanFormDetail,
    useEquityFinancingDetail({
      fpEquityFinancingFormValue: fpForm?.equity
    }).equityFinancingDetail
  ]

  return { financialApplicationDetailData }
}
