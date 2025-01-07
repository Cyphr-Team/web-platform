import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ReviewApplicationStep } from "@/modules/loan-application/[module]-financial-projection/components/organisms/review-application/ReviewApplicationStep"
import { useBoolean } from "@/hooks"
import { FinancialProjectionApplicationDetail } from "@/modules/loan-application/[module]-financial-projection/components/organisms/details/FinancialProjectionApplicationDetails"
import { useApplicantFormFinancialProjectionApplicationDetails } from "@/modules/loan-application/[module]-financial-projection/hooks/details/applicant/useApplicantFormFinancialProjectionApplicationDetails"
import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import {
  EXPORT_CLASS,
  EXPORT_CONFIG,
  generatePDF
} from "@/modules/loan-application/services/pdf-v2.service"
import { toastError } from "@/utils"
import { isEnablePandaDocESign } from "@/utils/feature-flag.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import {
  reviewApplicationSchema,
  type ReviewApplicationValue
} from "../../../../constants/form"
import { useLoanApplicationFormContext } from "../../../../providers"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { DisclaimerNote } from "@/modules/loan-application/[module]-financial-projection/components/pages/pdf/DisclaimerNote"
import { cn } from "@/lib/utils"

export function FinancialProjectionReviewApplication() {
  const isExporting = useBoolean(false)

  const { progress, step, finishCurrentStep } =
    useLoanApplicationProgressContext()

  const { dispatchFormAction, businessInformation } =
    useLoanApplicationFormContext()

  const progressFilter = useMemo(() => {
    return progress.filter(
      (prog) =>
        prog.step != step &&
        prog.step != LOAN_APPLICATION_STEPS.CONFIRMATION &&
        prog.step != LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE
    )
  }, [step, progress])

  const progressCompleteFilter = useMemo(() => {
    return progressFilter.filter(
      (prog) => prog.status === LOAN_APPLICATION_STEP_STATUS.COMPLETE
    )
  }, [progressFilter])

  const form = useForm<ReviewApplicationValue>({
    resolver: zodResolver(reviewApplicationSchema),
    defaultValues: {
      isReviewed: true
    },
    mode: "onBlur"
  })

  const onSubmit = async (data: ReviewApplicationValue) => {
    if (isEnablePandaDocESign()) {
      try {
        isExporting.onTrue()

        const filteredElement = [
          ...document.getElementsByClassName(EXPORT_CLASS.FINANCIAL)
        ] as HTMLDivElement[]

        const { pdf } = await generatePDF({
          elements: filteredElement.map((el) => ({
            htmlElement: el
          })),
          isSigned: true
        })

        dispatchFormAction({
          action: FORM_ACTION.SET_DATA,
          key: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION,
          state: { ...data, pdf, totalPage: pdf.internal.pages.length - 1 }
        })
      } catch (error) {
        toastError({
          title: "Something went wrong!",
          description: "Please try again later!"
        })
      } finally {
        isExporting.onFalse()
      }
    } else {
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION,
        state: data
      })
    }

    /**
     * Because [useAutoCompleteStepEffect] is using setTimeout with 0ms,
     * If the onBlur and Click submit button event both trigger at the same time,
     * The final check should be [finishCurrentStep],
     * To ensure that final check we should use setTimeout with 10ms.
     */
    setTimeout(() => {
      finishCurrentStep()
    }, 10)
  }

  const { financialApplicationDetailData } =
    useApplicantFormFinancialProjectionApplicationDetails()

  return (
    <div className="col-span-8 mx-4 md:mx-8">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-4 md:gap-8">
        <div>
          <h1 className="text-[2.125rem] font-semibold">Assessment Summary</h1>
          <p className="mt-1 text-sm">
            Please review your assessment below. If you need to make any
            changes, simply double-click on your answers to edit.
          </p>
        </div>

        <div className="col-span-8 flex flex-col gap-4 md:gap-8">
          {progressFilter.map((prog) => {
            return <ReviewApplicationStep key={prog.step} stepProgress={prog} />
          })}
        </div>
        <div className="text-right">
          <Form {...form}>
            <ButtonLoading
              className="mx-3 w-full md:mx-auto"
              disabled={
                !form.formState.isValid ||
                progressCompleteFilter.length !== progressFilter.length
              }
              isLoading={isExporting.value}
              onClick={form.handleSubmit(onSubmit)}
            >
              Confirm application
            </ButtonLoading>
          </Form>
        </div>

        {/* FIXME: Below component make performance risk */}
        <div className="col-span-8 hidden gap-4 md:gap-8">
          <div>
            <div
              className={cn("-mx-20 flex items-start", EXPORT_CLASS.FINANCIAL)}
              data-pdf-end-of-page-type={EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE}
            >
              <DisclaimerNote
                companyName={businessInformation?.businessLegalName}
                title="Assessment Summary"
              />
            </div>
          </div>
          <FinancialProjectionApplicationDetail
            isPdf
            financialApplicationDetailData={financialApplicationDetailData}
          />
        </div>
      </div>
    </div>
  )
}
