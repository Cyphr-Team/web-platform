import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils"
import {
  type Block,
  renderInnerBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { type LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { X } from "lucide-react"
import { memo, type ReactNode, useCallback } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

interface PeopleArrayFormTemplateProps {
  title?: string
  subtitle?: string
  actionText: string
  actionIcon?: ReactNode
  name: string
  defaultEmptyObject: object
  step: LOAN_APPLICATION_STEPS
  blocks: Block[]
  className?: string
  layout: "future" | "current"
}

function PeopleArrayFormTemplate(props: PeopleArrayFormTemplateProps) {
  const {
    name,
    defaultEmptyObject,
    step,
    blocks,
    actionText,
    actionIcon,
    title,
    subtitle,
    className,
    layout
  } = props
  const { control, getValues } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleAddItem = useCallback(() => {
    append(defaultEmptyObject)
  }, [append, defaultEmptyObject])

  const onBlur = useCallback(() => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: step,
      state: getValues()
    })
  }, [dispatchFormAction, getValues, step])

  const onRemove = useCallback(
    (index: number) => () => {
      remove(index)
      onBlur()
    },
    [onBlur, remove]
  )

  return (
    <>
      {title ? <h5 className="text-sm font-semibold">{title}</h5> : null}
      {subtitle ? (
        <h5 className="text-sm font-medium financial-projection text-muted-foreground">
          {subtitle}
        </h5>
      ) : null}
      {fields.map((source, index) => {
        return (
          <div
            key={source.id}
            className={cn("bg-financial-projection-card rounded-lg", className)}
          >
            <div
              className={cn(
                "grid gap-2",
                layout === "current" ? "grid-cols-10" : "grid-cols-12"
              )}
            >
              {renderInnerBlockComponents(blocks, name, index)}
            </div>
            <Button
              className={cn(
                "p-0 h-auto",
                layout === "future" ? "self-end" : null
              )}
              type="button"
              variant="ghost"
              onClick={onRemove(index)}
            >
              <X className="w-5 h-5 text-text-tertiary" />
            </Button>
          </div>
        )
      })}
      <Button
        className="w-min ml-auto gap-2"
        type="button"
        variant="outline"
        onClick={handleAddItem}
      >
        {actionIcon}
        {actionText}
      </Button>
    </>
  )
}

export default memo(PeopleArrayFormTemplate)
