import {
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS,
  STEP_MENU
} from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { useMemo, useRef, useState } from "react"

import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { DisclaimerAndDisclosure } from "@/modules/loan-application/components/organisms/loan-application-form/disclaimer-disclosure/DisclaimerAndDisclosure"
import { getPDF } from "@/modules/loan-application/services/pdf.service"
import { isSbb } from "@/utils/domain.utils"
import {
  isEnableKycReOrder,
  isEnablePandaDocESign
} from "@/utils/feature-flag.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  ReviewApplicationValue,
  reviewApplicationSchema
} from "../../../../constants/form"
import { useLoanApplicationFormContext } from "../../../../providers"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { ReviewApplicationGroup } from "./ReviewApplicationGroup"

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

export const ReviewApplication = () => {
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
        (isEnableKycReOrder() ||
          prog.step != LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION)
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
      try {
        setIsGenPDF(true)
        const { pdf, totalPage } = await getPDF(Object.values(itemsRef.current))

        dispatchFormAction({
          action: FORM_ACTION.SET_DATA,
          key: LOAN_APPLICATION_STEPS.REVIEW_APPLICATION,
          state: { ...data, pdf, totalPage }
        })
      } finally {
        setIsGenPDF(false)
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

  const isShowDisclaimer = isSbb()
  const disclaimerSection = isShowDisclaimer && (
    <div className="col-span-8 grid grid-cols-8 gap-4">
      <div className="col-span-2 text-2xl font-semibold max-w-screen-sm">
        <div>Disclaimer</div>
      </div>
      <div className="col-span-6 flex flex-col gap-6 max-w-screen-sm">
        <div
          className="w-full h-full"
          ref={(e) => {
            if (itemsRef.current && e)
              itemsRef.current[
                LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE
              ] = e
          }}
        >
          <DisclaimerAndDisclosure />
        </div>
      </div>
    </div>
  )

  return (
    <div className="col-span-8 grid grid-cols-8 gap-4 md:gap-6 mx-4 md:mx-8">
      {REQUIRED_REVIEW.map((requiredReview) => (
        <ReviewApplicationGroup
          key={requiredReview.key}
          label={requiredReview.label}
          parentKey={requiredReview.key}
          itemsRef={itemsRef}
        />
      ))}

      {disclaimerSection}

      <div className="col-start-3 col-span-6">
        <Form {...form}>
          <ButtonLoading
            isLoading={isGenPDF}
            className="mx-3 md:mx-auto max-w-screen-sm w-full"
            disabled={
              !form.formState.isValid ||
              progressCompleteFilter.length !== progressFilter.length
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm Application Materials <ArrowRight className="ml-1 w-4" />
          </ButtonLoading>
        </Form>
      </div>
    </div>
  )
}
