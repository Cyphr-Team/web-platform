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
import React, { useState } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { FormDescription } from "@/modules/loan-application/constants/type"
import { Checkbox } from "@/components/ui/checkbox"

interface Props {
  selectedForms: string[]
  onSave: (formType: string[]) => void
}

export const SelectFormsDialog: React.FC<Props> = ({
  selectedForms,
  onSave
}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<FORM_TYPE[]>([])
  const onSelectForm = (formType: FORM_TYPE) => {
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

  const remainingForms = Object.values(FORM_TYPE).filter(
    (formType) => !selectedForms.includes(formType)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" id="close-select">
          <PlusCircle size={16} className="text-sm mr-1.5" />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] px-0 gap-0">
        <DialogHeader className="px-4 border-b pb-4">
          <DialogTitle>Forms</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <ScrollArea className="h-96 gap-4">
            {/* Render each form */}
            {remainingForms.length ? (
              remainingForms.map((formType) => (
                <Card
                  className="p-2 mb-4 relative"
                  id={formType}
                  onClick={() => onSelectForm(formType)}
                >
                  <Checkbox
                    className="absolute top-2 right-2"
                    checked={selected.includes(formType)}
                    onChange={() => onSelectForm(formType)}
                  />
                  <CardTitle className="text-sm">
                    {`${capitalizeWords(snakeCaseToText(formType))} Form`}
                  </CardTitle>
                  <p className="text-sm text-primary">
                    {FormDescription[formType]}
                  </p>
                </Card>
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
