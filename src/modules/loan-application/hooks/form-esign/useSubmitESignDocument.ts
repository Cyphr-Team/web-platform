import { type ESignFormValue } from "../../constants/form.ts"
import { useLinkESignDocument } from "./useLinkESignDocument.ts"

export const useSubmitESignDocument = (eSignData: ESignFormValue) => {
  const { mutateAsync, isPending } = useLinkESignDocument()

  const submitESignDocument = async (applicationId: string) => {
    if (!eSignData.documentId) {
      throw new Error("Document ID is required")
    }
    await mutateAsync({
      applicationId,
      documentId: eSignData.documentId
    })
  }

  return {
    isLoading: isPending,
    submitESignDocument
  }
}
