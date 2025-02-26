import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import {
  RHFDragAndDropFileUpload,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { Form } from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import {
  updateProfileFormSchema,
  type UpdateProfileFormValue
} from "@/modules/settings/hooks/useUpdateProfile.ts"

export function PersonalInfo() {
  const form = useForm<UpdateProfileFormValue>({
    resolver: zodResolver(updateProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: ""
    }
  })

  return (
    <div className="flex gap-xl">
      <section className="text-sm w-[270px]">
        <p className="text-text-secondary font-medium">Personal info</p>
        <p className="text-text-tertiary">
          Update your photo and personal details.
        </p>
      </section>
      <FormLayout hideTopNavigation cardClassName="w-[650px] p-0">
        <Form {...form}>
          <div>
            <div className="grid gap-x-4xl gap-y-3xl px-8 py-6">
              <RHFTextInput
                label="Display name"
                name="name"
                placeholder="Display name"
              />
              <div className="flex gap-4">
                <Avatar className="size-16 rounded-full border">
                  <AvatarImage />
                  <AvatarFallback />
                </Avatar>
                <div className="w-full">
                  <RHFDragAndDropFileUpload
                    className="border-dashed"
                    iconClassName="rounded-full"
                    id="avatar"
                    name="avatar"
                    supportFileTypesNote="SVG, PNG, JPG or GIF (max. 800x400px)"
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end space-x-3 mx-8 my-4">
              <Button variant="outline">Cancel</Button>
              <ButtonLoading>Save changes</ButtonLoading>
            </div>
          </div>
        </Form>
      </FormLayout>
    </div>
  )
}
