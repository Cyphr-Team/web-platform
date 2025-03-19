import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"

import { useQueryLoanApplicationDetailsByType } from "@/modules/loan-application/hooks/application/useQueryUserLoanApplicationDetails.ts"
import { LoanType } from "@/types/loan-program.type"
import { useIsFetching } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import {
  reverseFormatLoanRequestFormV2,
  useQueryLoanRequestForm
} from "@/modules/loan-application/hooks/form-loan-request/useQueryLoanRequest.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { deserializeKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useSubmitKycFormV2.ts"
import { isCapitalCollab } from "@/utils/domain.utils.ts"
import { useQueryGetKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useQueryKybForm.ts"
import { useQueryKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useQueryKycForm.ts"
import { deserializeKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useSubmitKybFormV2.ts"
import { useGetCapitalCollabFinancialProjectForms } from "@/modules/loan-application/capital-collab/hooks/useGetCapitalCollabFinancialProjectForms"
import { deserializeDirectCostsFormV2 } from "@/modules/loan-application/capital-collab/stores/direct-cost-store"
import { get } from "lodash"
import { deserializeOperatingExpensesFormV2 } from "@/modules/loan-application/capital-collab/stores/operating-expenses-store"
import { deserializeAssetsFormV2 } from "@/modules/loan-application/capital-collab/stores/assets-store"
import { deserializeDebtFinancingFormV2 } from "@/modules/loan-application/capital-collab/stores/debt-financing-store"
import { useGetCapitalCollabApplicationDetails } from "@/modules/loan-application/capital-collab/hooks/useGetCapitalCollabApplicationDetails"

export function useGetCapitalCollabApplicantApplicationDetails() {
  const { id } = useParams()
  const location = useLocation()
  const loanApplicationId =
    id ?? (location.state?.applicationId as string) ?? ""

  const financialApplicationForms = useGetCapitalCollabFinancialProjectForms()

  const loanApplicationDetailsQuery = useQueryLoanApplicationDetailsByType(
    loanApplicationId,
    LoanType.MICRO
  )

  const kybFormQueryV2 = useQueryGetKybFormV2({
    applicationId: loanApplicationId,
    enabled: isCapitalCollab()
  })

  const kycFormQueryV2 = useQueryKycFormV2({
    applicationId: loanApplicationId,
    enabled: isCapitalCollab()
  })
  const loanRequestFormQuery = useQueryLoanRequestForm({
    applicationId: loanApplicationId,
    formTypes: [FORM_TYPE.LOAN_REQUEST]
  })

  const { financialApplicationDetailData } =
    useGetCapitalCollabApplicationDetails({
      fpForm: {
        directCosts: financialApplicationForms.directCostsCCFormQuery.data
          ? deserializeDirectCostsFormV2(
              get(
                financialApplicationForms.directCostsCCFormQuery.data,
                "forms[0]"
              )
            )
          : undefined,
        fpOperatingExpenses: financialApplicationForms
          .operatingExpensesCCFormQuery.data
          ? deserializeOperatingExpensesFormV2(
              get(
                financialApplicationForms.operatingExpensesCCFormQuery.data,
                "forms[0]"
              )
            )
          : undefined,
        assets: financialApplicationForms.assetsCCFormQuery.data
          ? deserializeAssetsFormV2(
              get(financialApplicationForms.assetsCCFormQuery.data, "forms[0]")
            )
          : undefined,
        debtFinancing: financialApplicationForms.debtFinancingCCFormQuery.data
          ? deserializeDebtFinancingFormV2(
              get(
                financialApplicationForms.debtFinancingCCFormQuery.data,
                "forms[0]"
              )
            )
          : undefined
      },
      loanRequest: reverseFormatLoanRequestFormV2(loanRequestFormQuery.data),
      businessInformation: kybFormQueryV2.data
        ? deserializeKybFormV2(kybFormQueryV2.data)
        : undefined,
      ownerInformationForm: kycFormQueryV2.data
        ? deserializeKycFormV2(kycFormQueryV2.data)
        : undefined
    })

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching = loanApplicationDetailsQuery.isFetching

  return { isFetching, isFetchingBankAccounts, financialApplicationDetailData }
}
