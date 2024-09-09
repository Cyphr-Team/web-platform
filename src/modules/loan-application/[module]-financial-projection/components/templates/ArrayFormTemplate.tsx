import { useFieldArray, useFormContext } from "react-hook-form"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Plus, X } from "lucide-react"
import { FC, memo, useCallback } from "react"
import {
  Block,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"

interface ArrayFormTemplateProps {
  name: string
  defaultEmptyObject: object
  step: LOAN_APPLICATION_STEPS
  blocks: Block[]
}

const ArrayFormTemplate: FC<ArrayFormTemplateProps> = (props) => {
  const { name, defaultEmptyObject, step, blocks } = props
  const { control, getValues } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const handleAddFundingSource = () => {
    append(defaultEmptyObject)
  }

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
    <Card className="flex flex-col gap-2xl p-xl rounded-lg h-fit">
      <h5 className="text-sm font-semibold">
        Select all funding sources that apply and add the amount you have
        received
      </h5>
      {fields.map((source, index) => {
        return (
          <div className="flex flex-col" key={source.id}>
            <div className="flex justify-between items-center">
              <h5 className="font-semibold text-sm text-center align-middle">
                {getValues(name).at(index).name}
              </h5>
              {getValues(name).length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  className="p-4"
                  onClick={onRemove(index)}
                >
                  <X className="w-4" />
                </Button>
              )}
            </div>
            {renderBlockComponents(blocks)}
          </div>
        )
      })}
      <Button
        type="button"
        variant="outline"
        className="w-min ml-auto border-black gap-2"
        onClick={handleAddFundingSource}
      >
        <Plus className="w-4" />
        Add funding source
      </Button>
    </Card>
  )
}

export default memo(ArrayFormTemplate)
