import {
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { useMemo, useRef, useState } from "react"

import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { isSbb } from "@/utils/domain.utils"
import { isEnablePandaDocESign } from "@/utils/feature-flag.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  reviewApplicationSchema,
  type ReviewApplicationValue
} from "../../../../constants/form"
import { useLoanApplicationFormContext } from "../../../../providers"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { ReviewApplicationGroup } from "./ReviewApplicationGroup"
import { SbbReviewApplicationDetails } from "./SbbReviewApplicationDetail"
import { DisclaimerAndDisclosure } from "../disclaimer-disclosure/DisclaimerAndDisclosure"
import {
  EXPORT_CLASS,
  generatePDF
} from "@/modules/loan-application/services/pdf-v2.service.ts"
import { toastError } from "@/utils"

const REQUIRED_REVIEW = [
  {
    key: STEP_MENU.APPLICATION,
    label: "Application"
  },
  {
    key: STEP_MENU.DOCUMENTATION,
    label: "Documentation"
  }
]

export function ReviewApplication() {
  const { progress, step, finishCurrentStep } =
    useLoanApplicationProgressContext()

  /**
   * This ref is responsible for the content of all the form
   * This ref is use for generate a PDF for ESign
   */
  const itemsRef = useRef<
    Partial<Record<LOAN_APPLICATION_STEPS, HTMLDivElement>>
  >({})
  const [isGenPDF, setIsGenPDF] = useState(false)

  const { dispatchFormAction } = useLoanApplicationFormContext()

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
    if (isSbb() && isEnablePandaDocESign()) {
      await sbbOnSubmit(data)
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

  const sbbOnSubmit = async (data: ReviewApplicationValue) => {
    try {
      setIsGenPDF(true)
      const filteredElement = [
        ...document.getElementsByClassName(EXPORT_CLASS.FINANCIAL)
      ] as HTMLDivElement[]

      const { pdf } = await generatePDF({
        elements: filteredElement.map((el) => ({
          htmlElement: el
        }))
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
      setIsGenPDF(false)
    }
  }

  return (
    <div className="col-span-8 mx-4 grid grid-cols-8 gap-4 md:gap-6">
      {isSbb() ? (
        <>
          <div className="col-span-8 max-w-6xl md:mx-8 2xl:mx-auto">
            <SbbReviewApplicationDetails />
            <div className="hidden">
              <DisclaimerAndDisclosure
                defaultChecked
                wrapperClassName="max-w-none"
              />
            </div>
          </div>
          <div className="col-span-8 max-w-6xl md:mx-8 2xl:mx-auto 2xl:w-full">
            <Form {...form}>
              <ButtonLoading
                className="w-full"
                disabled={
                  !form.formState.isValid ||
                  progressCompleteFilter.length !== progressFilter.length
                }
                isLoading={isGenPDF}
                onClick={form.handleSubmit(onSubmit)}
              >
                Confirm application
              </ButtonLoading>
            </Form>
          </div>
        </>
      ) : (
        <>
          {REQUIRED_REVIEW.map((requiredReview) => (
            <ReviewApplicationGroup
              key={requiredReview.key}
              itemsRef={itemsRef}
              label={requiredReview.label}
              parentKey={requiredReview.key}
            />
          ))}
          <div className="col-span-6 col-start-3">
            <Form {...form}>
              <ButtonLoading
                className="mx-3 w-full max-w-screen-sm md:mx-auto"
                disabled={
                  !form.formState.isValid ||
                  progressCompleteFilter.length !== progressFilter.length
                }
                isLoading={isGenPDF}
                onClick={form.handleSubmit(onSubmit)}
              >
                Confirm Application Materials
              </ButtonLoading>
            </Form>
          </div>
        </>
      )}
    </div>
  )
}
