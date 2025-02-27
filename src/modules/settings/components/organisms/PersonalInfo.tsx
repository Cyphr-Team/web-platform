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
  profileFormSchema,
  type ProfileFormValue,
  useUpdateProfile
} from "@/modules/settings/hooks/useUpdateProfile.ts"
import { useGetUserInformation } from "@/hooks/useGetUserInformation.ts"
import { useEffect, useState } from "react"

export function PersonalInfo() {
  const { data } = useGetUserInformation()
  const [previewImage, setPreviewImage] = useState<string>(data?.avatar || "")

  const updateProfile = useUpdateProfile()

  const form = useForm<ProfileFormValue>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: ""
    }
  })

  useEffect(() => {
    if (data?.name) {
      form.reset({ name: data.name })
    }
  }, [data, form])

  const handleSelect = (file: File) => {
    const previewURL = URL.createObjectURL(file)

    setPreviewImage(previewURL)
    form.setValue("avatarFile", file)
  }

  const onSubmit = (data: ProfileFormValue) => {
    updateProfile.mutate({
      name: data.name,
      avatarFile: data.avatarFile
    })
  }

  const handleReset = () => {
    form.reset()
    setPreviewImage(data?.avatar || "")
  }

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
                  <AvatarImage
                    alt={data?.name}
                    className="object-cover"
                    src={previewImage}
                  />
                  <AvatarFallback>{data?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <RHFDragAndDropFileUpload
                    acceptedFileTypes="image/png, image/jpg, image/gif, image/svg"
                    className="border-dashed"
                    iconClassName="rounded-full"
                    id="avatar"
                    multiple={false}
                    name="avatar"
                    previewSelectedFile={false}
                    supportFileTypesNote="SVG, PNG, JPG or GIF (max. 800x400px)"
                    onFileSelect={handleSelect}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-end space-x-3 mx-8 my-4">
              <Button type="button" variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <ButtonLoading
                disabled={!form.formState.isDirty || !form.formState.isValid}
                isLoading={updateProfile.isPending}
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save changes
              </ButtonLoading>
            </div>
          </div>
        </Form>
      </FormLayout>
    </div>
  )
}
