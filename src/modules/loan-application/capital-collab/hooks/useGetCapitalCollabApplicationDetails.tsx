import {
  ConnectedAccountDetail,
  FinancialOperatingExpensesFormDetail
} from "@/modules/loan-application/[module]-financial-projection/components/molecules/details"
import { DirectCostsFormDetail } from "@/modules/loan-application/[module]-financial-projection/components/molecules/details/DirectCostsFormDetail"
import { useAssetLongTermDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useAssetLongTermDetail"
import { useAssetReceivableDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useAssetReceivableDetail"
import { useDebtFinancingAccountsPayableDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useDebtFinancingAccountsPayableDetail"
import { useDebtFinancingLoanFormDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useDebtFinancingLoanFormDetail"
import { useLoanRequestDetail } from "@/modules/loan-application/[module]-financial-projection/hooks/details/useLoanRequestDetail"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { CashFlowTable } from "@/modules/loan-application/components/molecules/loan-application-details/CashFlowTable"
import {
  type ILoanRequestFormValue,
  type LoanRequestFormValue
} from "@/modules/loan-application/constants/form"
import { type CapitalCollabBusinessFormValue } from "@/modules/loan-application/constants/form.kyb"
import { type CapitalCollabOwnerFormValue } from "@/modules/loan-application/constants/form.kyc"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { type CapitalCollabDirectCostsFormValue } from "@/modules/loan-application/capital-collab/stores/direct-cost-store"
import { type CapitalCollabOperatingExpensesFormValue } from "@/modules/loan-application/capital-collab/stores/operating-expenses-store"
import { type CapitalCollabAssetsFormValue } from "@/modules/loan-application/capital-collab/stores/assets-store"
import { type CapitalCollabDebtFinancingFormValue } from "@/modules/loan-application/capital-collab/stores/debt-financing-store"
import { businessInformationDetailMapper } from "@/modules/loan-application/capital-collab/stores/kyb-store"
import { individualInformationDetailMapper } from "@/modules/loan-application/capital-collab/stores/kyc-store"

interface FpFormDetail {
  directCosts: CapitalCollabDirectCostsFormValue
  fpOperatingExpenses: CapitalCollabOperatingExpensesFormValue
  assets: CapitalCollabAssetsFormValue
  debtFinancing: CapitalCollabDebtFinancingFormValue
}

interface UseFinancialApplicationDetailProps {
  connectedBankAccounts?: LoanApplicationBankAccount[]
  fpForm?: Partial<FpFormDetail>
  loanRequest?: LoanRequestFormValue | ILoanRequestFormValue
  businessInformation?: CapitalCollabBusinessFormValue
  ownerInformationForm?: CapitalCollabOwnerFormValue
}

export const useGetCapitalCollabApplicationDetails = ({
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
    businessInformationDetailMapper({
      businessInformationFormValue: businessInformation
    }).businessInformationDetail,
    ...individualInformationDetailMapper({
      ownerInformationFormValue: ownerInformationForm
    }).ownerInformationDetail,
    connectedAccountData,
    directCostData,
    operatingExpensesData,
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
    }).debtFinancingLoanFormDetail
  ]

  return { financialApplicationDetailData }
}
