import { API_PATH } from "@/constants"
import {
  loanApplicationKeys,
  loanApplicationUserKeys
} from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import {
  type LoanReadyApplicationUpdateRequest,
  type LoanReadySubscription
} from "@/modules/loanready/constants/types/subscription.type"
import { postRequest } from "@/services/client.service"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import {
  useSearchParams,
  type ErrorResponse,
  useNavigate
} from "react-router-dom"
import { APP_PATH } from "@/constants"

export const useUpdateLinkTransactionAndApplication = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<
    AxiosResponse<LoanReadySubscription>,
    AxiosError<ErrorResponse>,
    LoanReadyApplicationUpdateRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.loanReady.linkSubscription,
        data
      })
    },
    onError: (error) => {
      toastError({
        title: TOAST_MSG.loanApplication.paymentSubscription.title,
        description: getAxiosError(error).message
      })
    },
    onSuccess: (data) => {
      toastSuccess(TOAST_MSG.loanApplication.paymentSubscription)
      // Invalidate the loan application list and this loan application detail
      queryClient.invalidateQueries({ queryKey: loanApplicationKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.detail(data.data.applicationId)
      })
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.GET_LOANREADY_SUBSCRIPTION_BY_PAYMENT_TRANSACTION_ID,
          data.data.paymentTransactionId
        ]
      })
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.GET_LOANREADY_SUBSCRIPTION_BY_APPLICATION_ID,
          data.data.applicationId
        ]
      })
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.lists()
      })
    }
  })

  return {
    updateLinkTransactionAndApplication: mutation.mutateAsync,
    isUpdatingLinkTransactionAndApplication: mutation.isPending
  }
}

/**
 * This hook is used to link a new application to a LoanReady package subscription.
 *
 * We check if we have a payment transaction ID and an application ID to attach.
 * If yes, we call the `useUpdateLinkTransactionAndApplication` hook to
 * link the application to the LoanReady package subscription.
 *
 * If no payment transaction ID is found, we show an error message.
 *
 * This hook is used in the payment success page.
 */
export const useLinkApplicationToLoanReadySubscription = () => {
  const [searchParams] = useSearchParams()
  const paymentTransactionId = searchParams.get("transactionId")
  const navigate = useNavigate()

  const {
    updateLinkTransactionAndApplication,
    isUpdatingLinkTransactionAndApplication: isLinking
  } = useUpdateLinkTransactionAndApplication()

  const mutateLink = async (applicationId: string) => {
    // Check if we have paymentTransactionId to attach
    if (paymentTransactionId) {
      await updateLinkTransactionAndApplication({
        paymentTransactionId: paymentTransactionId,
        applicationId: applicationId
      })
    } else {
      toastError({
        title: TOAST_MSG.loanApplication.paymentSubscription.title,
        description:
          "Can't find available payment transaction for your application. Please make sure you purchase the package or contact our support team."
      })
    }
  }

  const mutateLinkForUpgrade = (
    paymentTransactionId?: string,
    applicationId?: string,
    loanProgramId?: string
  ) => {
    if (applicationId && paymentTransactionId && loanProgramId) {
      updateLinkTransactionAndApplication(
        { paymentTransactionId, applicationId },
        {
          onSuccess: () => {
            navigate(
              APP_PATH.LOAN_APPLICATION.APPLICATIONS.financialApplicationDetails(
                applicationId,
                loanProgramId
              ),
              {
                replace: true
              }
            )
          },
          onError: () => {
            toastError({
              title: TOAST_MSG.loanApplication.paymentSubscription.title,
              description: "Can not link the application to the subscription."
            })
          }
        }
      )
    } else {
      toastError({
        title: TOAST_MSG.loanApplication.paymentSubscription.title,
        description:
          "Can't find available payment transaction for your application. Please make sure you purchase the package or contact our support team."
      })
    }
  }

  return {
    mutateLink,
    mutateLinkForUpgrade,
    isLinking
  }
}
