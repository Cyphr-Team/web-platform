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
import { memo, type ReactNode, useCallback, useMemo, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

interface EquityArrayFormTemplateProps {
  allowEmpty?: boolean
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
  const {
    allowEmpty = false,
    fieldName,
    defaultEmptyObject,
    dataName,
    onBlur,
    blocks,
    addIcon
  } = props
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
              <div className="flex flex-col gap-5 rounded-lg border bg-[#F2F8F8] p-5">
                <TooltipProvider>
                  {renderInnerBlockComponents(blocks, fieldName, index)}
                </TooltipProvider>

                {/* The equity form does not have to be mandatory */}
                {allowEmpty || fields?.length > 1 ? (
                  <Button
                    className="w-fit self-end"
                    variant="outline"
                    onClick={onRemove(index)}
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
        className="ml-auto border-black"
        type="button"
        variant="outline"
        onClick={handleAddItem}
      >
        <div className="flex w-fit items-center gap-2">
          {addIcon}
          {`Add ${lowerCase(dataName)}`}
        </div>
      </Button>
    </>
  )
}

export default memo(EquityArrayFormTemplate)
