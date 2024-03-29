import { postRequest } from "@/services/client.service"
import { IUploadPhotoReqParams } from "@/types/upload.type"
import { useMutation } from "@tanstack/react-query"
import { IUploadResponse } from "./useUploadFile"
import { ErrorResponse } from "react-router-dom"
import { AxiosError, AxiosResponse } from "axios"
import { API_PATH } from "@/constants"

export const useUploadFileMutation = () => {
  return useMutation<
    AxiosResponse<IUploadResponse>,
    AxiosError<ErrorResponse>,
    IUploadPhotoReqParams
  >({
    mutationFn: (reqBody: IUploadPhotoReqParams) => {
      const request = new FormData()

      for (const [key, value] of Object.entries(reqBody)) {
        if (value instanceof File) request.append(key, value)
        else if (value) {
          request.append(key, value + "")
        }
      }

      return postRequest({ path: API_PATH.asset.upload, data: request })
    }
  })
}
