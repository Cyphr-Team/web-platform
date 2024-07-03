import { useMemo, useState } from "react"
import { Button, ButtonLoading } from "@/components/ui/button"
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
import { useQueryGetFormsConfiguration } from "@/modules/loan-application/hooks/useQuery/useQueryFormsConfiguration"
import { DraggableList } from "@/components/ui/draggable-list"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { FormOptionCard } from "./form-option"
import { SelectFormsDialog } from "./select-form-dialog"
import { ScrollArea } from "@/components/ui/scroll"

type Props = {
  detailId?: string
}

const defaultFormValues = {
  formsConfiguration: []
}

export function FormsConfigurationDialog({
  detailId
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const programFormsConfiguration = useQueryGetFormsConfiguration(
    detailId ?? ""
  )

  const isProcessing = false
  const formsConfigurationForm = z.object({
    formsConfiguration: z.array(z.string())
  })

  const form = useForm<z.infer<typeof formsConfigurationForm>>({
    resolver: zodResolver(formsConfigurationForm),
    defaultValues: useMemo(
      () =>
        programFormsConfiguration.data
          ? {
              formsConfiguration: programFormsConfiguration.data.forms
            }
          : defaultFormValues,
      [programFormsConfiguration.data]
    )
  })

  const onChangeSelectedForms = (formType: string[]) => {
    const selectedForms = form.getValues("formsConfiguration")
    form.setValue("formsConfiguration", [...selectedForms, ...formType])
  }

  const onRemoveForm = (formType: string) => () => {
    form.setValue(
      "formsConfiguration",
      form.getValues("formsConfiguration").filter((v) => v !== formType)
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">Forms Configuration</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] px-0 gap-0">
        <DialogHeader className="px-4 border-b pb-4">
          {detailId ? (
            <DialogTitle>Edit Forms Configuration</DialogTitle>
          ) : (
            <DialogTitle>Create Forms Configuration</DialogTitle>
          )}
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col p-4 gap-4 pb-0">
            <SelectFormsDialog
              selectedForms={form.watch("formsConfiguration") ?? []}
              onSave={onChangeSelectedForms}
            />
            <DialogTitle className="text-lg font-semibold">Forms</DialogTitle>

            <ScrollArea className="h-96 gap-4">
              <DraggableList
                initialItems={form.watch("formsConfiguration") ?? []}
                onReorder={(items: string[]) => {
                  form.setValue("formsConfiguration", items)
                }}
                customCard={(item: string) => (
                  <FormOptionCard
                    id={item}
                    value={item}
                    formType={item as FORM_TYPE}
                    onRemove={onRemoveForm(item as FORM_TYPE)}
                  />
                )}
              />
            </ScrollArea>
            <DialogFooter className="px-6">
              <ButtonLoading type="button" isLoading={isProcessing}>
                Save
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
