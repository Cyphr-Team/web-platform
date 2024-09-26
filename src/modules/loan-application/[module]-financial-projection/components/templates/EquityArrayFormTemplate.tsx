import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button.tsx"
import { TrashIcon } from "lucide-react"
import { FC, memo, ReactNode, useCallback } from "react"
import {
  Block,
  renderInnerBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { CollapsibleArrayFieldTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CollapsibleArrayFieldTemplate.tsx"
import { Accordion } from "@/components/ui/accordion.tsx"
import { lowerCase } from "lodash"
import { TooltipProvider } from "@radix-ui/react-tooltip"

interface ArrayFormTemplateProps {
  fieldName: string
  dataName: string

  defaultEmptyObject: object
  onBlur: VoidFunction

  blocks: Block[]
  addIcon: ReactNode
}

const ArrayFormTemplate: FC<ArrayFormTemplateProps> = (props) => {
  const { fieldName, defaultEmptyObject, dataName, onBlur, blocks, addIcon } =
    props
  const { control, getValues, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName
  })

  const handleAddItem = () => {
    append(defaultEmptyObject)
  }

  const onRemove = useCallback(
    (index: number) => () => {
      remove(index)
      onBlur()
    },
    [onBlur, remove]
  )

  return (
    <>
      <Accordion type="multiple" className="flex flex-col gap-xl">
        {fields.map((source, index) => {
          const label = watch(`${fieldName}.${index}.name`)
            ? watch(`${fieldName}.${index}.name`)
            : dataName

          return (
            <CollapsibleArrayFieldTemplate
              id={source.id}
              key={source.id}
              label={label}
              disabledBorder
            >
              <div className="flex flex-col gap-5 p-5 bg-[#F2F8F8] rounded-xl border">
                <TooltipProvider>
                  {renderInnerBlockComponents(blocks, fieldName, index)}
                </TooltipProvider>
                {getValues(fieldName)?.length > 1 ? (
                  <Button
                    variant="outline"
                    onClick={onRemove(index)}
                    className="w-fit self-end"
                  >
                    <TrashIcon />
                  </Button>
                ) : null}
              </div>
            </CollapsibleArrayFieldTemplate>
          )
        })}
      </Accordion>
      <Button
        type="button"
        variant="outline"
        className="ml-auto border-black"
        onClick={handleAddItem}
      >
        <div className="flex gap-2 items-center w-fit">
          {addIcon}
          {`Add ${lowerCase(dataName)}`}
        </div>
      </Button>
    </>
  )
}

export default memo(ArrayFormTemplate)
