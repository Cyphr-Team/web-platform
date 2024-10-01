import {
  ConnectedAccountDetail,
  FinancialOperatingExpensesFormDetail
} from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { DirectCostsFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details/DirectCostsFormDetail"
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
import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const useFinancialApplicationDetail = () => {
  const connectedAccountData = {
    id: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
    title: "Connected Accounts",
    financialApplicationFormData: [],
    subChildren: <ConnectedAccountDetail />
  }

  const directCostData = {
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
    subChildren: <DirectCostsFormDetail />
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
    subChildren: <FinancialOperatingExpensesFormDetail />
  }

  const financialApplicationDetailData: FinancialApplicationDetailData[] = [
    useLoanRequestDetail().loanRequestDetail,
    useBusinessInformationDetail().businessInformationDetail,
    useIndividualInformationDetail().individualInformationDetail,
    useForecastingSetupDetail().forecastingSetupDetail,
    useFinancialStatementsDetail().financialStatementsDetail,
    ...useRevenueDetail().revenueDetail,
    useCurrentEmployeesDetail().currentEmployeesDetail,
    useFutureEmployeesDetail().futureEmployeesDetail,
    connectedAccountData,
    directCostData,
    operatingExpensesData,
    useTaxRatesDetail().taxRatesDetail,
    useAssetReceivableDetail().assetReceivableDetail,
    useAssetLongTermDetail().assetLongTermDetail,
    useDebtFinancingAccountsPayableDetail().debtFinancingAccountsPayableDetail,
    useDebtFinancingLoanFormDetail().debtFinancingLoanFormDetail,
    useEquityFinancingDetail().equityFinancingDetail
  ]
  return { financialApplicationDetailData }
}
