import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest, requestToFormData } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { AxiosError, AxiosResponse } from "axios"
import { SBBUploadDocumentFormResponse } from "@/modules/loan-application/constants/type.ts"
import { ErrorResponse } from "@/types/common.type.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useCallback } from "react"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { get } from "lodash"
import { ArticlesOfOrganizationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ArticlesOfOrganizationForm.tsx"
import { BusinessEinLetterFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/BusinessEinLetterForm.tsx"
import { ByLawsFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/ByLawsForm.tsx"
import { CertificateGoodStandingFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/CertificateGoodStandingForm.tsx"
import { FictitiousNameCertificationFormValue } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/sbb/FictitiousNameCertification.tsx"

type Args = {
  articlesOfOrganizationData: ArticlesOfOrganizationFormValue
  businessEinLetterData: BusinessEinLetterFormValue
  byLawsData: ByLawsFormValue
  certificateGoodStandingData: CertificateGoodStandingFormValue
  fictitiousNameCertificationData: FictitiousNameCertificationFormValue
}

export const useUploadSbbDocument = (args: Args) => {
  const queryClient = useQueryClient()

  const { mutateAsync: submit, isPending } = useMutateSubmitSbbDocument()
  const { mutateAsync: upload, isUploading } = useMutateUploadSbbDocument()

  const uploadFunction = useCallback(
    async (request: FormData) => {
      return upload(request, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_SBB_DOCUMENT_FORM]
          })
          return res
        },
        onError: (error) =>
          toastError({ title: error.name, description: error.message })
      })
    },
    [queryClient, upload]
  )

  const data = [
    {
      ...args.articlesOfOrganizationData,
      documentType: FORM_TYPE.ARTICLES_OF_ORGANIZATION
    },
    {
      ...args.businessEinLetterData,
      documentType: FORM_TYPE.BUSINESS_EIN_LETTER
    },
    {
      ...args.byLawsData,
      documentType: FORM_TYPE.BY_LAWS
    },
    {
      ...args.certificateGoodStandingData,
      documentType: FORM_TYPE.CERTIFICATE_OF_GOOD_STANDING
    },
    {
      ...args.fictitiousNameCertificationData,
      documentType: FORM_TYPE.FICTITIOUS_NAME_CERTIFICATION
    }
  ]

  // Call API
  const submitSbbDocument = async (loanApplicationId: string) => {
    const formId =
      findFormId(data) ??
      // if it not exists, we will submit it
      (await submit({ loanApplicationId })).data.id

    const tasks = data
      // Map each form data to an upload data task
      .map((form) => {
        const files = form.files ?? []
        if (files.length > 0) {
          /** This is where the magic comes hehe by @Phuc.Nguyen */
          return uploadFunction(
            requestToFormData({
              formId,
              files: files,
              documentType: form.documentType
            })
          )
        }
      })
      .filter((cb) => cb !== undefined)

    await Promise.allSettled(tasks)
  }

  return {
    submitSbbDocument,
    isLoading: isPending || isUploading
  }
}

const findFormId = (list: object[]): string | undefined => {
  /**
   * Find the formId in all form. If there is any form that contain formId then return it
   * */
  return list
    .filter((document) => get(document, "formId") !== undefined)
    .map((document) => get(document, "formId"))
    .at(0)
}

const useMutateSubmitSbbDocument = () => {
  return useMutation<
    AxiosResponse<SBBUploadDocumentFormResponse>,
    AxiosError<ErrorResponse>,
    { loanApplicationId: string }
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.sbbDocument.submit,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  })
}

const useMutateUploadSbbDocument = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return postRequest({
        path: API_PATH.application.sbbDocument.upload,
        data,
        customHeader: {
          ...customRequestHeader.customHeaders,
          "Content-Type": "multipart/form-data"
        }
      })
    },
    onSuccess: (data) => data,
    onError(error) {
      toastError({
        ...TOAST_MSG.loanApplication.uploadDocument,
        description: getAxiosError(error).message
      })
    }
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isUploading: mutation.isPending
  }
}
