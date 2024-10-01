import { useFieldArray, useFormContext } from "react-hook-form"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Button } from "@/components/ui/button.tsx"
import { FC, memo, ReactNode, useCallback, useEffect } from "react"
import {
  Block,
  renderInnerBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PeopleArrayFormTemplateProps {
  title?: string
  subtitle?: string
  actionText: string
  actionIcon?: ReactNode
  name: string
  defaultEmptyObject: object
  step: LOAN_APPLICATION_STEPS
  blocks: Block[]
  blockClassName?: string
  className?: string
  canBeEmpty?: boolean
}

const PeopleArrayFormTemplate: FC<PeopleArrayFormTemplateProps> = (props) => {
  const {
    name,
    defaultEmptyObject,
    step,
    blocks,
    actionText,
    actionIcon,
    title,
    subtitle,
    blockClassName,
    className,
    canBeEmpty
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

  useEffect(() => {
    if (!canBeEmpty && getValues(name)?.length == 0) {
      handleAddItem()
    }
  }, [canBeEmpty, getValues, handleAddItem, name])

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
      {title && <h5 className="text-sm font-semibold">{title}</h5>}
      {subtitle && (
        <h5 className="text-sm font-medium financial-projection text-muted-foreground">
          {subtitle}
        </h5>
      )}
      {fields.map((source, index) => {
        return (
          <div
            className={cn(
              "bg-financial-projection-card p-4 rounded-lg",
              className
            )}
            key={source.id}
          >
            <div
              className={cn(
                "flex justify-between items-center",
                blockClassName
              )}
            >
              {renderInnerBlockComponents(blocks, name, index)}
              <h5 className="font-semibold text-sm text-center align-middle">
                {getValues(name).at(index).name}
              </h5>
            </div>
            {(canBeEmpty || getValues(name).length > 1) && (
              <Button
                type="button"
                variant="ghost"
                className="p-0 h-auto flex ml-auto mr-0"
                onClick={onRemove(index)}
              >
                <X className="w-4" />
              </Button>
            )}
          </div>
        )
      })}
      <Button
        type="button"
        variant="outline"
        className="w-min ml-auto gap-2"
        onClick={handleAddItem}
      >
        {actionIcon}
        {actionText}
      </Button>
    </>
  )
}

export default memo(PeopleArrayFormTemplate)
