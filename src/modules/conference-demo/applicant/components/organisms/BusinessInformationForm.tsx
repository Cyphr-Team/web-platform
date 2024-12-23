import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RHFProvider } from "@/modules/form-template/providers"
import { memo } from "react"
import {
  useIsReviewApplicationStep,
  useProgress
} from "@/modules/conference-demo/applicant/stores/useProgress.ts"
import { STEP } from "@/modules/conference-demo/applicant/constants"
import {
  type Block,
  FieldType,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useFormData } from "@/modules/conference-demo/applicant/stores/useFormData.ts"
import { useAutoCompleteStepEffect } from "@/modules/conference-demo/applicant/hooks/useAutoCompleteStepEffect"
import useMagic from "@/modules/conference-demo/applicant/hooks/useMagic.ts"
import { ConferenceFormLayout } from "@/modules/conference-demo/applicant/components/layouts/ConferenceFormLayout.tsx"
import { MOCK_BUSINESS_INFORMATION } from "../../constants/data"

const enum FieldName {
  NAME = "name",
  ADDRESS = "address",
  CITY = "city",
  STATE = "state",
  POSTAL_CODE = "postalCode",
  EIN = "ein",
  WEBSITE = "website"
}

export type BusinessInformation = {
  [key in FieldName]: string
}

const businessInformationFormSchema = z.object({
  [FieldName.NAME]: z.string().optional(),
  [FieldName.ADDRESS]: z.string().optional(),
  [FieldName.CITY]: z.string().optional(),
  [FieldName.STATE]: z.string().optional(),
  [FieldName.POSTAL_CODE]: z.string().optional(),
  [FieldName.EIN]: z.string().optional(),
  [FieldName.WEBSITE]: z.string().optional()
})

const blocks: Block[] = [
  {
    type: FieldType.TEXT,
    name: FieldName.NAME,
    props: {
      label: "Business legal name",
      placeholder: MOCK_BUSINESS_INFORMATION.businessLegalName
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.ADDRESS,
    props: {
      label: "Business street address",
      placeholder: MOCK_BUSINESS_INFORMATION.businessStreetAddress.streetLine1
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.CITY,
    props: {
      label: "Business city",
      placeholder: MOCK_BUSINESS_INFORMATION.businessStreetAddress.city,
      className: "col-span-4"
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.STATE,
    props: {
      label: "Business state",
      placeholder: MOCK_BUSINESS_INFORMATION.businessStreetAddress.state,
      className: "col-span-4"
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.POSTAL_CODE,
    props: {
      label: "Business zip code",
      placeholder: MOCK_BUSINESS_INFORMATION.businessStreetAddress.postalCode,
      className: "col-span-4"
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.EIN,
    props: {
      label: "Employer Identification Number (EIN)",
      placeholder: MOCK_BUSINESS_INFORMATION.businessTin
    }
  },
  {
    type: FieldType.TEXT,
    name: FieldName.WEBSITE,
    props: {
      label: "Business website",
      placeholder: MOCK_BUSINESS_INFORMATION.businessWebsite
    }
  }
]

interface BusinessInformationFormProps {
  wrapperClassName?: string
}

function BusinessInformationForm({
  wrapperClassName
}: BusinessInformationFormProps) {
  const { goToStep, finishStep } = useProgress.use.action()

  const isReviewApplicationStep = useIsReviewApplicationStep()
  const data = useFormData.use["Business Information"]()
  const { setFormData } = useFormData.use.action()

  const method = useForm({
    resolver: zodResolver(businessInformationFormSchema),
    mode: "onBlur",
    defaultValues: data
  })

  useAutoCompleteStepEffect(method, STEP.BUSINESS_INFORMATION)

  const onSubmit = method.handleSubmit(() => {
    /**
     * DO NOT DELETE `setFormData` action or else the form will not sync that I don't know why
     * */
    setFormData({
      step: STEP.BUSINESS_INFORMATION,
      data: method.getValues()
    })
    finishStep(STEP.BUSINESS_INFORMATION)
    goToStep(STEP.BUSINESS_PLAN)
  })

  const autofillData = {
    [FieldName.NAME]: MOCK_BUSINESS_INFORMATION.businessLegalName,
    [FieldName.ADDRESS]:
      MOCK_BUSINESS_INFORMATION.businessStreetAddress.streetLine1,
    [FieldName.CITY]: MOCK_BUSINESS_INFORMATION.businessStreetAddress.city,
    [FieldName.STATE]: MOCK_BUSINESS_INFORMATION.businessStreetAddress.state,
    [FieldName.POSTAL_CODE]:
      MOCK_BUSINESS_INFORMATION.businessStreetAddress.postalCode,
    [FieldName.EIN]: MOCK_BUSINESS_INFORMATION.businessTin,
    [FieldName.WEBSITE]: MOCK_BUSINESS_INFORMATION.businessWebsite
  }

  useMagic(method, autofillData, 15)

  return (
    <RHFProvider methods={method} onSubmit={onSubmit}>
      <ConferenceFormLayout
        cardClassName="grid grid-cols-12"
        id={STEP.BUSINESS_INFORMATION}
        title="Business Information"
        wrapperClassName={wrapperClassName}
      >
        <h5 className="col-span-12 text-lg font-semibold">
          Business Information
        </h5>
        {renderBlockComponents(blocks)}

        {!isReviewApplicationStep && (
          <Button
            className="col-span-12 mt-5"
            disabled={!method.formState.isValid}
            type="submit"
          >
            Next
          </Button>
        )}
      </ConferenceFormLayout>
    </RHFProvider>
  )
}

export default memo(BusinessInformationForm)
