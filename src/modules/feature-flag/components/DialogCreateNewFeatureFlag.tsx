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
import type * as z from "zod"

import {
  createFeatureFlagForm,
  useCreateFeatureFlagMutation
} from "../hooks/useMutation/useCreateFeatureFlagMutation"
import { useQueryFeatureFlagDetails } from "../hooks/useQuery/useQueryFeatureFlagDetails"
import { useUpdateFeatureFlagMutation } from "../hooks/useMutation/useUpdateFeatureFlagMutation"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"

interface Props {
  id: string
  setDetailId: (id: string) => void
}

export const CreateNewFeatureFlagDialog: React.FC<Props> = ({
  id,
  setDetailId
}) => {
  const [open, setOpen] = useState(false)

  const featureFlagDetails = useQueryFeatureFlagDetails(id)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setDetailId("")
    }
    setOpen(open)
  }
  const form = useForm<z.infer<typeof createFeatureFlagForm>>({
    resolver: zodResolver(createFeatureFlagForm),
    values: useMemo(() => {
      if (featureFlagDetails.data && !!id.length) {
        return {
          key: featureFlagDetails.data.key,
          description: featureFlagDetails.data.description ?? "",
          tags: featureFlagDetails.data.tags ?? []
        }
      }

      return {
        key: "",
        description: "",
        tags: []
      }
    }, [featureFlagDetails.data, id]),
    mode: "onChange"
  })

  const handleInputKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value
    const textWithUnderscores = inputText.replace(/ /g, "_")

    form.setValue("key", textWithUnderscores)
  }

  const { mutate, isPending } = useCreateFeatureFlagMutation()
  const { mutate: editFeatureFlag, isPending: isUpdating } =
    useUpdateFeatureFlagMutation()

  const formSubmit = form.handleSubmit((data) => {
    if (id.length) {
      editFeatureFlag(
        { ...data, id },
        {
          onSuccess() {
            onOpenChange(false)
          }
        }
      )

      return
    }
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
          <PlusCircle className="mr-1.5 text-sm" size={16} />
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
        <LoadingWrapper
          className="min-h-40"
          isLoading={
            featureFlagDetails.isFetching || featureFlagDetails.isLoading
          }
        >
          <Form {...form}>
            <form className="flex flex-col space-y-3" onSubmit={formSubmit}>
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
                        placeholder="i.e: SUBSCRIPTION_FEATURE_CREATE"
                        wrapperClassName="col-span-3 w-full"
                        {...field}
                        disabled={!!id.length}
                        onChange={handleInputKey}
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
                  disabled={!form.formState.isValid || !form.formState.isDirty}
                  isLoading={isPending || isUpdating}
                  type="submit"
                >
                  {id.length ? "Update" : "Create"}
                </ButtonLoading>
              </DialogFooter>
            </form>
          </Form>
        </LoadingWrapper>
      </DialogContent>
    </Dialog>
  )
}
