import { useFieldArray, useFormContext } from "react-hook-form"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { TrashIcon, X } from "lucide-react"
import { memo, type ReactNode, useCallback, useState } from "react"
import {
  type Block,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { CollapsibleArrayFieldTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CollapsibleArrayFieldTemplate.tsx"
import { Accordion } from "@/components/ui/accordion.tsx"
import { lowerCase } from "lodash"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { useBoolean } from "@/hooks"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { Separator } from "@/components/ui/separator"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form.ts"

interface ItemState {
  id: string
  active: boolean
}

interface ArrayFormTemplateProps {
  title: string
  subtitle: string
  description?: ReactNode

  fieldName: RevenueType
  dataName: string

  defaultEmptyObject: object
  onBlur: VoidFunction

  blocks: Block[]
  addIcon: ReactNode
  btnAddText?: ReactNode
}

function ArrayFormTemplate(props: ArrayFormTemplateProps) {
  const {
    title,
    subtitle,
    fieldName,
    dataName,
    defaultEmptyObject,
    onBlur,
    blocks,
    addIcon,
    description = (
      <span className="break-normal">
        Are you sure you want to delete this revenue stream? This action is
        permanent and can't be undone.
      </span>
    ),
    btnAddText = `Add ${lowerCase(dataName)}`
  } = props

  const confirmDeleteDialog = useBoolean(false)
  const [activeItems, setActiveItems] = useState<ItemState[]>([])

  const { control, getValues, setValue, register, watch } = useFormContext()
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

  const handleClearAll = useCallback(() => {
    setValue(fieldName, [])
  }, [fieldName, setValue])

  const handleSetActiveItem = useCallback((items: string[]) => {
    setActiveItems((prevState) => {
      return prevState
        .map((item) => ({ id: item.id, active: false }))
        .map((item) => {
          const active = items.find((target) => target === item.id)

          return active ? { id: item.id, active: true } : item
        })
    })
  }, [])

  return (
    <Card className="flex h-fit flex-col gap-2xl rounded-lg p-xl">
      <div className="mr-5 flex items-center justify-between">
        <div>
          <h5 className="mb-4 text-[18px] font-semibold">{title}</h5>
          <div className="financial-projection text-sm text-muted-foreground">
            {subtitle}
          </div>
        </div>
        <CustomAlertDialog
          actionClassName="bg-red-500 text-white hover:bg-red-600"
          cancelText="Cancel"
          confirmText="Confirm"
          description={description}
          isOpen={confirmDeleteDialog.value}
          title="Delete this revenue stream?"
          onCanceled={(e) => {
            e.stopPropagation()
            confirmDeleteDialog.onFalse()
          }}
          onConfirmed={handleClearAll}
        >
          <Button
            className="ml-auto mr-0 flex h-auto p-0"
            type="button"
            variant="ghost"
            onClick={confirmDeleteDialog.onTrue}
          >
            <X className="w-4" />
          </Button>
        </CustomAlertDialog>
      </div>
      <Separator />
      <Accordion
        className="flex flex-col gap-xl"
        type="multiple"
        value={activeItems.filter((item) => item.active).map((item) => item.id)}
        onValueChange={handleSetActiveItem}
      >
        {fields.map((source, index) => {
          const label = watch(`${fieldName}.${index}.name`)
            ? watch(`${fieldName}.${index}.name`)
            : "Untitled"

          const isRecurringChagres = fieldName === RevenueType.RecurringCharges
          const isHasUpfrontFee =
            watch(`${fieldName}.${index}.hasUpfrontFee`) === BINARY_VALUES.YES

          const blocksToRender =
            !isRecurringChagres || isHasUpfrontFee
              ? blocks
              : blocks.filter((block) => block.name !== "upfrontFee")

          const existed = activeItems.find((item) => item.id === source.id)

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
                <TooltipProvider delayDuration={500}>
                  {renderBlockComponents(
                    blocksToRender.map((block) => {
                      const indexedName = `${fieldName}.${index}.${block.name}`

                      // Note: Each of the input components already use ref from {field}
                      // So we can ignore and don't need to define forwardRef for each input components
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { ref: _ref, ...fieldRegistered } =
                        register(indexedName)

                      return {
                        ...block,
                        name: indexedName,
                        props: {
                          ...block.props,
                          ...fieldRegistered,
                          control
                        }
                      }
                    })
                  )}
                </TooltipProvider>
                {getValues(fieldName)?.length > 1 ? (
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
        className="ml-auto border-black border-opacity-20 p-3"
        type="button"
        variant="outline"
        onClick={handleAddItem}
      >
        <div className="flex w-fit items-center">
          {addIcon}
          {btnAddText}
        </div>
      </Button>
    </Card>
  )
}

export default memo(ArrayFormTemplate)
