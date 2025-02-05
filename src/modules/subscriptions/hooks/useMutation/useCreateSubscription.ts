import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import * as z from "zod"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { subscriptionKeys } from "@/constants/query-key"
import { type Plan } from "@/modules/subscriptions/types/subscription.types"
import { createNumberSchema } from "@/constants/validate"

export const createSubscriptionForm = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  price: z.number().min(1, "Price is required."),
  quotaSeats: createNumberSchema({
    coerce: true,
    min: 1,
    customErrors: {
      required: "Seats must be higher than 0"
    }
  }),
  quotaApplications: createNumberSchema({
    coerce: true,
    min: 1,
    customErrors: {
      required: "Applications must be higher than 0"
    }
  })
})

export type CreateSubscriptionValue = z.infer<typeof createSubscriptionForm>

export const useCreateSubscriptionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<Plan>,
    AxiosError<ErrorResponse>,
    CreateSubscriptionValue
  >({
    mutationFn: (data) => {
      const { name, description, price, quotaSeats, quotaApplications } = data
      const payload = {
        name,
        description,
        price,
        numberOfSeats: { value: quotaSeats, isUnlimited: false },
        numberOfApplications: { value: quotaApplications, isUnlimited: false }
      }

      return postRequest({
        path: API_PATH.plan.create(),
        data: payload
      })
    },
    onSuccess() {
      toastSuccess(TOAST_MSG.subscription.create)
      queryClient.invalidateQueries({
        queryKey: subscriptionKeys.lists()
      })
    },
    onError(error) {
      toastError({
        ...TOAST_MSG.subscription.create,
        description: getAxiosError(error).message
      })
    }
  })
}
