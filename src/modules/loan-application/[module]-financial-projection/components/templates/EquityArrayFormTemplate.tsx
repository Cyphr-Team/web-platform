import { Accordion } from "@/components/ui/accordion.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  type Block,
  renderInnerBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { CollapsibleArrayFieldTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CollapsibleArrayFieldTemplate.tsx"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { lowerCase } from "lodash"
import { TrashIcon } from "lucide-react"
import { memo, type ReactNode, useCallback, useState, useMemo } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

interface EquityArrayFormTemplateProps {
  fieldName: string
  dataName: string

  defaultEmptyObject: object
  onBlur: VoidFunction

  blocks: Block[]
  addIcon: ReactNode
}

interface ItemState {
  id: string
  active: boolean
}

function EquityArrayFormTemplate(props: EquityArrayFormTemplateProps) {
  const { fieldName, defaultEmptyObject, dataName, onBlur, blocks, addIcon } =
    props
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName
  })
  const [activeItems, setActiveItems] = useState<ItemState[]>([])

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

  const handleSetActiveItem = useCallback((items: string[]) => {
    setActiveItems((prevState) =>
      prevState.map((item) => ({
        id: item.id,
        active: items.some((target) => target === item.id)
      }))
    )
  }, [])

  const getActiveItemIds = useMemo(() => {
    return activeItems.filter((item) => item.active).map((item) => item.id)
  }, [activeItems])

  return (
    <>
      <Accordion
        className="flex flex-col gap-xl"
        type="multiple"
        value={getActiveItemIds}
        onValueChange={handleSetActiveItem}
      >
        {fields.map((source, index) => {
          const label = watch(`${fieldName}.${index}.name`)
            ? watch(`${fieldName}.${index}.name`)
            : "Untitled"

          const existed = activeItems.some((item) => item.id === source.id)

          if (!existed) {
            setActiveItems((prevState) => [
              ...prevState,
              {
                active: true,
                id: source.id
              }
            ])
          }

          return (
            <CollapsibleArrayFieldTemplate
              key={source.id}
              id={source.id}
              label={label}
            >
              <div className="flex flex-col gap-5 p-5 bg-[#F2F8F8] rounded-lg border">
                <TooltipProvider>
                  {renderInnerBlockComponents(blocks, fieldName, index)}
                </TooltipProvider>

                {/* The equity form doesn’t have to be mandatory */}
                <Button
                  className="w-fit self-end"
                  variant="outline"
                  onClick={onRemove(index)}
                >
                  <TrashIcon />
                </Button>
              </div>
            </CollapsibleArrayFieldTemplate>
          )
        })}
      </Accordion>
      <Button
        className="ml-auto border-black"
        type="button"
        variant="outline"
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

export default memo(EquityArrayFormTemplate)
