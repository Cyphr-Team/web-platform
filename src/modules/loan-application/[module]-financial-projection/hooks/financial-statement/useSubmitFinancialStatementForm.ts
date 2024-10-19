import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { customRequestHeader } from "@/utils/request-header.ts"
import { toastError } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { getAxiosError } from "@/utils/custom-error.ts"
import { useCallback } from "react"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import {
  FinancialStatementFormField,
  type FinancialStatementFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/financial-statement-store"
import {
  type FinancialStatementDeleteRequest,
  type FinancialStatementFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"

interface Props {
  rawData: FinancialStatementFormValue
}

export const useSubmitFinancialStatementForm = ({ rawData }: Props) => {
  const queryClient = useQueryClient()

  const { mutateAsync: upload, isUploading } =
    useMutateUploadFinancialStatement()
  const { mutateAsync: remove, isRemoving } =
    useMutateDeleteFinancialStatement()

  const uploadFunction = useCallback(
    async (request: FormData) => {
      return upload(request, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_FINANCIAL_STATEMENT_FORM]
          })

          return res
        },
        onError: (error) =>
          toastError({ title: error.name, description: error.message })
      })
    },
    [queryClient, upload]
  )

  const removeFunction = useCallback(
    async (request: FinancialStatementDeleteRequest) => {
      return remove(request, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_FINANCIAL_STATEMENT_FORM]
          })

          return res
        },
        onError: (error) =>
          toastError({ title: error.name, description: error.message })
      })
    },
    [queryClient, remove]
  )

  // Call API
  const submitFinancialStatement = async (loanApplicationId: string) => {
    const formData = new FormData()

    formData.append(FinancialStatementFormField.setupId, loanApplicationId)
    if (rawData.hasDocument === BINARY_VALUES.YES) {
      // Upload new file if there is any
      formData.append(FinancialStatementFormField.hasDocument, "true")
      if (rawData.files && rawData.files?.length > 0) {
        rawData.files.forEach((file) => {
          formData.append(FinancialStatementFormField.files, file)
        })
        await uploadFunction(formData)
      }
      // Remove the uploaded file if there is any
      if (rawData.deletedFiles && rawData.deletedFiles?.length > 0) {
        const removePromises = rawData.deletedFiles.map((id) =>
          removeFunction({ setupId: loanApplicationId, documentId: id })
        )

        await Promise.allSettled(removePromises)
      }
    } else {
      formData.append(FinancialStatementFormField.hasDocument, "false")
      // Empty upload if existed, and remove if existed
      if (rawData.uploadedFiles && rawData.uploadedFiles?.length > 0) {
        const removePromises = rawData.uploadedFiles.map((item) =>
          removeFunction({ setupId: loanApplicationId, documentId: item.id })
        )

        await Promise.allSettled(removePromises)
      } else {
        await uploadFunction(formData)
      }
    }
  }

  return {
    submitForm: submitFinancialStatement,
    isLoading: isUploading || isRemoving
  }
}

const useMutateUploadFinancialStatement = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return postRequest({
        path: API_PATH.financialProjection.financialStatement.upload,
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

const useMutateDeleteFinancialStatement = () => {
  const mutation = useMutation({
    mutationFn: ({ setupId, documentId }: FinancialStatementDeleteRequest) => {
      return postRequest({
        path: API_PATH.financialProjection.financialStatement.delete,
        params: { setupId, documentId },
        customHeader: {
          ...customRequestHeader.customHeaders
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
    isRemoving: mutation.isPending
  }
}

export const reverseFormatFinancialStatementForm = (
  responseData: FinancialStatementFormResponse
): FinancialStatementFormValue => {
  return {
    applicationId: responseData.financialProjectionSetupId,
    files: [],
    uploadedFiles: responseData.documents,
    hasDocument: responseData.hasDocument
      ? BINARY_VALUES.YES
      : BINARY_VALUES.NO,
    deletedFiles: []
  }
}
