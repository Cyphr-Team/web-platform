import { Button, ButtonLoading } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Block,
  ComponentMapper,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate"
import { RHFProvider } from "@/modules/form-template/providers"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const enum FormField {
  SCENARIOS_NAME = "name"
}

type Props = {
  id: string
  setDetailId: (id: string) => void
}

export const CreateScenarioModal: React.FC<Props> = ({ id, setDetailId }) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setDetailId("")
    }
    setOpen(open)
  }

  const schema = z.object({
    name: z.string().min(1, "Name is required")
  })

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema)
  })

  const onSubmit = useCallback(() => {
    console.log("submitted")
  }, [])

  const blocks: Block[] = [
    {
      type: FieldType.TEXT,
      name: FormField.SCENARIOS_NAME,
      props: {
        label: "What would you like to call it?",
        placeholder: "Enter a title or description",
        required: true
      }
    }
  ]

  return (
    <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
      <Dialog open={open || !!id.length} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="w-56 mt-4 ml-auto" type="button">
            Create a new scenario
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {id.length ? (
              <DialogTitle>Edit scenario</DialogTitle>
            ) : (
              <DialogTitle>Create new scenario</DialogTitle>
            )}
          </DialogHeader>
          <LoadingWrapper isLoading={false}>
            <div className="grid grid-cols-12 gap-4">
              {blocks.map(({ type, props, name }) => {
                const Component = ComponentMapper[type]
                return (
                  <Component
                    key={name}
                    className="col-span-12"
                    name={name}
                    {...props}
                  />
                )
              })}
            </div>
          </LoadingWrapper>
          <DialogFooter>
            <ButtonLoading isLoading={false} type="submit">
              {id.length ? "Update Scenario" : "Create Scenario"}
            </ButtonLoading>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RHFProvider>
  )
}
