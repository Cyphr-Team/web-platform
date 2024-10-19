import { postRequest } from "@/services/client.service"
import { type IUploadPhotoReqParams } from "@/types/upload.type"
import { useMutation } from "@tanstack/react-query"
import { type IUploadResponse } from "./useUploadFile"
import { type ErrorResponse } from "react-router-dom"
import { type AxiosError, type AxiosResponse } from "axios"
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

      return postRequest({
        path: API_PATH.asset.upload,
        data: request
      })
    }
  })
}
