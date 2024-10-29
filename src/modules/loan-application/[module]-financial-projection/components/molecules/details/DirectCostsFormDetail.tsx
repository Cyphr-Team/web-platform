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
  type DirectCostsFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  type FieldArrayWithId,
  type FieldPath,
  useFieldArray,
  useForm
} from "react-hook-form"

interface DirectCostsFormDetailProps {
  directCostsFormValue?: DirectCostsFormValue
}

export function DirectCostsFormDetail({
  directCostsFormValue
}: DirectCostsFormDetailProps) {
  const form = useForm<DirectCostsFormValue>({
    resolver: zodResolver(directCostsFormSchema),
    mode: "onBlur",
    values: directCostsFormValue
      ? directCostsFormValue
      : { [DirectCostsField.directCosts]: [] }
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: DirectCostsField.directCosts
  })

  return (
    <div
      className={cn(
        "flex flex-col gap-2xl pt-4 px-4 md:px-8 pb-4 md:pb-8",
        EXPORT_CLASS.FINANCIAL
      )}
    >
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

function DirectCosts(props: DirectCostsProps) {
  const { index, value } = props

  return (
    <div key={value.id} className="flex gap-3">
      <div className="grid grid-cols-6 w-full gap-5 items-center">
        <div className="row-start-1 col-start-1 col-end-3 flex gap-1 flex-col">
          <RHFTextInput
            isDetail
            isHideErrorMessage
            isToggleView
            className="font-medium text-sm"
            label=""
            name={getArrayFieldName<
              DirectCostsField,
              FieldPath<DirectCostsFormValue>
            >(DirectCostsField.directCostsName, index)}
            placeholder="Direct cost name "
            styleProps={{ inputClassName: "h-6 text-sm max-w-52 -mt-1.5" }}
          />
          <RHFTextInput
            isDetail
            isHideErrorMessage
            isToggleView
            className="mt-auto text-xs text-text-secondary"
            label=""
            name={getArrayFieldName<
              DirectCostsField,
              FieldPath<DirectCostsFormValue>
            >(DirectCostsField.directCostsDescription, index)}
            placeholder="Add description"
            styleProps={{ inputClassName: "h-6 text-xs max-w-32 -mb-1.5" }}
          />
        </div>
        <RHFMaskInput
          isDetail
          isHideErrorMessage
          className="row-start-1 col-start-4 col-end-5 mt-0"
          label=""
          name={getArrayFieldName<
            DirectCostsField,
            FieldPath<DirectCostsFormValue>
          >(DirectCostsField.directCostsStartDate, index)}
          pattern={MM_YYYY_PATTERN}
          placeholder="MM/YYYY"
        />
        <RHFCurrencyInput
          isDetail
          isHideErrorMessage
          className="row-start-1 col-start-5 col-end-7 mt-0 text-right"
          label=""
          name={getArrayFieldName<
            DirectCostsField,
            FieldPath<DirectCostsFormValue>
          >(DirectCostsField.directCostsOverallRevenue, index)}
          placeholder="Overall revenue"
          suffixIcon={<span>%</span>}
        />
      </div>
    </div>
  )
}
