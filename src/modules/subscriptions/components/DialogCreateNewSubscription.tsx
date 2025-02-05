import { Button, ButtonLoading } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import type * as z from "zod"

import {
  createSubscriptionForm,
  useCreateSubscriptionMutation
} from "@/modules/subscriptions/hooks/useMutation/useCreateSubscription"
import {
  RHFCurrencyInput,
  RHFNumberInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"

function CreateNewSubscriptionDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof createSubscriptionForm>>({
    resolver: zodResolver(createSubscriptionForm),
    values: {
      name: "",
      description: "",
      price: 0,
      quotaSeats: 0,
      quotaApplications: 0
    },
    mode: "onChange"
  })

  const { mutate: createSubscription, isPending: isPendingCreate } =
    useCreateSubscriptionMutation()

  const formSubmit = form.handleSubmit((data) => {
    createSubscription(
      { ...data },
      {
        onSuccess: () => {
          setOpen(false)
        }
      }
    )
  })

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle className="mr-1.5 text-sm" size={16} />
          Create new subscription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new subscription</DialogTitle>
        </DialogHeader>
        <RHFProvider methods={form} onSubmit={formSubmit}>
          <RHFTextInput
            className="mt-2 space-y-1"
            label="Name"
            name="name"
            placeholder="Cyphr Custom Tier"
          />
          <RHFTextInput
            className="mt-2 space-y-1"
            label="Description"
            name="description"
            placeholder="Cyphr's annual recurring plan"
          />
          <RHFCurrencyInput
            className="mt-4 space-y-2"
            label="Price"
            name="price"
            prefixIcon="$"
          />
          <RHFNumberInput
            className="mt-4 space-y-2"
            label="Number of seats"
            name="quotaSeats"
          />
          <RHFNumberInput
            className="mt-4 space-y-2"
            label="Number of applications"
            name="quotaApplications"
          />
        </RHFProvider>
        <DialogFooter>
          <ButtonLoading
            disabled={!form.formState.isValid || !form.formState.isDirty}
            isLoading={isPendingCreate}
            type="submit"
          >
            Create
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNewSubscriptionDialog
