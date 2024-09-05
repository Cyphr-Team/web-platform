import { FieldValues, useForm } from "react-hook-form"

import { Card } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import * as z from "zod"
import { RHFProvider } from "@/modules/form-template/providers"
import { memo } from "react"
import {
  useIsReviewApplicationStep,
  useProgress
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import {
  Block,
  FieldType,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import { useAutoCompleteStepEffect } from "@/modules/conference-demo/applicant/hooks/useAutoCompleteStepEffect"
import useMagic from "@/modules/conference-demo/applicant/hooks/useMagic.ts"

const enum FieldName {
  NAME = "name",
  ADDRESS = "address",
  EIN = "ein",
  WEBSITE = "website"
}

export type BusinessInformation = {
  [key in FieldName]: string
}

const businessInformationFormSchema = z.object({
  [FieldName.NAME]: z.string().optional(),
  [FieldName.ADDRESS]: z.string().optional(),
  [FieldName.EIN]: z.string().optional(),
  [FieldName.WEBSITE]: z.string().optional()
})

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FieldName.NAME,
    props: {
      label: "Business Legal Name",
      placeholder: "Larry’s Latte LLC"
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.ADDRESS,
    props: {
      label: "Business Street Address",
      placeholder: "123 Coffee Lane"
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.EIN,
    props: {
      label: "Employer Identification Number (EIN)",
      placeholder: "12-34567"
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.WEBSITE,
    props: {
      label: "Business Website",
      placeholder: "https://larryslatte.com"
    }
  }
]

const BusinessInformationForm = () => {
  const { goToStep } = useProgress.use.action()

  const isReviewApplicationStep = useIsReviewApplicationStep()
  const data = useFormData.use["Business Information"]()
  const { setFormData } = useFormData.use.action()

  const method = useForm<FieldValues>({
    resolver: zodResolver(businessInformationFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  useAutoCompleteStepEffect(method, STEP.BUSINESS_INFORMATION)

  const onSubmit = method.handleSubmit(() => {
    setFormData({
      step: STEP.BUSINESS_INFORMATION,
      data: method.getValues() as BusinessInformation
    })
    goToStep(STEP.BUSINESS_PLAN)
  })

  const autofillData = {
    [FieldName.NAME]: "Larry's Latte LLC",
    [FieldName.ADDRESS]: "123 Coffee Lane",
    [FieldName.EIN]: "12-3456789",
    [FieldName.WEBSITE]: "https://larryslatte.com"
  }

  useMagic(method, autofillData, 15)

  return (
    <RHFProvider methods={method} onSubmit={onSubmit}>
      <Card
        className={cn(
          "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
          "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
        )}
        id={STEP.BUSINESS_INFORMATION}
      >
        <h5 className="text-lg font-semibold">Business Information</h5>
        {renderBlockComponents(blocks)}

        {!isReviewApplicationStep && (
          <Button
            type="submit"
            className="w-full mt-5"
            disabled={!method.formState.isValid}
          >
            Next
          </Button>
        )}
      </Card>
    </RHFProvider>
  )
}

export default memo(BusinessInformationForm)
