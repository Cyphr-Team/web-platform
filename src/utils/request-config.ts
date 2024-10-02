import { AxiosRequestConfig } from "axios"

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream"

// Configuration builder for Axios requests
const configWithResponseType = (
  responseType: ResponseType
): AxiosRequestConfig => {
  return {
    responseType: responseType
  }
}

export { configWithResponseType }
