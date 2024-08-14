/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn
} from "react-hook-form"
import { infer as zodInfer, ZodTypeAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ComponentType,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo
} from "react"
import { RHFCheckboxProps } from "@/modules/form-template/components/molecules/RHFCheckbox.tsx"
import { RHFMaskInputProps } from "@/modules/form-template/components/molecules/RHFMaskInput.tsx"
import { RHFMultiSelectInputProps } from "@/modules/form-template/components/molecules/RHFMultiSelectInput.tsx"
import { RHFNumberInputProps } from "@/modules/form-template/components/molecules/RHFNumberInput.tsx"
import { RHFOptionInputProps } from "@/modules/form-template/components/molecules/RHFOptionInput.tsx"
import { RHFSelectInputProps } from "@/modules/form-template/components/molecules/RHFSelectInput.tsx"
import { RHFTextInputProps } from "@/modules/form-template/components/molecules/RHFTextInput.tsx"
import RHFProvider from "@/modules/form-template/providers/RHFProvider.tsx"
import {
  RHFCheckbox,
  RHFMaskInput,
  RHFMultiSelectInput,
  RHFNumberInput,
  RHFOptionInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { cn } from "@/lib/utils.ts"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { Button } from "@/components/ui/button.tsx"
import { ArrowRight } from "lucide-react"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Card } from "@/components/ui/card.tsx"

export const enum FieldType {
  TEXT = "text",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  MASK = "mask",
  SELECT = "select",
  MULTI_SELECT = "multiSelect",
  OPTION = "option",
  CUSTOM = "custom"
}

export const ComponentMapper: { [key: string]: ComponentType<any> } = {
  [FieldType.TEXT]: RHFTextInput,
  [FieldType.NUMBER]: RHFNumberInput,
  [FieldType.CHECKBOX]: RHFCheckbox,
  [FieldType.MASK]: RHFMaskInput,
  [FieldType.SELECT]: RHFSelectInput,
  [FieldType.MULTI_SELECT]: RHFMultiSelectInput,
  [FieldType.OPTION]: RHFOptionInput
}

export type BlockProps<T extends FieldValues> = Partial<
  | RHFCheckboxProps<T>
  | RHFMaskInputProps<T>
  | RHFMultiSelectInputProps<T>
  | RHFNumberInputProps<T>
  | RHFOptionInputProps<T>
  | RHFSelectInputProps<T>
  | RHFTextInputProps<T>
>

export interface Block {
  name: string
  type: FieldType
  props?: BlockProps<any>
  render?: (props?: BlockProps<any>) => ReactElement
}

export interface Props<TSchemaTypeAny extends ZodTypeAny> {
  title: string
  description?: ReactNode
  schema: TSchemaTypeAny
  blocks: Block[]
  onSubmit: SubmitHandler<any>
  className?: string
  formProps?: UseFormProps<any>
  onValidating?: (form: UseFormReturn<zodInfer<TSchemaTypeAny>>) => any
}

/**
 * INPUT: formSchema, element, element's props
 * OUTPUT: stateless FormTemplate
 * */
export const FormTemplate = <TSchemaTypeAny extends ZodTypeAny>(
  props: Props<TSchemaTypeAny>
) => {
  const { schema, blocks, onSubmit, formProps, className, onValidating } = props
  const { getCurrentStep } = useLoanApplicationProgressContext()

  type FormType = zodInfer<typeof schema>

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    ...formProps
  })

  const process = useCallback(
    (blocks: Block[]) =>
      blocks.map(({ type, props, render, name }) => {
        const Component = ComponentMapper[type]

        if (type === FieldType.CUSTOM && render !== undefined) {
          return render(props)
        }

        return (
          <Component
            key={name}
            className="col-span-12"
            name={name}
            {...props}
          />
        )
      }),
    []
  )

  const componentList = useMemo(() => process(blocks), [process, blocks])

  // TODO: handle process
  useEffect(() => {
    if (onValidating !== undefined && form.formState.isValidating) {
      onValidating(form)
    }
  }, [form, form.formState.isValidating, onValidating])

  return (
    <Card
      className={cn(Object.values(layout))}
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("grid grid-cols-12 gap-4", className)}>
          {componentList}
        </div>
      </RHFProvider>

      {!isReviewApplicationStep(getCurrentStep()!.step) && (
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Next <ArrowRight className="ml-1 w-4" />
        </Button>
      )}
    </Card>
  )
}

const layout = {
  base: "border bg-card text-card-foreground shadow-sm flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 max-w-screen-sm",
  sm: "",
  md: "md:col-span-6 md:col-start-2 md:mx-auto md:w-full",
  lg: ""
}
