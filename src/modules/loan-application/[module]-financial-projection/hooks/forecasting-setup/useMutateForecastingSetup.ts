import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { type ForecastingSetupFormValue } from "@/modules/loan-application/[module]-financial-projection/types/forecasting-form.ts"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"

export const useMutateForecastingSetup = (
  rawData: ForecastingSetupFormValue
) => {
  const queryClient = useQueryClient()

  const { mutateAsync: update, isPending: isUpdating } = useUpdate()
  const { mutateAsync: create, isPending: isSubmitting } = useCreate()

  const mutateAsync = async (applicationId?: string) => {
    const queryOptions = {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_FORECASTING_SETUP_FORM]
        })
      },
      onError(error: AxiosError) {
        toastError({
          ...TOAST_MSG.financialProjection.forecastingSetup.createFail,
          description: getAxiosError(error).message
        })
      }
    }

    return rawData.id
      ? update(formatUpdateData(rawData), queryOptions)
      : create(formatCreateData(applicationId ?? "", rawData), queryOptions)
  }

  return {
    isLoading: isUpdating || isSubmitting,
    submitForm: mutateAsync
  }
}

interface CreateForecastingSetupFormRequest {
  applicationId: string
  lengthOfForecast: number
  firstYearOfForecast: number
}

function formatCreateData(
  applicationId: string,
  data: ForecastingSetupFormValue
): CreateForecastingSetupFormRequest {
  return {
    applicationId: applicationId,
    firstYearOfForecast: Number.parseInt(data.firstYearOfForecast),
    lengthOfForecast: Number.parseInt(data.lengthOfForecast)
  }
}

const useCreate = () => {
  return useMutation<
    AxiosResponse<ForecastingSetupFormValue>,
    AxiosError<ErrorResponse>,
    CreateForecastingSetupFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.forecastingSetup.create,
        data
      })
    }
  })
}

interface UpdateForecastingSetupFormRequest {
  id: string
  lengthOfForecast: number
  firstYearOfForecast: number
}

const useUpdate = () => {
  return useMutation<
    AxiosResponse<ForecastingSetupFormValue>,
    AxiosError<ErrorResponse>,
    UpdateForecastingSetupFormRequest
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.financialProjection.forecastingSetup.update,
        data
      })
    }
  })
}

function formatUpdateData(
  data: ForecastingSetupFormValue
): UpdateForecastingSetupFormRequest {
  return {
    id: data.id,
    firstYearOfForecast: Number.parseInt(data.firstYearOfForecast),
    lengthOfForecast: Number.parseInt(data.lengthOfForecast)
  }
}
