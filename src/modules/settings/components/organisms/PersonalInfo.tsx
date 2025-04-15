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
  type UpdateProfileFormValue,
  useUpdateProfile
} from "@/modules/settings/hooks/useUpdateProfile.ts"
import { useState, useEffect } from "react"
import { toastError } from "@/utils"
import React from "react"
import { useGetUserInformation } from "@/hooks/useGetUserInformation.ts"

export function PersonalInfo() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const { mutateAsync, isPending } = useUpdateProfile()
  const { data: userData, isLoading: isLoadingUser } = useGetUserInformation()

  const form = useForm<UpdateProfileFormValue>({
    resolver: zodResolver(updateProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      avatar: undefined
    }
  })

  // Cargar datos del usuario cuando estén disponibles
  useEffect(() => {
    if (userData && !isLoadingUser) {
      form.reset({
        name: userData.name || "",
        avatar: userData.avatar || undefined
      })

      if (userData.avatar) {
        setAvatarPreview(userData.avatar)
      }
    }
  }, [userData, isLoadingUser, form])

  const watchAvatar = form.watch("avatar")

  // Actualizar la vista previa cuando cambia el avatar
  React.useEffect(() => {
    if (watchAvatar instanceof File) {
      const url = URL.createObjectURL(watchAvatar)

      setAvatarPreview(url)

      return () => URL.revokeObjectURL(url)
    } else if (
      Array.isArray(watchAvatar) &&
      watchAvatar.length > 0 &&
      watchAvatar[0] instanceof File
    ) {
      const url = URL.createObjectURL(watchAvatar[0])

      setAvatarPreview(url)

      return () => URL.revokeObjectURL(url)
    }
  }, [watchAvatar])

  const onSubmit = async (data: UpdateProfileFormValue) => {
    try {
      await mutateAsync(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      toastError({
        title: "Error",
        description:
          "There was a problem updating your profile. Please try again."
      })
    }
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="grid gap-x-4xl gap-y-3xl px-8 py-6">
                <RHFTextInput
                  label="Display name"
                  name="name"
                  placeholder="Display name"
                />
                <div className="flex gap-4">
                  <Avatar className="size-16 rounded-full border">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} />
                    ) : (
                      <>
                        <AvatarImage />
                        <AvatarFallback />
                      </>
                    )}
                  </Avatar>
                  <div className="w-full">
                    <RHFDragAndDropFileUpload
                      accept="image/*"
                      className="border-dashed"
                      iconClassName="rounded-full"
                      id="avatar"
                      multiple={false}
                      name="avatar"
                      supportFileTypesNote="SVG, PNG, JPG or GIF (max. 800x400px)"
                      version={3}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end space-x-3 mx-8 my-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset({
                      name: userData?.name || "",
                      avatar: userData?.avatar || undefined
                    })
                    setAvatarPreview(userData?.avatar || null)
                  }}
                >
                  Cancel
                </Button>
                <ButtonLoading
                  disabled={isLoadingUser}
                  isLoading={isPending || isLoadingUser}
                  type="submit"
                >
                  Save changes
                </ButtonLoading>
              </div>
            </div>
          </form>
        </Form>
      </FormLayout>
    </div>
  )
}
