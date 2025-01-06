import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"

import { useIsFetching } from "@tanstack/react-query"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { deserializeDirectCostsFormV2 } from "@/modules/loan-application/capital-collab/stores/direct-cost-store"
import { get } from "lodash"
import { deserializeOperatingExpensesFormV2 } from "@/modules/loan-application/capital-collab/stores/operating-expenses-store"
import { deserializeAssetsFormV2 } from "@/modules/loan-application/capital-collab/stores/assets-store"
import { deserializeDebtFinancingFormV2 } from "@/modules/loan-application/capital-collab/stores/debt-financing-store"
import { useGetCapitalCollabApplicationDetails } from "@/modules/loan-application/capital-collab/hooks/useGetCapitalCollabApplicationDetails"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import {
  adaptFormV2Metadata,
  findSingularFormData,
  findSingularFormMetadata,
  findSingularFormV2Data
} from "@/modules/loan-application/services/formv2.services"
import {
  type IOwnerFormValue,
  type IBusinessFormValue
} from "@/modules/loan-application/constants/form"
import { capitalCollabOwnerFormSchema } from "@/modules/loan-application/constants/form.kyc"
import { capitalCollabBusinessFormSchema } from "@/modules/loan-application/constants/form.kyb"
import {
  capitalCollabLoanRequestFormSchema,
  type CapitalCollabLoanRequestFormValue
} from "@/modules/loan-application/constants/form-v2"
import { deserializeKycFormV2 } from "@/modules/loan-application/hooks/form-kyc/useSubmitKycFormV2"
import { deserializeKybFormV2 } from "@/modules/loan-application/hooks/form-kyb/useSubmitKybFormV2"

export function useGetCapitalCollabAdminApplicationDetails() {
  const { applicationSummary, isFetchingSummary, isLoading } =
    useLoanApplicationDetailContext()

  // region Form V2
  const adaptedLoanRequestFormMetadata = applicationSummary?.forms
    ? adaptFormV2Metadata<CapitalCollabLoanRequestFormValue>({
        schema: capitalCollabLoanRequestFormSchema,
        metadata: findSingularFormMetadata(
          FORM_TYPE.LOAN_REQUEST,
          applicationSummary
        ),
        additionalFields: {
          applicationId: applicationSummary?.applicationId
        }
      })
    : undefined

  const kybFormData = applicationSummary?.forms
    ? findSingularFormData(FORM_TYPE.KYB, applicationSummary)
    : undefined
  const kybFormMetadata = kybFormData
    ? findSingularFormV2Data(FORM_TYPE.KYB, applicationSummary)
    : undefined

  const adaptedKybFormMetadata = kybFormMetadata
    ? adaptFormV2Metadata<IBusinessFormValue>({
        schema: capitalCollabBusinessFormSchema,
        metadata: kybFormMetadata.metadata!,
        preFormat: () => deserializeKybFormV2(kybFormMetadata),
        additionalFields: {
          id: get(kybFormData, "forms[0].id", "")
        }
      })
    : undefined

  const kycFormData = applicationSummary?.forms
    ? findSingularFormData(FORM_TYPE.KYC, applicationSummary)
    : undefined

  const kycFormMetadata = kycFormData
    ? findSingularFormV2Data(FORM_TYPE.KYC, applicationSummary)
    : undefined

  const adaptedKycFormMetadata = kycFormMetadata
    ? adaptFormV2Metadata<IOwnerFormValue>({
        schema: capitalCollabOwnerFormSchema,
        metadata: kycFormMetadata.metadata!,
        preFormat: () => deserializeKycFormV2(kycFormMetadata),
        additionalFields: {
          id: get(kycFormData, "forms[0].id", "")
        }
      })
    : undefined

  const { financialApplicationDetailData } =
    useGetCapitalCollabApplicationDetails({
      fpForm: {
        directCosts: deserializeDirectCostsFormV2(
          findSingularFormV2Data(FORM_TYPE.DIRECT_COSTS, applicationSummary)
        ),
        fpOperatingExpenses: deserializeOperatingExpensesFormV2(
          findSingularFormV2Data(
            FORM_TYPE.OPERATING_EXPENSES,
            applicationSummary
          )
        ),
        assets: deserializeAssetsFormV2(
          findSingularFormV2Data(FORM_TYPE.ASSETS, applicationSummary)
        ),
        debtFinancing: deserializeDebtFinancingFormV2(
          findSingularFormV2Data(FORM_TYPE.DEBT_FINANCING, applicationSummary)
        )
      },
      loanRequest: adaptedLoanRequestFormMetadata,
      businessInformation: adaptedKybFormMetadata,
      ownerInformationForm: adaptedKycFormMetadata
    })
  // endregion

  const isFetchingBankAccounts = useIsFetching({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION]
  })

  const isFetching = isLoading || isFetchingSummary

  return { isFetching, isFetchingBankAccounts, financialApplicationDetailData }
}
