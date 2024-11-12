import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll"
import { PlusCircle } from "lucide-react"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import React, { useMemo, useState } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { FormDescription } from "../../constants"
import { get } from "lodash"

interface Props {
  selectedForms: string[]
  onSave: (formType: string[]) => void
}

function FormOptionCard({
  checked,
  formType,
  onSelectForm
}: {
  checked: boolean
  formType: FORM_TYPE
  onSelectForm: (formType: FORM_TYPE) => () => void
}) {
  return (
    <Card
      key={formType}
      className="relative mb-4 p-2"
      id={formType}
      onClick={onSelectForm(formType)}
    >
      <Checkbox
        checked={checked}
        className="absolute right-2 top-2"
        onChange={onSelectForm(formType)}
      />
      <CardTitle className="text-sm">
        {`${capitalizeWords(snakeCaseToText(formType))} Form`}
      </CardTitle>
      <p className="text-sm text-primary">
        {get(FormDescription, formType, "N/A")}
      </p>
    </Card>
  )
}

export const SelectFormsDialog: React.FC<Props> = ({
  selectedForms,
  onSave
}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<FORM_TYPE[]>([])
  const onSelectForm = (formType: FORM_TYPE) => () => {
    if (selected.includes(formType)) {
      setSelected(selected.filter((selectedForm) => selectedForm !== formType))
    } else {
      setSelected([...selected, formType])
    }
  }
  const handleSave = () => {
    onSave([...selectedForms, ...selected])
    setSelected([])
    setOpen(false)
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelected([])
    }
    setOpen(open)
  }

  const remainingForms = useMemo(
    () =>
      Object.values(FORM_TYPE).filter(
        (formType) => !selectedForms.includes(formType)
      ),
    [selectedForms]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button id="close-select" type="button">
          <PlusCircle className="mr-1.5 text-sm" size={16} />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 px-0 sm:max-w-[625px]">
        <DialogHeader className="border-b px-4 pb-4">
          <DialogTitle>Forms</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <ScrollArea className="h-96 gap-4">
            {/* Render each form */}
            {remainingForms.length ? (
              remainingForms.map((formType) => (
                <FormOptionCard
                  key={formType}
                  checked={selected.includes(formType)}
                  formType={formType}
                  onSelectForm={onSelectForm}
                />
              ))
            ) : (
              <p className="text-center">No forms available</p>
            )}
          </ScrollArea>
        </div>
        <DialogFooter className="px-6">
          {!!selected.length && (
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
