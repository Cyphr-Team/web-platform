import { useCallback, useMemo, useState } from "react"
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
import { useParams } from "react-router-dom"

import { useSubmitLoanKybInformation } from "../hooks/useMutation/useSubmitLoanKybInformation"
import { useSubmitLoanKycInformation } from "../hooks/useMutation/useSubmitLoanKycInformation"
import { useMutateUploadDocument } from "../hooks/useMutation/useUploadDocumentMutation"
import { FORM_TYPE } from "../constants/type"
import { useSubmitLoanFinancialInformation } from "../hooks/useMutation/useSubmitLoanFinancialInformation"
import { useSelectCities } from "../hooks/useSelectCities"
import { toastError } from "@/utils"

const initForm = {
  loanRequest: {
    loanAmount: 0,
    loanTermInMonth: 0,
    proposeUseOfLoan: ""
  },
  businessInformation: {
    businessLegalName: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    postalCode: "",
    businessWebsite: "",
    businessTin: ""
  },
  ownerInformationForm: {
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    businessRole: "",
    businessCity: "",
    businessState: "",
    businessZipCode: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    businessOwnershipPercentage: "",
    hasOtherSubstantialStackHolders: "false",
    governmentFile: []
  },
  financialInformationForm: {
    cashflow: [],
    w2sFile: []
  },
  confirmationForm: {
    signature: "",
    name: "",
    signatureDate: ""
  }
}

type FormType = {
  [key in LOAN_APPLICATION_STEPS]:
    | LoanRequestFormValue
    | BusinessFormValue
    | OwnerFormValue
    | FinancialFormValue
    | ConfirmationFormValue
}

type DraftApplicationForm = {
  loanRequest: LoanRequestFormValue
  businessInformation: BusinessFormValue
  ownerInformationForm: OwnerFormValue
  financialInformationForm: FinancialFormValue
  confirmationForm: ConfirmationFormValue
}

type LoanApplicationContextType = {
  step: LOAN_APPLICATION_STEPS
  changeStep: (step: LOAN_APPLICATION_STEPS, force?: boolean) => void
  progress: ProgressType[]
  loanApplicationId: string
  isSubmitting: boolean
  draftForm: DraftApplicationForm
  setFormIsEdited: () => void
  alertDialog: LOAN_APPLICATION_STEPS | undefined
  saveDraftForm: (
    type: LOAN_APPLICATION_STEPS,
    value: FormType[LOAN_APPLICATION_STEPS]
  ) => void
  submitForm: () => void
  changeProgress: (step: LOAN_APPLICATION_STEPS) => void
  changeLoanApplicationId: (id: string) => void
  closeAlertDialog: () => void
}

export const LoanApplicationContext = createContext<LoanApplicationContextType>(
  {
    step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    isSubmitting: false,
    submitForm: () => {},
    changeStep: () => {},
    saveDraftForm: () => {},
    draftForm: initForm,
    progress: STEPS,
    loanApplicationId: "",
    changeProgress: () => {},
    changeLoanApplicationId: () => {},
    setFormIsEdited: () => {},
    alertDialog: undefined,
    closeAlertDialog: () => {}
  }
)

type Props = {
  children: React.ReactNode
}

export const LoanApplicationProvider: React.FC<Props> = ({ children }) => {
  const [step, setStep] = useState<LOAN_APPLICATION_STEPS>(
    LOAN_APPLICATION_STEPS.LOAN_REQUEST
  )
  const { loanProgramId } = useParams()

  const [draftForm, setDraftForm] = useState<DraftApplicationForm>(initForm)

  const [loanApplicationId, setLoanApplicationId] = useState<string>("")

  const [progress, setProgress] = useState<ProgressType[]>(STEPS)

  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)

  const [alertDialog, setAlertDialog] = useState<
    LOAN_APPLICATION_STEPS | undefined
  >()

  const {
    mutate: createLoanApplication,
    isPending: isCreatingLoanApplication
  } = useCreateLoanApplication()
  const { mutate: submitLoanKyb, isPending: isSubmittingLoanKyb } =
    useSubmitLoanKybInformation()
  const { mutate: submitLoanKyc, isPending: isSubmittingLoanKyc } =
    useSubmitLoanKycInformation()
  const {
    mutate: submitLoanFinancialInformation,
    isPending: isSubmittingFinancialInformation
  } = useSubmitLoanFinancialInformation()
  const { mutateAsync, isUploading } = useMutateUploadDocument()

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

  const closeAlertDialog = useCallback(() => {
    setAlertDialog(undefined)
  }, [])

  const { getStateCode } = useSelectCities()

  const changeProgress = useCallback(
    (step: LOAN_APPLICATION_STEPS) => {
      const newProgress = progress.map((item) => {
        if (item.step === step) {
          if (item.status === LOAN_APPLICATION_STEP_STATUS.INCOMPLETE) {
            return {
              ...item,
              status: LOAN_APPLICATION_STEP_STATUS.COMPLETE
            }
          }
        }
        return item
      })
      setProgress(newProgress)
    },
    [progress]
  )

  const changeLoanApplicationId = useCallback((id: string) => {
    setLoanApplicationId(id)
  }, [])

  const saveDraftForm = useCallback(
    (type: LOAN_APPLICATION_STEPS, value: FormType[LOAN_APPLICATION_STEPS]) => {
      setDraftForm((prev) => {
        return {
          ...prev,
          [type]: value
        }
      })
    },
    [setDraftForm]
  )

  const handleSubmitLoanKyc = useCallback(
    (loanApplicationId: string) => {
      if (draftForm.ownerInformationForm) {
        const formattedData = {
          ...draftForm.ownerInformationForm,
          loanApplicationId: loanApplicationId,
          hasOtherSubstantialStackHolders:
            draftForm.ownerInformationForm.hasOtherSubstantialStackHolders ===
            "true",
          businessOwnershipPercentage: Number(
            draftForm.ownerInformationForm.businessOwnershipPercentage
          )
        }
        submitLoanKyc(formattedData, {
          onSuccess: (res) => {
            if (res.data) {
              uploadDocuments(
                loanApplicationId,
                draftForm.ownerInformationForm.governmentFile,
                FORM_TYPE.KYC
              )
            }
          }
        })
      }
    },
    [draftForm.ownerInformationForm, submitLoanKyc, uploadDocuments]
  )

  const handleSubmitLoanKyb = useCallback(
    (loanApplicationId: string) => {
      if (draftForm.businessInformation) {
        const formattedData = {
          ...draftForm.businessInformation,
          loanApplicationId: loanApplicationId,
          businessStreetAddress: {
            addressLine1: draftForm.businessInformation.addressLine1,
            addressLine2: draftForm.businessInformation.addressLine2,
            city: draftForm.businessInformation.city,
            state: getStateCode(draftForm.businessInformation.state),
            postalCode: draftForm.businessInformation.postalCode
          }
        }
        submitLoanKyb(formattedData)
      }
    },
    [draftForm.businessInformation, getStateCode, submitLoanKyb]
  )

  const setFormIsEdited = useCallback(() => {
    setIsFormEdited(true)
  }, [])

  const handleSubmitFinancialInformation = useCallback(
    (loanApplicationId: string) => {
      if (draftForm.financialInformationForm) {
        submitLoanFinancialInformation(
          {
            incomeCategories: draftForm.financialInformationForm.cashflow,
            loanApplicationId: loanApplicationId
          },
          {
            onSuccess: (res) => {
              if (res.data) {
                uploadDocuments(
                  loanApplicationId,
                  draftForm.financialInformationForm.w2sFile,
                  FORM_TYPE.FINANCIAL
                )
              }
            },
            onError: (error) => {
              toastError({
                title: "Error",
                description: error.message
              })
            }
          }
        )
      }
    },
    [
      draftForm.financialInformationForm,
      submitLoanFinancialInformation,
      uploadDocuments
    ]
  )

  const submitForm = useCallback(() => {
    createLoanApplication(
      {
        ...draftForm.loanRequest,
        loanProgramId: loanProgramId ?? ""
      },
      {
        onSuccess: (data) => {
          if (draftForm.businessInformation) {
            handleSubmitLoanKyb(data.data.id)
          }
          if (draftForm.ownerInformationForm) {
            handleSubmitLoanKyc(data.data.id)
          }
          if (draftForm.financialInformationForm) {
            handleSubmitFinancialInformation(data.data.id)
          }
          //TODO: Add confirmation form
          //TODO: Navigate to list applications page
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }, [
    createLoanApplication,
    draftForm.businessInformation,
    draftForm.financialInformationForm,
    draftForm.loanRequest,
    draftForm.ownerInformationForm,
    handleSubmitFinancialInformation,
    handleSubmitLoanKyb,
    handleSubmitLoanKyc,
    loanProgramId
  ])

  const value = useMemo(
    () => ({
      step,
      progress,
      loanApplicationId,
      draftForm,
      isSubmitting:
        isCreatingLoanApplication ||
        isSubmittingLoanKyb ||
        isSubmittingLoanKyc ||
        isSubmittingFinancialInformation ||
        isUploading,
      alertDialog,
      submitForm,
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
      alertDialog,
      loanApplicationId,
      draftForm,
      isCreatingLoanApplication,
      isSubmittingLoanKyb,
      isSubmittingLoanKyc,
      isSubmittingFinancialInformation,
      isUploading,
      submitForm,
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
