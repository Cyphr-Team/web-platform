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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  createFeatureFlagForm,
  useCreateFeatureFlagMutation
} from "../hooks/useMutation/useCreateFeatureFlagMutation"
import { useQueryFeatureFlagDetails } from "../hooks/useQuery/useQueryFeatureFlagDetails"

type Props = {
  id: string
  setDetailId: (id: string) => void
}

export const CreateNewFeatureFlagDialog: React.FC<Props> = ({
  id,
  setDetailId
}) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
      setDetailId("")
    }
    setOpen(open)
  }
  const featureFlagDetails = useQueryFeatureFlagDetails(id)

  const form = useForm<z.infer<typeof createFeatureFlagForm>>({
    resolver: zodResolver(createFeatureFlagForm),
    defaultValues: useMemo(() => {
      if (featureFlagDetails.data) {
        return {
          key: featureFlagDetails.data.key,
          description: featureFlagDetails.data.description,
          tags: featureFlagDetails.data.tags
        }
      }
      return {
        key: "",
        description: "",
        tags: []
      }
    }, [featureFlagDetails.data]),
    mode: "onChange"
  })

  const { mutate, isPending } = useCreateFeatureFlagMutation()

  const formSubmit = form.handleSubmit((data) => {
    mutate(
      { ...data },
      {
        onSuccess() {
          onOpenChange(false)
        }
      }
    )
  })

  return (
    <Dialog open={open || !!id.length} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusCircle size={16} className="text-sm mr-1.5" />
          Create new flag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {id.length ? (
            <DialogTitle>Edit feature flag</DialogTitle>
          ) : (
            <DialogTitle>Create new feature flag</DialogTitle>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={formSubmit} className="flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel>Key</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="i.e: SUBCRIPTION_FEATURE_CREATE"
                      wrapperClassName="col-span-3 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel>Description</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="i.e: flag to enable create subscription feature"
                      wrapperClassName="col-span-3 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel>Tags</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="i.e: tags separated by comma"
                      wrapperClassName="col-span-3 w-full"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value.split(","))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <ButtonLoading
                type="submit"
                isLoading={isPending}
                disabled={!form.formState.isValid}
              >
                {id.length ? "Update" : "Create"}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
