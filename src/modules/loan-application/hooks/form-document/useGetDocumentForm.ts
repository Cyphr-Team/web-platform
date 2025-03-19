import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { skipToken, useQuery } from "@tanstack/react-query"
import { FORM_QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  type DocumentFetchError,
  type DocumentFormResponse
} from "@/types/form/document-form.type.ts"
import type { AxiosResponse } from "axios"
import _ from "lodash"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"

interface FetchDocumentFormRequest {
  applicationId: string | undefined
  formType: FORM_TYPE
}

type FetchDocumentFormResponse = PromiseSettledResult<
  AxiosResponse<DocumentFormResponse>
>[]

interface UseGetDocumentFormProps<T> {
  request: {
    applicationId: string | undefined
    formTypes: FORM_TYPE[]
  }
  selectFn?: (data: FetchDocumentFormResponse) => T
  options?: {
    enabled?: boolean
  }
}

// Fetch
function fetchDocumentForm(request: FetchDocumentFormRequest) {
  const { applicationId, formType } = request

  return postRequest<FetchDocumentFormRequest, DocumentFormResponse>({
    path: API_PATH.application.formV2.documentForm.detail,
    data: { applicationId, formType }
  })
}

function fetchDocumentForms<T>(request: UseGetDocumentFormProps<T>["request"]) {
  return Promise.allSettled(
    request.formTypes.map((formType) =>
      fetchDocumentForm({
        ...request,
        formType
      })
    )
  )
}

// Base useQuery
export const useGetDocumentForm = <T>({
  request,
  options = { enabled: true },
  selectFn
}: UseGetDocumentFormProps<T>) => {
  return useQuery({
    queryKey: [
      FORM_QUERY_KEY.GET_DOCUMENT_FORM,
      request.applicationId,
      request.formTypes
    ],
    queryFn:
      !!request.applicationId && options.enabled
        ? () => fetchDocumentForms(request)
        : skipToken,
    select: selectFn
  })
}

// SBB useQuery
export const useGetSBBDocumentForms = (applicationId: string | undefined) => {
  const SBB_DOCUMENT_FORMS = [
    FORM_TYPE.BUSINESS_EIN_LETTER,
    FORM_TYPE.CERTIFICATE_OF_GOOD_STANDING,
    FORM_TYPE.FICTITIOUS_NAME_CERTIFICATION,
    FORM_TYPE.ARTICLES_OF_ORGANIZATION,
    FORM_TYPE.BY_LAWS
  ]

  return useGetDocumentForm({
    request: {
      applicationId,
      formTypes: SBB_DOCUMENT_FORMS
    },
    options: {
      enabled: isEnableFormV2()
    },
    selectFn: (data) =>
      transformDocumentForm({
        data: data,
        formTypes: SBB_DOCUMENT_FORMS
      })
  })
}

// Transformer
type DocumentFetchResult =
  | {
      status: "fulfilled"
      detail: DocumentFormResponse
    }
  | {
      status: "rejected"
      error: DocumentFetchError
    }
type DocumentFetchResultsByType = Record<FORM_TYPE, DocumentFetchResult>
const transformDocumentForm = ({
  data,
  formTypes
}: {
  data: FetchDocumentFormResponse
  formTypes: FORM_TYPE[]
}): DocumentFetchResultsByType => {
  const results = new Map<FORM_TYPE, DocumentFetchResult>()

  formTypes.forEach((formType, index) => {
    const item = data[index]
    let result = null

    if (item.status === "fulfilled") {
      result = {
        detail: item.value.data,
        status: item.status
      }
    } else {
      result = {
        error: _.get(item, "reason.message"),
        status: item.status
      }
    }

    results.set(formType, result)
  })

  return Object.fromEntries(results) as Record<FORM_TYPE, DocumentFetchResult>
}
