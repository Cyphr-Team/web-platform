import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DraggableList } from "@/components/ui/draggable-list"
import { type FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FormOptionCard } from "./form-option"
import { ScrollArea } from "@/components/ui/scroll"
import { SelectFormsDialog } from "./select-forms-dialog"
import { useGetFormsConfiguration } from "../../hooks/useGetFormsConfiguration"
import { useUpdateEffect } from "react-use"

interface Props {
  detailId?: string
  onSave: (forms: string[]) => void
}

const defaultFormValues = {
  formsConfiguration: []
}
const formsConfigurationForm = z.object({
  formsConfiguration: z.array(z.string())
})

export function FormsConfigurationDialog({
  detailId,
  onSave
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)

  const programFormsConfiguration = useGetFormsConfiguration(detailId ?? "")

  useUpdateEffect(() => {
    if (programFormsConfiguration.data) {
      form.setValue("formsConfiguration", programFormsConfiguration.data.forms)
    }
  }, [programFormsConfiguration.data])

  const form = useForm<z.infer<typeof formsConfigurationForm>>({
    resolver: zodResolver(formsConfigurationForm),
    defaultValues: programFormsConfiguration.data
      ? {
          formsConfiguration: programFormsConfiguration.data.forms
        }
      : defaultFormValues
  })

  const onChangeSelectedForms = (formType: string[]) => {
    const selectedForms = form.getValues("formsConfiguration")

    form.setValue(
      "formsConfiguration",
      Array.from(new Set([...selectedForms, ...formType]))
    )
  }

  const onRemoveForm = (formType: string) => () => {
    form.setValue(
      "formsConfiguration",
      form.getValues("formsConfiguration").filter((v) => v !== formType)
    )
  }

  const onSaveForms = () => {
    onSave(form.getValues("formsConfiguration"))
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">Forms Configuration</Button>
      </DialogTrigger>
      <DialogContent className="gap-0 px-0 sm:max-w-[625px]">
        <DialogHeader className="border-b px-4 pb-4">
          {detailId ? (
            <DialogTitle>Edit Forms Configuration</DialogTitle>
          ) : (
            <DialogTitle>Create Forms Configuration</DialogTitle>
          )}
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4 p-4 pb-0">
            <SelectFormsDialog
              selectedForms={form.watch("formsConfiguration") ?? []}
              onSave={onChangeSelectedForms}
            />
            <DialogTitle className="text-lg font-semibold">Forms</DialogTitle>

            <ScrollArea className="h-96 gap-4">
              <DraggableList
                customCard={(item: string) => (
                  <FormOptionCard
                    formType={item as FORM_TYPE}
                    id={item}
                    value={item}
                    onRemove={onRemoveForm(item as FORM_TYPE)}
                  />
                )}
                initialItems={form.watch("formsConfiguration") ?? []}
                onReorder={(items: string[]) => {
                  form.setValue("formsConfiguration", items)
                }}
              />
            </ScrollArea>
          </form>
        </Form>
        <DialogFooter className="border-t px-6 pt-4">
          <Button type="button" onClick={onSaveForms}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
