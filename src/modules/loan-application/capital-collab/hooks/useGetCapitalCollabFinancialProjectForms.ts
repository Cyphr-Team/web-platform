import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { deserializeAssetsFormV2 } from "@/modules/loan-application/capital-collab/stores/assets-store"
import { deserializeDebtFinancingFormV2 } from "@/modules/loan-application/capital-collab/stores/debt-financing-store"
import { deserializeDirectCostsFormV2 } from "@/modules/loan-application/capital-collab/stores/direct-cost-store"
import { deserializeOperatingExpensesFormV2 } from "@/modules/loan-application/capital-collab/stores/operating-expenses-store"
import { useQueryCommonForm } from "@/modules/loan-application/hooks/form-common/useQueryCommonFormV2"
import {
  FORM_TYPE,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import {
  FORM_ACTION,
  type FormStateType
} from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LoanProgressAction } from "@/modules/loan-application/providers/LoanProgressProvider.tsx"
import { isCapitalCollab } from "@/utils/domain.utils"
import { useCallback, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { get } from "lodash"

export const useGetCapitalCollabFinancialProjectForms = () => {
  /**
   * Financial Projection Forms
   **/
  const { id } = useParams()
  const location = useLocation()
  const loanApplicationId = id ?? location.state?.applicationId

  const { dispatchProgress, isInitialized, progress } =
    useLoanApplicationProgressContext()

  const { dispatchFormAction } = useLoanApplicationFormContext()

  const isEnabledQuery = (step: LOAN_APPLICATION_STEPS) =>
    progress.map((item) => item.step).includes(step)

  const changeDataAndProgress = useCallback(
    (data: FormStateType, progress: LOAN_APPLICATION_STEPS, isDone = true) => {
      if (isDone) {
        dispatchProgress({
          type: LoanProgressAction.ChangeProgress,
          progress
        })
      }
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: progress,
        state: data
      })
    },
    [dispatchProgress, dispatchFormAction]
  )

  // Operating Expenses Form
  const operatingExpensesFormQuery = useQueryCommonForm({
    applicationId: loanApplicationId,
    queryKey: QUERY_KEY.GET_FP_OPERATING_EXPENSES_FORM,
    formTypes: [FORM_TYPE.OPERATING_EXPENSES],
    enabled:
      isCapitalCollab() &&
      isEnabledQuery(LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES)
  })

  useEffect(() => {
    if (operatingExpensesFormQuery.data && isInitialized && isCapitalCollab()) {
      changeDataAndProgress(
        deserializeOperatingExpensesFormV2(
          get(operatingExpensesFormQuery.data, "forms[0]")
        ),
        LOAN_APPLICATION_STEPS.FP_OPERATING_EXPENSES
      )
    }
  }, [changeDataAndProgress, operatingExpensesFormQuery.data, isInitialized])

  // Direct Costs Form
  const directCostsFormQuery = useQueryCommonForm({
    applicationId: loanApplicationId,
    queryKey: QUERY_KEY.GET_DIRECT_COSTS_FORM,
    formTypes: [FORM_TYPE.DIRECT_COSTS],
    enabled:
      isCapitalCollab() && isEnabledQuery(LOAN_APPLICATION_STEPS.DIRECT_COSTS)
  })

  useEffect(() => {
    if (directCostsFormQuery.data && isInitialized && isCapitalCollab()) {
      changeDataAndProgress(
        deserializeDirectCostsFormV2(
          get(directCostsFormQuery.data, "forms[0]")
        ),
        LOAN_APPLICATION_STEPS.DIRECT_COSTS
      )
    }
  }, [changeDataAndProgress, directCostsFormQuery.data, isInitialized])

  // Assets Form (Current & Long-Term)
  const assetsFormQuery = useQueryCommonForm({
    applicationId: loanApplicationId,
    queryKey: QUERY_KEY.GET_CURRENT_ASSETS_FORM,
    formTypes: [FORM_TYPE.ASSETS],
    enabled: isCapitalCollab() && isEnabledQuery(LOAN_APPLICATION_STEPS.ASSETS)
  })

  useEffect(() => {
    if (assetsFormQuery.data && isInitialized && isCapitalCollab()) {
      changeDataAndProgress(
        deserializeAssetsFormV2(get(assetsFormQuery.data, "forms[0]")),
        LOAN_APPLICATION_STEPS.ASSETS
      )
    }
  }, [changeDataAndProgress, assetsFormQuery.data, isInitialized])

  // Debt Financing
  const debtFinancingFormQuery = useQueryCommonForm({
    applicationId: loanApplicationId,
    queryKey: QUERY_KEY.GET_FP_DEBT_FINANCING_FORM,
    formTypes: [FORM_TYPE.DEBT_FINANCING],
    enabled:
      isCapitalCollab() && isEnabledQuery(LOAN_APPLICATION_STEPS.DEBT_FINANCING)
  })

  useEffect(() => {
    if (
      (debtFinancingFormQuery?.data || debtFinancingFormQuery?.data) &&
      isInitialized &&
      isCapitalCollab()
    ) {
      changeDataAndProgress(
        deserializeDebtFinancingFormV2(
          get(debtFinancingFormQuery.data, "forms[0]")
        ),
        LOAN_APPLICATION_STEPS.DEBT_FINANCING,
        !!debtFinancingFormQuery.data
      )
    }
  }, [changeDataAndProgress, debtFinancingFormQuery.data, isInitialized])

  return {
    operatingExpensesCCFormQuery: operatingExpensesFormQuery,
    debtFinancingCCFormQuery: debtFinancingFormQuery,
    assetsCCFormQuery: assetsFormQuery,
    directCostsCCFormQuery: directCostsFormQuery
  }
}
