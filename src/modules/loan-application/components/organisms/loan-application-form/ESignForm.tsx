import { AppAlert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  eSignFormSchema,
  ESignFormValue
} from "@/modules/loan-application/constants/form"
import { useCreateESignDocumentByFile } from "@/modules/loan-application/hooks/useESign/useCreateESignDocument"
import { useCreateESignSession } from "@/modules/loan-application/hooks/useESign/useCreateESignSession"
import { usePollingESignDocumentStatus } from "@/modules/loan-application/hooks/useESign/usePollingESignDocumentStatus"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import {
  PandaDocDocumentStatus,
  sessionAbleDocumentStatus
} from "@/types/esign/document.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"

export const ESignForm = () => {
  const { dispatchFormAction, eSignForm } = useLoanApplicationFormContext()
  const { progress, finishCurrentStep } = useLoanApplicationProgressContext()

  // Get the PDF result from review application
  const { reviewApplication } = useLoanApplicationFormContext()

  // Prepare E-sign form
  const form = useForm<ESignFormValue>({
    resolver: zodResolver(eSignFormSchema),
    defaultValues: {
      documentId: eSignForm?.documentId,
      sessionId: eSignForm?.sessionId
    },
    mode: "onChange"
  })
  const sessionId = form.watch("sessionId")
  const documentId = form.watch("documentId")

  // Query - Get document status
  const documentStatusResponse = usePollingESignDocumentStatus({
    documentId
  })

  const onSubmit = form.handleSubmit((data: ESignFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      state: data,
      key: LOAN_APPLICATION_STEPS.E_SIGN
    })
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      state: {
        printName: "",
        signatureDate: ""
      },
      key: LOAN_APPLICATION_STEPS.CONFIRMATION
    })
    finishCurrentStep()
  })

  /**
   * Mutate - Create document by listening the 'documentStatusResponse'
   *
   * Create document by using the pdf that generate from the 'Review Application' step
   *
   * Note:
   * - Need to save the documentId for later use
   */
  const { mutate: mutateCreateDocument } = useCreateESignDocumentByFile()
  const handleCreateESignDocument = useCallback(async () => {
    if (documentId) return
    if (!reviewApplication?.pdf) return

    mutateCreateDocument(
      {
        pdf: reviewApplication?.pdf,
        totalPage: reviewApplication?.totalPage
      },
      {
        onSuccess(response) {
          form.setValue("documentId", response.data.documentId)

          dispatchFormAction({
            action: FORM_ACTION.SET_DATA,
            state: {
              ...form.getValues(),
              documentId: response.data.documentId
            },
            key: LOAN_APPLICATION_STEPS.E_SIGN
          })
        }
      }
    )
  }, [
    dispatchFormAction,
    documentId,
    form,
    mutateCreateDocument,
    reviewApplication?.pdf,
    reviewApplication?.totalPage
  ])

  useEffect(() => {
    handleCreateESignDocument() // TODO - ESign handle replace stale document when client update new data
  }, [handleCreateESignDocument])
  // ------ End create document

  /**
   * Mutate - Create session by listening the 'documentStatusResponse'
   *
   * Create session, embedded with sessionId to view / sign the document
   *
   * Note:
   * - No need to save to form data, can be created multiple times
   */
  const { mutate: mutateSessionDocument } = useCreateESignSession()
  const handleCreateESignSession = useCallback(async () => {
    if (!documentId) return
    if (sessionId) return

    const documentStatus = documentStatusResponse.data?.status?.toUpperCase()
    if (!sessionAbleDocumentStatus.some((status) => status === documentStatus))
      return

    mutateSessionDocument(documentId, {
      onSuccess(response) {
        form.setValue("sessionId", response.data.id)
      }
    })
  }, [
    documentId,
    documentStatusResponse.data?.status,
    form,
    mutateSessionDocument,
    sessionId
  ])

  useEffect(() => {
    handleCreateESignSession()
  }, [handleCreateESignSession])
  // ------ End create session

  // Check if all previous steps are completed to generate a warning alert.
  // This helps inform the user that they need to finish all steps to proceed with E-Sign.
  const isPreviousStepsCompleted =
    progress.filter(
      (val) =>
        val.step !== LOAN_APPLICATION_STEPS.CONFIRMATION &&
        val.status !== LOAN_APPLICATION_STEP_STATUS.COMPLETE
    ).length === 0

  if (!isPreviousStepsCompleted) {
    return (
      <div className="flex md:col-span-6 md:col-start-2 col-span-8 mx-6 md:mx-0">
        <AppAlert
          variant="error"
          title="Warning!"
          description="Please complete all previous steps? Once done, we will be able to generate an e-sign document for you. Thank you!"
        />
      </div>
    )
  }

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-0",
        "h-full flex-1"
      )}
    >
      {sessionId ? (
        <div className="w-full h-full">
          <iframe
            className="h-[70vh] w-full"
            src={`https://app.pandadoc.com/s/${sessionId}/`}
          />

          <div className="mt-3 float-right">
            <Button
              type="submit"
              disabled={
                documentStatusResponse.data?.status?.toUpperCase() !==
                PandaDocDocumentStatus.COMPLETED
              }
              className="flex items-center gap-1"
              onClick={onSubmit}
            >
              <span>Submit application</span>
              <ArrowRight className="w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1 h-full">
          <span>Generating document for signing</span>
          <Loader2 className="w-5 h-5 animate-spin text-black" />.
        </div>
      )}
    </Card>
  )
}
