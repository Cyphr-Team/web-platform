import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import {
  PreQualificationFormRequest,
  PreQualificationResponse
} from "../../constants/type"
import { toastError } from "@/utils"
import { useLoanApplicationFormContext } from "../../providers"
import { LOAN_APPLICATION_STEPS } from "../../models/LoanApplicationStep/type"
import { FORM_ACTION } from "../../providers/LoanApplicationFormProvider"
import { get } from "lodash"
export const useSubmitPreQualificationForm = () => {
  const { dispatchFormAction } = useLoanApplicationFormContext()

  return useMutation<
    AxiosResponse<PreQualificationResponse>,
    AxiosError<ErrorResponse>,
    PreQualificationFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.preQualification.index,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onError: (error) => {
      toastError({ title: "Something went wrong!", description: error.message })
    },
    onSuccess: (response) => {
      if (response.data.isQualified) {
        dispatchFormAction({
          action: FORM_ACTION.SET_DATA,
          key: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
          state: {
            id: "",
            applicationId: response.data.applicationId,
            loanAmount: 0,
            loanTermInMonth: 1,
            proposeUseOfLoan: "other"
          }
        })
        dispatchFormAction({
          action: FORM_ACTION.SET_DATA,
          key: LOAN_APPLICATION_STEPS.PRE_QUALIFICATION,
          state: {
            applicationId: response.data.applicationId,
            isCompanyBasedInUs: get(response.data, "isCompanyBasedInUs"),
            foundingTeamEligibleToWorkInUs: get(
              response.data,
              "foundingTeamEligibleToWorkInUs"
            ),
            isForProfitTechCompany: get(
              response.data,
              "isForProfitTechCompany"
            ),
            hasMvpWithRevenueUnderOneMillion: get(
              response.data,
              "hasMvpWithRevenueUnderOneMillion"
            ),
            willingToOperateInKansasCityMo: get(
              response.data,
              "willingToOperateInKansasCityMo"
            )
          }
        })
      }
    }
  })
}
