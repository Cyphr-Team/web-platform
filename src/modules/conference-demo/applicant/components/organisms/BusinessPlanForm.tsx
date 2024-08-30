import { FieldValues, useForm } from "react-hook-form"

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
  businessPlan: z.string().min(1, { message: "Business plan is required" }),
  businessDescription: z
    .string()
    .min(1, { message: "Business description is required" }),
  socialImpact: z.string().min(1, { message: "Social impact is required" }),
  grantsInThreeYears: z
    .string()
    .min(1, { message: "Grants in three years is required" }),
  revenueGoal: z.string().min(1, { message: "Revenue goal is required" }),
  marketPotential: z
    .string()
    .min(1, { message: "Market potential is required" }),
  briefOverview: z.string().min(1, { message: "Brief overview is required" }),
  files: ZodFileTypeFactory(
    ["application/pdf"],
    "Please choose PDF format files only"
  ).optional()
})

const BusinessPlanForm = () => {
  const { goToStep } = useProgress.use.action()
  const data = useFormData.use["Business Plan"]()

  const isReviewApplicationStep = useIsReviewApplicationStep()

  const method = useForm<FieldValues>({
    resolver: zodResolver(businessPlanRequestFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  const onSubmit = useCallback(() => {
    goToStep(STEP.CASH_FLOW_VERIFICATION)
  }, [goToStep])

  useAutoCompleteStepEffect(method, STEP.BUSINESS_PLAN)

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
                  styleProps={{
                    inputClassName:
                      "w-36 min-w-36 md:max-w-36 xl:max-w-36 xl:w-36"
                  }}
                  name="businessPlan"
                  label="Do you have a business plan?"
                  options={YES_NO_OPTIONS}
                />
                <div className="font-semibold text-sm mt-4">
                  Please answer the following questions
                </div>
                <RHFTextInput
                  name="businessDescription"
                  placeholder=""
                  label="How would you describe your business? Explain to a potential customer what you provide. Please Note: This response may be used in printed materials and/or press releases as needed."
                  className="mt-6 space-y-2"
                />
                <RHFTextInput
                  name="socialImpact"
                  placeholder=""
                  label="What is the social impact of growing your business and how will it change the way you lead the company? Please Note: This response may be used in printed materials and/or press releases as needed."
                  className="mt-6 space-y-2"
                />
                <RHFTextInput
                  name="grantsInThreeYears"
                  placeholder=""
                  label="Have you received any grants, loans, or COVID-19 relief in the past 3 years? If yes, describe what type and their impact."
                  className="mt-6 space-y-2"
                />
                <RHFTextInput
                  name="revenueGoal"
                  placeholder=""
                  label="What is your revenue goal over the next two to three years? What existing or new products and/or services do you plan to offer over the next two to three years to achieve your goal?"
                  className="mt-6 space-y-2"
                />
                <RHFTextInput
                  name="marketPotential"
                  placeholder=""
                  label="Describe the market potential for growing your business to the next stage. Include your target customers, market size, competition, environmental influences, market barriers, how you differentiate your business in the market, and industry opportunities as applicable."
                  className="mt-6 space-y-2"
                />
                <RHFTextInput
                  name="briefOverview"
                  placeholder=""
                  label="Provide a brief overview of your business plan, including your long-term goals and objectives. How do you plan to use the loan funds to achieve your objectives?  Please upload any additional documentation or marketing materials that may be applicable."
                  className="mt-6 space-y-2"
                  styleProps={{
                    labelClassName: "font-medium"
                  }}
                />
                <div className="mt-6">
                  <RHFDragAndDropFileUpload name="files" />
                </div>
              </div>
            </div>
          </div>
          {!isReviewApplicationStep && (
            <Button
              type="submit"
              className="w-full mt-5"
              disabled={!method.formState.isValid}
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
