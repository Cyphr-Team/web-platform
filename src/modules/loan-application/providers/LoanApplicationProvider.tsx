import { useCallback, useEffect, useMemo, useState } from "react"
import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS,
  ProgressType,
  STEPS
} from "../constants"
import { createContext } from "use-context-selector"
import {
  BusinessFormValue,
  ConfirmationFormValue,
  FinancialFormValue,
  LoanRequestFormValue,
  OwnerFormValue
} from "../constants/form"
import { useCreateLoanApplication } from "../hooks/useCreateLoanApplication"
import { useNavigate, useParams } from "react-router-dom"
import { isEqual } from "lodash"
import { useSubmitLoanKybInformation } from "../hooks/useMutation/useSubmitLoanKybInformation"
import { useSubmitLoanKycInformation } from "../hooks/useMutation/useSubmitLoanKycInformation"
import { useMutateUploadDocument } from "../hooks/useMutation/useUploadDocumentMutation"
import { DocumentUploadedResponse, FORM_TYPE } from "../constants/type"
import { useSubmitLoanFinancialInformation } from "../hooks/useMutation/useSubmitLoanFinancialInformation"
import { toastError, toastSuccess } from "@/utils"
import { useSubmitLoanConfirmation } from "../hooks/useMutation/useSubmitLoanConfirmation"
import { useUpdateEffect } from "react-use"
import { useQueryGetKybForm } from "../hooks/useQuery/useQueryKybForm"
import { useQueryGetFinancialForm } from "../hooks/useQuery/useQueryFinancialForm"
import { useQueryGetDocumentsByForm } from "../hooks/useQuery/useQueryGetDocuments"
import { useQueryGetKycForm } from "../hooks/useQuery/useQueryKycForm"
import {
  formatKybForm,
  formatKycForm,
  reverseFormatKybForm,
  reverseFormatKycForm
} from "../services/form.services"
import { useUpdateLoanKybInformation } from "../hooks/useMutation/useUpdateLoanKybInformation"
import { useUpdateLoanKycInformation } from "../hooks/useMutation/useUpdateLoanKycInformation"
import { useUpdateLoanFinancialInformation } from "../hooks/useMutation/useUpdateLoanFinancialInformation"
import { useMutateDeleteDocuments } from "../hooks/useMutation/useDeleteDocumentsMutation"
import { useUpdateLoanApplication } from "../hooks/useMutation/useUpdateLoanRequest"
import { APP_PATH } from "@/constants"
import { TOAST_MSG } from "@/constants/toastMsg"
import { isLoanReady } from "@/utils/domain.utils"
import { useQueryClient } from "@tanstack/react-query"
import { getAxiosError } from "@/utils/custom-error"
import { AxiosError } from "axios"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { useBRLoanApplicationDetailsContext } from "."

type FormType = {
  [key in LOAN_APPLICATION_STEPS]:
    | LoanRequestFormValue
    | BusinessFormValue
    | OwnerFormValue
    | FinancialFormValue
    | ConfirmationFormValue
}

type DraftApplicationForm = {
  loanRequest?: LoanRequestFormValue
  businessInformation?: BusinessFormValue
  ownerInformationForm?: OwnerFormValue
  financialInformationForm?: FinancialFormValue
  confirmationForm?: ConfirmationFormValue
}

type LoanApplicationContextType = {
  step: LOAN_APPLICATION_STEPS
  changeStep: (step: LOAN_APPLICATION_STEPS, force?: boolean) => void
  progress: ProgressType[]
  loanApplicationId: string
  isSubmitting: boolean
  isUploading: boolean
  draftForm: DraftApplicationForm
  documentsUploaded: DocumentsUploaded
  setFormIsEdited: () => void
  alertDialog: LOAN_APPLICATION_STEPS | undefined
  saveDraftForm: (
    type: LOAN_APPLICATION_STEPS,
    value: FormType[LOAN_APPLICATION_STEPS]
  ) => void
  saveForm: () => void
  changeProgress: (step: LOAN_APPLICATION_STEPS) => void
  changeLoanApplicationId: (id: string) => void
  closeAlertDialog: () => void
  removeDocumentUploaded: (id: string, type: FORM_TYPE) => void
}

export const LoanApplicationContext = createContext<LoanApplicationContextType>(
  {
    step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    isSubmitting: false,
    isUploading: false,
    saveForm: () => {},
    changeStep: () => {},
    saveDraftForm: () => {},
    draftForm: {},
    progress: STEPS,
    loanApplicationId: "",
    changeProgress: () => {},
    changeLoanApplicationId: () => {},
    setFormIsEdited: () => {},
    alertDialog: undefined,
    closeAlertDialog: () => {},
    documentsUploaded: {
      financialDocuments: [],
      kycDocuments: []
    },
    removeDocumentUploaded: () => {}
  }
)

type Props = {
  children: React.ReactNode
}

type DocumentsUploaded = {
  financialDocuments: DocumentUploadedResponse[]
  kycDocuments: DocumentUploadedResponse[]
}

export const LoanApplicationProvider: React.FC<Props> = ({ children }) => {
  const [step, setStep] = useState<LOAN_APPLICATION_STEPS>(
    LOAN_APPLICATION_STEPS.LOAN_REQUEST
  )
  const { loanProgramId } = useParams()
  const { id } = useParams()
  const queryClient = useQueryClient()

  // Initial financialInformationForm for submitting request in the background
  const [draftForm, setDraftForm] = useState<DraftApplicationForm>({})

  const [loanApplicationId, setLoanApplicationId] = useState<string>("")

  const [progress, setProgress] = useState<ProgressType[]>(STEPS)

  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)

  const [documentsUploaded, setDocumentsUploaded] = useState<DocumentsUploaded>(
    {
      financialDocuments: [],
      kycDocuments: []
    }
  )

  const [alertDialog, setAlertDialog] = useState<
    LOAN_APPLICATION_STEPS | undefined
  >()

  const kybFormQuery = useQueryGetKybForm(id!)
  const kycFormQuery = useQueryGetKycForm(id!)
  const financialFormQuery = useQueryGetFinancialForm(id!)
  const financialDocumentsQuery = useQueryGetDocumentsByForm(
    financialFormQuery.data?.id ?? ""
  )
  const kycDocumentsQuery = useQueryGetDocumentsByForm(
    kycFormQuery.data?.id ?? ""
  )

  const { loanApplicationDetails } = useBRLoanApplicationDetailsContext()

  const {
    mutateAsync: updateLoanApplication,
    isPending: isUpdatingLoanApplication
  } = useUpdateLoanApplication({ id: loanApplicationId })

  const {
    mutateAsync: createLoanApplication,
    isPending: isCreatingLoanApplication
  } = useCreateLoanApplication()
  const { mutateAsync: updateLoanKyb, isPending: isUpdatingLoanKyb } =
    useUpdateLoanKybInformation()
  const { mutateAsync: updateLoanKyc, isPending: isUpdatingLoanKyc } =
    useUpdateLoanKycInformation()
  const {
    mutateAsync: updateFinancialInformation,
    isPending: isUploadingFinancial
  } = useUpdateLoanFinancialInformation()

  const { mutateAsync: submitLoanKyb, isPending: isSubmittingLoanKyb } =
    useSubmitLoanKybInformation()
  const { mutateAsync: submitLoanKyc, isPending: isSubmittingLoanKyc } =
    useSubmitLoanKycInformation()

  const { mutateAsync: deleteDocuments } = useMutateDeleteDocuments()
  const {
    mutateAsync: submitLoanFinancialInformation,
    isPending: isSubmittingFinancialInformation
  } = useSubmitLoanFinancialInformation()

  const {
    mutateAsync: submitConfirmation,
    isPending: isSubmittingConfirmation
  } = useSubmitLoanConfirmation()
  const { mutateAsync, isUploading } = useMutateUploadDocument()

  const navigate = useNavigate()

  const uploadDocuments = useCallback(
    async (formId: string, files: File[], formType: FORM_TYPE) => {
      const request = new FormData()

      const reqBody = {
        files: files,
        formType: formType,
        formId: formId
      }

      for (const [key, value] of Object.entries(reqBody)) {
        if (Array.isArray(value)) {
          value.forEach((file: File) => {
            request.append(key, file)
          })
        } else if (value) {
          request.append(key, value + "")
        }
      }

      await mutateAsync(request, {
        onSuccess: (res) => {
          return res
        }
      })
    },
    [mutateAsync]
  )

  const changeStep = useCallback(
    (step: LOAN_APPLICATION_STEPS, force?: boolean) => {
      if (force) {
        setStep(step)
        setAlertDialog(undefined)
        setIsFormEdited(false)
      } else if (isFormEdited) {
        setAlertDialog(step)
      } else {
        setStep(step)
      }
    },
    [isFormEdited]
  )

  const handleCheckFileKycRemoved = useCallback(() => {
    if (kycFormQuery.data) {
      const removedFiles = kycDocumentsQuery.data?.filter(
        (file) => !documentsUploaded.kycDocuments.includes(file)
      )

      !!removedFiles?.length &&
        removedFiles.forEach((file) => {
          deleteDocuments({
            documentId: file.id,
            formId: kycFormQuery.data.id,
            formType: FORM_TYPE.KYC
          })
        })
    }
  }, [
    deleteDocuments,
    documentsUploaded.kycDocuments,
    kycDocumentsQuery.data,
    kycFormQuery.data
  ])

  const handleCheckFileRemovedFinancial = useCallback(() => {
    if (financialFormQuery.data) {
      const removedFiles = financialDocumentsQuery.data?.filter(
        (file) => !documentsUploaded.financialDocuments.includes(file)
      )

      !!removedFiles?.length &&
        removedFiles.forEach((file) => {
          deleteDocuments({
            documentId: file.id,
            formId: financialFormQuery.data.id,
            formType: FORM_TYPE.FINANCIAL
          })
        })
    }
  }, [
    deleteDocuments,
    documentsUploaded.financialDocuments,
    financialDocumentsQuery.data,
    financialFormQuery.data
  ])

  const closeAlertDialog = useCallback(() => {
    setAlertDialog(undefined)
  }, [])

  const changeProgress = useCallback((step: LOAN_APPLICATION_STEPS) => {
    setProgress((prevProgress) => {
      return prevProgress.map((item) => {
        if (
          item.step === step &&
          item.status === LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
        ) {
          return {
            ...item,
            status: LOAN_APPLICATION_STEP_STATUS.COMPLETE
          }
        }
        return item
      })
    })
  }, [])

  const changeLoanApplicationId = useCallback((id: string) => {
    setLoanApplicationId(id)
  }, [])

  const setFormIsEdited = useCallback(() => {
    setIsFormEdited(true)
  }, [])

  const handleSubmitLoanKyc = useCallback(
    async (loanApplicationId: string) => {
      const { ownerInformationForm } = draftForm
      const uploadFiles = draftForm.ownerInformationForm?.governmentFile
      const kycFormId = kycFormQuery.data?.id

      if (kycFormId && id) {
        const responseData = {
          ...reverseFormatKycForm(kycFormQuery.data!),
          governmentFile: uploadFiles
        }

        handleCheckFileKycRemoved()

        if (isEqual(responseData, ownerInformationForm)) return
        const res = await updateLoanKyc({
          ...formatKycForm(ownerInformationForm!),
          id: kycFormId
        })
        if (draftForm.ownerInformationForm?.governmentFile.length) {
          await uploadDocuments(
            res.data.id,
            draftForm.ownerInformationForm.governmentFile,
            FORM_TYPE.KYC
          )
        }
      } else {
        const res = await submitLoanKyc({
          loanApplicationId: loanApplicationId,
          ...formatKycForm(ownerInformationForm!)
        })

        if (
          res.data &&
          !!draftForm.ownerInformationForm?.governmentFile.length
        ) {
          await uploadDocuments(
            res.data.id,
            draftForm.ownerInformationForm.governmentFile,
            FORM_TYPE.KYC
          )
        }
      }
    },
    [
      draftForm,
      handleCheckFileKycRemoved,
      id,
      kycFormQuery.data,
      submitLoanKyc,
      updateLoanKyc,
      uploadDocuments
    ]
  )

  const handleSubmitLoanKyb = useCallback(
    async (loanApplicationId: string) => {
      const { businessInformation } = draftForm
      const formattedData = formatKybForm(businessInformation!)
      const kybFormId = kybFormQuery.data?.id

      if (kybFormId && id) {
        const responseData =
          kybFormQuery.data && reverseFormatKybForm(kybFormQuery.data)

        if (isEqual(responseData, businessInformation)) return
        await updateLoanKyb({
          ...formattedData,
          id: kybFormId
        })
      } else {
        await submitLoanKyb({
          loanApplicationId: loanApplicationId,
          ...formattedData
        })
      }
    },
    [draftForm, id, kybFormQuery.data, submitLoanKyb, updateLoanKyb]
  )

  const handleSubmitConfirmation = useCallback(
    async (loanApplicationId: string) => {
      if (draftForm.confirmationForm) {
        await submitConfirmation({
          ...draftForm.confirmationForm,
          loanApplicationId: loanApplicationId
        })
      }
    },
    [draftForm.confirmationForm, submitConfirmation]
  )

  const handleSubmitFinancialInformation = useCallback(
    async (loanApplicationId: string) => {
      // Extract data from draftForm and financialFormQuery for readability
      const { financialInformationForm } = draftForm
      const financialFormId = financialFormQuery.data?.id

      if (!!financialFormId && id) {
        handleCheckFileRemovedFinancial()
        if (
          isEqual(
            financialFormQuery.data?.incomeCategories,
            financialInformationForm?.incomeCategories
          )
        )
          return
        await updateFinancialInformation({
          id: financialFormId,
          incomeCategories: financialInformationForm?.incomeCategories ?? [],
          loanApplicationId: loanApplicationId
        })
        if (financialInformationForm?.w2sFile?.length) {
          await uploadDocuments(
            financialFormId,
            financialInformationForm.w2sFile,
            FORM_TYPE.FINANCIAL
          )
        }
      } else {
        const res = await submitLoanFinancialInformation({
          id: null,
          incomeCategories: financialInformationForm?.incomeCategories ?? [],
          loanApplicationId: loanApplicationId
        })
        if (res.data && !!financialInformationForm?.w2sFile?.length) {
          await uploadDocuments(
            res.data.id,
            financialInformationForm.w2sFile,
            FORM_TYPE.FINANCIAL
          )
        }
      }
    },
    [
      draftForm,
      financialFormQuery.data,
      handleCheckFileRemovedFinancial,
      id,
      submitLoanFinancialInformation,
      updateFinancialInformation,
      uploadDocuments
    ]
  )

  //Update data from query to form
  useEffect(() => {
    if (kybFormQuery.data) {
      const businessInformation = reverseFormatKybForm(kybFormQuery.data)
      changeProgress(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)
      setDraftForm((prev) => {
        return {
          ...prev,
          [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: businessInformation
        }
      })
    }
  }, [changeProgress, kybFormQuery.data])

  useEffect(() => {
    if (!!financialFormQuery.data?.incomeCategories.length && id) {
      const financialInformation = {
        ...financialFormQuery.data,
        w2sFile: []
      }
      changeProgress(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION)
      setDraftForm((prev) => {
        return {
          ...prev,
          [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: financialInformation
        }
      })
    }
  }, [changeProgress, financialFormQuery.data, id])

  useEffect(() => {
    if (kycFormQuery.data && id) {
      const kycInformation = reverseFormatKycForm(kycFormQuery.data)
      changeProgress(LOAN_APPLICATION_STEPS.OWNER_INFORMATION)
      setDraftForm((prev) => {
        return {
          ...prev,
          [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: kycInformation
        }
      })
    }
  }, [changeProgress, id, kycFormQuery.data])

  useEffect(() => {
    if (loanApplicationDetails && id) {
      changeProgress(LOAN_APPLICATION_STEPS.LOAN_REQUEST)
      setLoanApplicationId(loanApplicationDetails.id)
      setDraftForm((prev) => {
        return {
          ...prev,
          loanRequest: {
            id: loanApplicationDetails.id,
            loanAmount: loanApplicationDetails.loanAmount,
            proposeUseOfLoan: loanApplicationDetails.proposeUseOfLoan,
            loanTermInMonth: loanApplicationDetails.loanTermInMonth
          }
        }
      })
    }
  }, [changeProgress, id, loanApplicationDetails])

  useEffect(() => {
    if (financialDocumentsQuery.data && id) {
      // Using prevState to prevent infinity callbacks
      setDocumentsUploaded((prevState) => ({
        ...prevState,
        financialDocuments: financialDocumentsQuery.data
      }))
    }
  }, [changeProgress, financialDocumentsQuery.data, id])

  useEffect(() => {
    if (kycDocumentsQuery.data && id) {
      // Using prevState to prevent infinity callbacks
      setDocumentsUploaded((prevState) => ({
        ...prevState,
        kycDocuments: kycDocumentsQuery.data
      }))
    }
  }, [changeProgress, id, kycDocumentsQuery.data])

  const removeDocumentUploaded = useCallback(
    (id: string, type: FORM_TYPE) => {
      if (type === FORM_TYPE.FINANCIAL) {
        const newDocuments = documentsUploaded.financialDocuments.filter(
          (doc) => doc.id !== id
        )
        setDocumentsUploaded((prev) => {
          return {
            ...prev,
            financialDocuments: newDocuments
          }
        })
      }
      if (type === FORM_TYPE.KYC) {
        const newDocuments = documentsUploaded.kycDocuments.filter(
          (doc) => doc.id !== id
        )
        setDocumentsUploaded((prev) => {
          return {
            ...prev,
            kycDocuments: newDocuments
          }
        })
      }
    },
    [documentsUploaded.financialDocuments, documentsUploaded.kycDocuments]
  )

  const resetAllState = useCallback(() => {
    setStep(LOAN_APPLICATION_STEPS.LOAN_REQUEST)
    setProgress(STEPS)
    setLoanApplicationId("")
    setDraftForm({})
    setDocumentsUploaded({
      financialDocuments: [],
      kycDocuments: []
    })
    setIsFormEdited(false)
  }, [])

  useEffect(() => {
    if (!id) {
      resetAllState()
    }
  }, [id, resetAllState])

  useUpdateEffect(() => {
    if (draftForm.confirmationForm) {
      saveForm()
    }
  }, [draftForm.confirmationForm])

  const saveForm = useCallback(async () => {
    if (!draftForm.loanRequest) return
    if (!loanApplicationId) {
      try {
        await createLoanApplication(
          {
            ...draftForm.loanRequest,
            loanProgramId: loanProgramId ?? ""
          },
          {
            onSuccess: async (data) => {
              setLoanApplicationId(data.data.id)

              try {
                if (draftForm.businessInformation) {
                  await handleSubmitLoanKyb(data.data.id)
                }
                if (draftForm.ownerInformationForm) {
                  await handleSubmitLoanKyc(data.data.id)
                }
                // Bypass for Loan ready
                if (isLoanReady() || draftForm.financialInformationForm) {
                  await handleSubmitFinancialInformation(data.data.id)
                }
                if (draftForm.financialInformationForm) {
                  await handleSubmitFinancialInformation(data.data.id)
                }
                if (draftForm.confirmationForm) {
                  await handleSubmitConfirmation(data.data.id)
                }

                toastSuccess({
                  title: TOAST_MSG.loanApplication.submitSuccess.title,
                  description:
                    TOAST_MSG.loanApplication.submitSuccess.description
                })
                if (!draftForm.confirmationForm) {
                  navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index)
                } else {
                  navigate(APP_PATH.LOAN_APPLICATION.SUBMISSION)
                }
                setIsFormEdited(false)
                resetAllState()
              } catch (error) {
                toastError({
                  title: TOAST_MSG.loanApplication.submitError.title,
                  description: TOAST_MSG.loanApplication.submitError.description
                })
              } finally {
                queryClient.invalidateQueries({
                  queryKey: loanApplicationUserKeys.lists()
                })
              }
            },
            onError: (error) => {
              console.error(error)
            }
          }
        )
      } catch (error) {
        const message = getAxiosError(error as AxiosError)?.message
        toastError({
          title: TOAST_MSG.loanApplication.submitError.title,
          description: message.length
            ? message
            : TOAST_MSG.loanApplication.submitError.description
        })
      }
    } else {
      try {
        if (draftForm.loanRequest) {
          await updateLoanApplication(draftForm.loanRequest)
        }
        if (draftForm.businessInformation) {
          await handleSubmitLoanKyb(loanApplicationId)
        }
        if (draftForm.ownerInformationForm) {
          await handleSubmitLoanKyc(loanApplicationId)
        }
        if (draftForm.financialInformationForm) {
          await handleSubmitFinancialInformation(loanApplicationId)
        }
        if (draftForm.confirmationForm) {
          await handleSubmitConfirmation(loanApplicationId)
        }
        toastSuccess({
          title: TOAST_MSG.loanApplication.updateSuccess.title,
          description: TOAST_MSG.loanApplication.updateSuccess.description
        })
        navigate(APP_PATH.LOAN_APPLICATION.APPLICATIONS.index)
        setIsFormEdited(false)
        resetAllState()
      } catch (error) {
        const message = getAxiosError(error as AxiosError)?.message
        toastError({
          title: TOAST_MSG.loanApplication.submitError.title,
          description: message.length
            ? message
            : TOAST_MSG.loanApplication.submitError.description
        })
      } finally {
        queryClient.invalidateQueries({
          queryKey: loanApplicationUserKeys.lists()
        })
      }
    }
  }, [
    createLoanApplication,
    draftForm.businessInformation,
    draftForm.confirmationForm,
    draftForm.financialInformationForm,
    draftForm.loanRequest,
    draftForm.ownerInformationForm,
    handleSubmitConfirmation,
    handleSubmitFinancialInformation,
    handleSubmitLoanKyb,
    handleSubmitLoanKyc,
    loanApplicationId,
    loanProgramId,
    navigate,
    queryClient,
    resetAllState,
    updateLoanApplication
  ])

  const saveDraftForm = useCallback(
    (type: LOAN_APPLICATION_STEPS, value: FormType[LOAN_APPLICATION_STEPS]) => {
      setDraftForm((prev) => {
        return {
          ...prev,
          [type]: value
        }
      })
    },
    []
  )

  const value = useMemo(
    () => ({
      step,
      progress,
      loanApplicationId,
      draftForm,
      documentsUploaded,
      isSubmitting:
        isCreatingLoanApplication ||
        isSubmittingLoanKyb ||
        isSubmittingLoanKyc ||
        isSubmittingConfirmation ||
        isSubmittingFinancialInformation ||
        isUpdatingLoanKyb ||
        isUpdatingLoanKyc ||
        isUpdatingLoanApplication ||
        isUploadingFinancial,
      isUploading,
      alertDialog,
      removeDocumentUploaded,
      saveForm,
      saveDraftForm,
      changeStep,
      changeProgress,
      changeLoanApplicationId,
      setFormIsEdited,
      closeAlertDialog
    }),
    [
      step,
      progress,
      loanApplicationId,
      draftForm,
      documentsUploaded,
      isCreatingLoanApplication,
      isSubmittingLoanKyb,
      isSubmittingLoanKyc,
      isSubmittingConfirmation,
      isSubmittingFinancialInformation,
      isUpdatingLoanKyb,
      isUpdatingLoanKyc,
      isUpdatingLoanApplication,
      isUploadingFinancial,
      isUploading,
      alertDialog,
      removeDocumentUploaded,
      saveForm,
      saveDraftForm,
      changeStep,
      changeProgress,
      changeLoanApplicationId,
      setFormIsEdited,
      closeAlertDialog
    ]
  )

  return (
    <LoanApplicationContext.Provider value={value}>
      {children}
    </LoanApplicationContext.Provider>
  )
}
