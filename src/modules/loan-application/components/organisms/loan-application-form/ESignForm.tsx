import { AppAlert } from "@/components/ui/alert"
import { Button, ButtonLoading } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  eSignFormSchema,
  type ESignFormValue
} from "@/modules/loan-application/constants/form"
import { useCreateESignDocumentByFile } from "@/modules/loan-application/hooks/form-esign/useCreateESignDocument"
import { useCreateESignSession } from "@/modules/loan-application/hooks/form-esign/useCreateESignSession"
import { usePollingESignDocumentStatus } from "@/modules/loan-application/hooks/form-esign/usePollingESignDocumentStatus"
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
import { ArrowRight, Loader2, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { isLoanReady, isSbb } from "@/utils/domain.utils.ts"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

export function ESignForm() {
  const { dispatchFormAction, eSignForm } = useLoanApplicationFormContext()
  const { progress, finishCurrentStep } = useLoanApplicationProgressContext()
  const [isShowCreateSessionBtn, setIsShowCreateSessionBtn] = useState(false)
  const [isShowCreateDocumentBtn, setIsShowCreateDocumentBtn] = useState(false)

  const [acknowledgeDisclaimer, setAcknowledgeDisclaimer] = useState(false)
  const acknowledgeTheDisclaimer = () => {
    setAcknowledgeDisclaimer(true)
  }

  // Get loan program id
  const { loanProgramId } = useParams()

  // Get the PDF result from review application
  const { reviewApplication, ownerInformationForm } =
    useLoanApplicationFormContext()

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
   * - Need to save the documentId for later use to preventing create new document every time
   */
  const { mutate: mutateCreateDocument, isPending: isCreatingDocument } =
    useCreateESignDocumentByFile()
  const createDocument = useCallback(() => {
    if (!reviewApplication?.pdf) return

    const getFullName = () => {
      if (!ownerInformationForm) return
      if (isLoanReady()) {
        return ownerInformationForm?.fullName
      }
      if (isSbb()) {
        const { metadata } = ownerInformationForm

        if (!metadata?.firstName || !metadata?.lastName) return

        return `${metadata?.firstName} ${metadata?.lastName}`
      }

      return ownerInformationForm?.fullName
    }

    mutateCreateDocument(
      {
        pdf: reviewApplication?.pdf,
        totalPage: reviewApplication?.totalPage,
        programId: loanProgramId ?? "",
        fullName: getFullName()
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
          setIsShowCreateDocumentBtn(false)
        },
        onError() {
          setIsShowCreateDocumentBtn(true)
        }
      }
    )
  }, [
    dispatchFormAction,
    form,
    mutateCreateDocument,
    reviewApplication?.pdf,
    reviewApplication?.totalPage,
    loanProgramId
  ])

  const handleCreateESignDocument = useCallback(async () => {
    if (documentId) return
    if (!reviewApplication?.pdf) return

    createDocument()
  }, [createDocument, documentId, reviewApplication?.pdf])

  useEffect(() => {
    handleCreateESignDocument()
  }, [handleCreateESignDocument])
  // ------ End create document

  /**
   * Mutate - Create session by listening the 'documentStatusResponse'
   *
   * Create session, embedded with sessionId to view / sign the document
   *
   * Note:
   * - Need to save the sessionId for later use to prevent throttle
   */
  const { mutate: mutateSessionDocument, isPending: isCreatingSession } =
    useCreateESignSession()
  const createSession = useCallback(() => {
    if (!documentId) return
    mutateSessionDocument(documentId, {
      onSuccess(response) {
        form.setValue("sessionId", response.data.id)
        dispatchFormAction({
          action: FORM_ACTION.SET_DATA,
          state: { ...form.getValues(), sessionId: response.data.id },
          key: LOAN_APPLICATION_STEPS.E_SIGN
        })
        setIsShowCreateSessionBtn(false)
      },
      onError() {
        setIsShowCreateSessionBtn(true)
      }
    })
  }, [dispatchFormAction, documentId, form, mutateSessionDocument])
  const handleCreateESignSession = useCallback(async () => {
    if (!documentId) return
    if (sessionId) return
    const documentStatus = documentStatusResponse.data?.status?.toUpperCase()

    if (!sessionAbleDocumentStatus.some((status) => status === documentStatus))
      return

    createSession()
  }, [
    createSession,
    documentId,
    documentStatusResponse.data?.status,
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
      <div className="col-span-8 mx-6 flex md:col-span-6 md:col-start-2 md:mx-0">
        <AppAlert
          description="Please complete all previous steps? Once done, we will be able to generate an e-sign document for you. Thank you!"
          title="Warning!"
          variant="error"
        />
      </div>
    )
  }

  if (!acknowledgeDisclaimer) {
    const institutionName = isLoanReady() ? "LoanReady" : "Small Business Bank"

    return (
      <FormLayout
        hideTopNavigation
        id={LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE}
      >
        <h5 className="text-lg font-semibold">Cyphr Disclaimer</h5>
        <p className="text-sm">
          By submitting this application, you acknowledge that it does not form
          a legal contract for the provision of financial services. You certify
          that the information provided is accurate and understand that{" "}
          {institutionName} will rely on this accuracy during its evaluation.
          Submission of this application—whether by mail, fax, or
          electronically—constitutes certification by the company and the
          guarantor(s) signing on its behalf that, to the best of their
          knowledge, the information is true and correct.
        </p>
        <Button onClick={acknowledgeTheDisclaimer}>Next</Button>
      </FormLayout>
    )
  }

  return (
    <div
      className={cn(
        "col-span-6 flex flex-col gap-2xl overflow-auto rounded-lg p-0.5",
        "col-start-2",
        "h-full flex-1"
      )}
    >
      {sessionId ? (
        <div className="size-full">
          <iframe
            className="h-[70vh] w-full border"
            src={`https://app.pandadoc.com/s/${sessionId}/`}
          />

          <div className="float-right mt-3">
            <Button
              className="flex items-center gap-1"
              disabled={
                documentStatusResponse.data?.status?.toUpperCase() !==
                PandaDocDocumentStatus.COMPLETED
              }
              type="submit"
              onClick={onSubmit}
            >
              <span>
                {isLoanReady() ? "Submit assessment" : "Submit application"}
              </span>
              <ArrowRight className="w-5" />
            </Button>
          </div>
        </div>
      ) : isShowCreateSessionBtn || isShowCreateDocumentBtn ? (
        <div className="flex h-full flex-col items-center gap-4">
          <AppAlert
            description={
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p>
                  Too many attempts to generate a document. Please try again
                  later.
                </p>
                {isShowCreateDocumentBtn ? (
                  <ButtonLoading
                    className="mb-2 ml-auto flex h-auto items-center gap-1 px-2 py-1"
                    isLoading={isCreatingDocument}
                    type="button"
                    variant="outline"
                    onClick={() => createDocument()}
                  >
                    <span>Retry</span>
                    <RefreshCw className="w-4" />
                  </ButtonLoading>
                ) : null}
                {!isShowCreateDocumentBtn && isShowCreateSessionBtn ? (
                  <ButtonLoading
                    className="mb-2 ml-auto flex h-auto items-center gap-1 px-2 py-1"
                    isLoading={isCreatingSession}
                    type="button"
                    variant="outline"
                    onClick={() => createSession()}
                  >
                    <span>Retry</span>
                    <RefreshCw className="w-4" />
                  </ButtonLoading>
                ) : null}
              </div>
            }
            title="Request document error."
            variant="error"
          />
        </div>
      ) : (
        <div className="flex h-full items-center gap-1">
          <AppAlert
            description={
              <div>
                <p>
                  Please wait a moment while we generate your document for
                  signing.
                </p>
                <p>
                  Thank you for your patience...
                  <Loader2 className="mb-1 ml-0.5 inline-block size-4 animate-spin" />
                </p>
              </div>
            }
            title="Generating!"
            variant="success"
          />
        </div>
      )}
    </div>
  )
}
