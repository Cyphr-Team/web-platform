import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { API_PATH } from "@/constants"
import { isEnableFormV2 } from "@/utils/feature-flag.utils"
import type { FORM_TYPE } from "../../models/LoanApplicationStep/type"
import {
  type FormV2GetRequest,
  type FormV2DataResponse,
  type NullableFormV2DataResponse
} from "@/modules/loan-application/types/form.v2"

export interface UseQueryCommonFormProps {
  applicationId: string
  queryKey: string
  formTypes: FORM_TYPE[]
  enabled: boolean
}

export const useQueryCommonForm = ({
  applicationId,
  queryKey,
  formTypes,
  enabled = true
}: UseQueryCommonFormProps) => {
  return useQuery<NullableFormV2DataResponse, never>({
    queryKey: [queryKey, applicationId],
    queryFn: async () => {
      const response = await postRequest<FormV2GetRequest, FormV2DataResponse>({
        path: API_PATH.application.formV2.common.index,
        data: {
          applicationId: applicationId ?? "",
          formTypes
        }
      })

      // ** EDGE CASE: **
      // This block is for checking if we already saved the empty form or not.
      // This is specifically for the case where we have a form that is not required to be filled.
      // - If YES, we mark that step as done (response.data.forms.length == 1, with metadata == {}).
      // - If NO, we keep it as not done (response.data.forms does not exist or is empty).
      if (!response.data.forms || response.data.forms.length === 0) {
        return null
      }

      return response.data
    },
    enabled: !!applicationId && isEnableFormV2() && enabled
  })
}
