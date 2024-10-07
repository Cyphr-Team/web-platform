import { MM_YYYY_PATTERN } from "@/constants"
import { cn } from "@/lib/utils"
import {
  RHFCurrencyInput,
  RHFMaskInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { getArrayFieldName } from "@/modules/form-template/components/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  DirectCostsField,
  directCostsFormSchema,
  DirectCostsFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { reverseFormatDirectCostsForm } from "@/modules/loan-application/[module]-financial-projection/hooks/direct-costs/useSubmitDirectCostsForm"
import { DirectCostsFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/direct-costs-form"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  FieldArrayWithId,
  FieldPath,
  useFieldArray,
  useForm
} from "react-hook-form"

interface DirectCostsFormDetailProps {
  directCostsFormResponse?: DirectCostsFormResponse
}
export const DirectCostsFormDetail = ({
  directCostsFormResponse
}: DirectCostsFormDetailProps) => {
  const form = useForm<DirectCostsFormValue>({
    resolver: zodResolver(directCostsFormSchema),
    mode: "onBlur",
    values: directCostsFormResponse
      ? reverseFormatDirectCostsForm(directCostsFormResponse)
      : { [DirectCostsField.directCosts]: [] }
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: DirectCostsField.directCosts
  })

  return (
    <div className={cn("flex flex-col gap-2xl")}>
      <div className="grid grid-cols-6 w-full gap-5 items-center text-xs font-medium">
        <p className="row-start-1 col-start-1 col-end-3">Direct cost name</p>
        <p className="row-start-1 col-start-4 col-end-5">Cost start date</p>
        <p className="row-start-1 col-start-5 col-end-7 text-right">
          Estimated % of overall revenue
        </p>
      </div>
      <RHFProvider methods={form}>
        <div className="flex flex-col gap-6 mb-5">
          {fields?.map((founder, index) => (
            <DirectCosts key={founder.id} index={index} value={founder} />
          ))}
        </div>
      </RHFProvider>
    </div>
  )
}

interface DirectCostsProps {
  index: number
  value: FieldArrayWithId<DirectCostsFormValue["directCosts"][number]>
}

const DirectCosts = (props: DirectCostsProps) => {
  const { index, value } = props

  return (
    <div className="flex gap-3" key={value.id}>
      <div className="grid grid-cols-6 w-full gap-5 items-center">
        <div className="row-start-1 col-start-1 col-end-3 flex gap-1 flex-col">
          <RHFTextInput
            label=""
            className="font-medium text-sm"
            placeholder="Direct cost name "
            styleProps={{ inputClassName: "h-6 text-sm max-w-52 -mt-1.5" }}
            name={getArrayFieldName<
              DirectCostsField,
              FieldPath<DirectCostsFormValue>
            >(DirectCostsField.directCostsName, index)}
            isToggleView
            isHideErrorMessage
            autoFocus
            isDetail
          />
          <RHFTextInput
            label=""
            className="mt-auto text-xs text-text-secondary"
            styleProps={{ inputClassName: "h-6 text-xs max-w-32 -mb-1.5" }}
            placeholder="Add description"
            name={getArrayFieldName<
              DirectCostsField,
              FieldPath<DirectCostsFormValue>
            >(DirectCostsField.directCostsDescription, index)}
            isToggleView
            isHideErrorMessage
            isDetail
          />
        </div>
        <RHFMaskInput
          label=""
          pattern={MM_YYYY_PATTERN}
          className="row-start-1 col-start-4 col-end-5 mt-0"
          placeholder="MM/YYYY"
          name={getArrayFieldName<
            DirectCostsField,
            FieldPath<DirectCostsFormValue>
          >(DirectCostsField.directCostsStartDate, index)}
          isHideErrorMessage
          isDetail
        />
        <RHFCurrencyInput
          label=""
          placeholder="Overall revenue"
          className="row-start-1 col-start-5 col-end-7 mt-0 text-right"
          suffixIcon={<span>%</span>}
          name={getArrayFieldName<
            DirectCostsField,
            FieldPath<DirectCostsFormValue>
          >(DirectCostsField.directCostsOverallRevenue, index)}
          isHideErrorMessage
          isDetail
        />
      </div>
    </div>
  )
}
