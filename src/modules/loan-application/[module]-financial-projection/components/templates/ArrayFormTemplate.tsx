import { useFieldArray, useFormContext } from "react-hook-form"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { TrashIcon, X } from "lucide-react"
import { FC, memo, ReactNode, useCallback } from "react"
import {
  Block,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { CollapsibleArrayFieldTemplate } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CollapsibleArrayFieldTemplate.tsx"
import { Accordion } from "@/components/ui/accordion.tsx"
import { lowerCase } from "lodash"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { RevenueType } from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { useBoolean } from "@/hooks"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { Separator } from "@/components/ui/separator"

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

const ArrayFormTemplate: FC<ArrayFormTemplateProps> = (props) => {
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
      <span>
        Are you sure to delete this entire revenue stream? This action is
        permanent and cannot be undone.
      </span>
    ),
    btnAddText = `Add ${lowerCase(dataName)}`
  } = props
  const confirmDeleteDialog = useBoolean(false)
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

  return (
    <Card className="flex flex-col gap-2xl p-xl rounded-lg h-fit">
      <div className="flex justify-between items-center mr-5">
        <div>
          <h5 className="text-[18px] font-semibold mb-4">{title}</h5>
          <div className="text-sm">{subtitle}</div>
        </div>
        <CustomAlertDialog
          isOpen={confirmDeleteDialog.value}
          onConfirmed={handleClearAll}
          onCanceled={(e) => {
            e.stopPropagation()
            confirmDeleteDialog.onFalse()
          }}
          title="Delete this revenue stream?"
          cancelText="Cancel"
          confirmText="Confirm"
          description={description}
          actionClassName="bg-red-500 hover:bg-red-600 text-white"
        >
          <X onClick={confirmDeleteDialog.onTrue} />
        </CustomAlertDialog>
      </div>
      <Separator />
      <Accordion type="multiple" className="flex flex-col gap-xl">
        {fields.map((source, index) => {
          const label = watch(`${fieldName}.${index}.name`)
            ? watch(`${fieldName}.${index}.name`)
            : "Untitled"

          return (
            <CollapsibleArrayFieldTemplate
              id={source.id}
              key={source.id}
              label={label}
            >
              <div className="flex flex-col gap-5 p-5 bg-[#F2F8F8] rounded-xl border">
                <TooltipProvider>
                  {renderBlockComponents(
                    blocks.map((block) => {
                      const indexedName = `${fieldName}.${index}.${block.name}`
                      return {
                        ...block,
                        name: indexedName,
                        props: {
                          ...block.props,
                          ...register(indexedName),
                          control
                        }
                      }
                    })
                  )}
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
          {btnAddText}
        </div>
      </Button>
    </Card>
  )
}

export default memo(ArrayFormTemplate)
