/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from "react-hook-form"
import {
  ComponentType,
  createElement,
  PropsWithChildren,
  ReactElement,
  useMemo
} from "react"
import { RHFCheckboxProps } from "@/modules/form-template/components/molecules/RHFCheckbox.tsx"
import { RHFMaskInputProps } from "@/modules/form-template/components/molecules/RHFMaskInput.tsx"
import { RHFMultiSelectInputProps } from "@/modules/form-template/components/molecules/RHFMultiSelectInput.tsx"
import { RHFNumberInputProps } from "@/modules/form-template/components/molecules/RHFNumberInput.tsx"
import { RHFOptionInputProps } from "@/modules/form-template/components/molecules/RHFOptionInput.tsx"
import { RHFSelectInputProps } from "@/modules/form-template/components/molecules/RHFSelectInput.tsx"
import { RHFTextInputProps } from "@/modules/form-template/components/molecules/RHFTextInput.tsx"
import { RHFPhoneInputProps } from "@/modules/form-template/components/molecules/RHFPhoneInput.tsx"
import RHFProvider from "@/modules/form-template/providers/RHFProvider.tsx"
import {
  RHFCalendarPickerInput,
  RHFCheckbox,
  RHFCurrencyInput,
  RHFDragAndDropFileUpload,
  RHFMaskInput,
  RHFMultiSelectInput,
  RHFNumberInput,
  RHFOptionInput,
  RHFPercentageInput,
  RHFSelectInput,
  RHFTextInput,
  RHFPhoneInput
} from "@/modules/form-template/components/molecules"
import { cn } from "@/lib/utils.ts"
import { RHFCalendarPickerInputProps } from "@/modules/form-template/components/molecules/RHFCalendarPickerInput.tsx"
import { RHFCurrencyInputProps } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { RHFPercentageInputProps } from "@/modules/form-template/components/molecules/RHFPercentageInput.tsx"

export const enum FieldType {
  TEXT = "text",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  MASK = "mask",
  SELECT = "select",
  MULTI_SELECT = "multiSelect",
  OPTION = "option",
  DATE = "date",
  CURRENCY = "currency",
  PERCENTAGE = "percentage",
  DND_FILE = "dragAndDropFile",
  PHONE = "phone"
}

export const ComponentMapper: { [key: string]: ComponentType<any> } = {
  [FieldType.TEXT]: RHFTextInput,
  [FieldType.NUMBER]: RHFNumberInput,
  [FieldType.CHECKBOX]: RHFCheckbox,
  [FieldType.MASK]: RHFMaskInput,
  [FieldType.SELECT]: RHFSelectInput,
  [FieldType.MULTI_SELECT]: RHFMultiSelectInput,
  [FieldType.OPTION]: RHFOptionInput,
  [FieldType.DATE]: RHFCalendarPickerInput,
  [FieldType.CURRENCY]: RHFCurrencyInput,
  [FieldType.PERCENTAGE]: RHFPercentageInput,
  [FieldType.DND_FILE]: RHFDragAndDropFileUpload,
  [FieldType.PHONE]: RHFPhoneInput
}

export type BlockProps<T extends FieldValues> = Partial<
  | RHFCheckboxProps<T>
  | RHFMaskInputProps<T>
  | RHFMultiSelectInputProps<T>
  | RHFNumberInputProps<T>
  | RHFOptionInputProps<T>
  | RHFSelectInputProps<T>
  | RHFTextInputProps<T>
  | RHFCalendarPickerInputProps<T>
  | RHFCurrencyInputProps<T>
  | RHFPercentageInputProps<T>
  | RHFPhoneInputProps<T>
>

export interface Block {
  name: string
  type: FieldType
  props?: BlockProps<any>
}

export interface Props extends PropsWithChildren {
  form: UseFormReturn
  blocks: Block[]
  onSubmit: VoidFunction
  submitProps?: BlockProps<any>
  renderSubmit?: (props?: BlockProps<any>) => ReactElement
  className?: string
}

export const renderBlockComponents = (blocks: Block[]) => {
  return blocks.map(({ type, props, name }) => {
    const Component = ComponentMapper[type]

    /**
     * use createElement instead of <Component /> because createElement will return ReactElement
     * The <Component /> return JSX.Element which will contain deprecated keyword JSX
     * */
    return createElement(Component, {
      key: name,
      className: "col-span-12",
      name: name,
      ...props
    })
  })
}

/**
 * INPUT: formSchema, element, element's props
 * OUTPUT: stateless FormTemplate
 * */
export const FormTemplate = (props: Props) => {
  const {
    form,
    blocks,
    onSubmit,
    className,
    children,
    renderSubmit,
    submitProps
  } = props

  const componentList = useMemo(() => renderBlockComponents(blocks), [blocks])

  return (
    <RHFProvider methods={form} onSubmit={onSubmit}>
      <div className={cn("grid grid-cols-12 gap-4 items-center", className)}>
        {componentList}
        {children}
      </div>
      {renderSubmit && renderSubmit(submitProps)}
    </RHFProvider>
  )
}
