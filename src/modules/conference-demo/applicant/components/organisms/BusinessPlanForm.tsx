import { useForm } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import * as z from "zod"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  RHFDragAndDropFileUpload,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button.tsx"
import {
  useIsReviewApplicationStep,
  useProgress
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import {
  STEP,
  YES_NO_OPTIONS
} from "@/modules/conference-demo/applicant/constants"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import { ZodFileTypeFactory } from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/conference-demo/applicant/hooks/useAutoCompleteStepEffect"
import useMagic from "@/modules/conference-demo/applicant/hooks/useMagic.ts"

export interface BusinessPlanRequest {
  businessPlan: string
  businessDescription: string
  socialImpact: string
  grantsInThreeYears: string
  revenueGoal: string
  marketPotential: string
  briefOverview: string
  uploadedFiles: File[] | undefined
}

const businessPlanRequestFormSchema = z.object({
  businessPlan: z.string().optional(),
  businessDescription: z.string().optional(),
  socialImpact: z.string().optional(),
  grantsInThreeYears: z.string().optional(),
  revenueGoal: z.string().optional(),
  marketPotential: z.string().optional(),
  briefOverview: z.string().optional(),
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional()
})

function BusinessPlanForm() {
  const { goToStep, finishStep } = useProgress.use.action()
  const data = useFormData.use["Business Plan"]()

  const isReviewApplicationStep = useIsReviewApplicationStep()

  const method = useForm({
    resolver: zodResolver(businessPlanRequestFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  const onSubmit = useCallback(() => {
    finishStep(STEP.BUSINESS_PLAN)
    goToStep(STEP.CASH_FLOW_VERIFICATION)
  }, [finishStep, goToStep])

  useAutoCompleteStepEffect(method, STEP.BUSINESS_PLAN)

  const autofillData = {
    businessDescription:
      "We aim to empower small-scale artisans by providing them with a platform that connects them directly with international customers.",
    socialImpact:
      "Our project supports local economies, preserves traditional crafts, and reduces carbon footprint by promoting eco-friendly products.",
    grantsInThreeYears:
      "In the next three years, we plan to apply for various sustainability and innovation grants to expand our operations and impact.",
    revenueGoal:
      "We aim to achieve a revenue of $1 million by the end of the second year of operation.",
    marketPotential:
      "The global handicraft market is expected to reach $1 trillion by 2030, and we plan to capture 0.5% of this market.",
    briefOverview:
      "A digital marketplace for artisans to sell sustainable products, promoting local craftsmanship and eco-friendly practices."
  }

  useMagic(method, autofillData, 5)

  return (
    <Card
      className={cn(
        "rounded-xl mx-6 col-span-8",
        "md:col-span-4 md:col-start-3 md:mx-auto",
        "max-w-screen-sm"
      )}
    >
      <CardHeader className="text-left">
        <CardTitle className="text-lg">Business Plan</CardTitle>
      </CardHeader>

      <RHFProvider methods={method} onSubmit={method.handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <div className="flex">
              <div className="flex-1">
                <RHFSelectInput
                  className="flex items-center justify-between"
                  label="Do you have a business plan?"
                  name="businessPlan"
                  options={YES_NO_OPTIONS}
                  styleProps={{
                    inputClassName:
                      "w-36 min-w-36 md:max-w-36 xl:max-w-36 xl:w-36"
                  }}
                />
                <div className="mt-6">
                  <RHFDragAndDropFileUpload
                    id={STEP.BUSINESS_PLAN}
                    name="files"
                  />
                </div>
                <div className="font-semibold text-sm mt-4">
                  Please answer the following questions
                </div>
                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="How would you describe your business? Explain to a potential customer what you provide. Please Note: This response may be used in printed materials and/or press releases as needed."
                  name="businessDescription"
                  placeholder=""
                />
                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="What is the social impact of growing your business and how will it change the way you lead the company? Please Note: This response may be used in printed materials and/or press releases as needed."
                  name="socialImpact"
                  placeholder=""
                />
                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="Have you received any grants, loans, or COVID-19 relief in the past 3 years? If yes, describe what type and their impact."
                  name="grantsInThreeYears"
                  placeholder=""
                />
                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="What is your revenue goal over the next two to three years? What existing or new products and/or services do you plan to offer over the next two to three years to achieve your goal?"
                  name="revenueGoal"
                  placeholder=""
                />
                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="Describe the market potential for growing your business to the next stage. Include your target customers, market size, competition, environmental influences, market barriers, how you differentiate your business in the market, and industry opportunities as applicable."
                  name="marketPotential"
                  placeholder=""
                />
                <RHFTextInput
                  className="mt-6 space-y-2"
                  label="Provide a brief overview of your business plan, including your long-term goals and objectives. How do you plan to use the loan funds to achieve your objectives?  Please upload any additional documentation or marketing materials that may be applicable."
                  name="briefOverview"
                  placeholder=""
                  styleProps={{
                    labelClassName: "font-medium"
                  }}
                />
              </div>
            </div>
          </div>

          {!isReviewApplicationStep && (
            <Button
              className="w-full mt-5"
              disabled={!method.formState.isValid}
              type="submit"
            >
              Next
            </Button>
          )}
        </CardContent>
      </RHFProvider>
    </Card>
  )
}

export default memo(BusinessPlanForm)
