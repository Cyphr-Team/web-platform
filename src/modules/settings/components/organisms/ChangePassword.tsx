import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import { Form } from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator.tsx"
import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import RHFPasswordInput from "@/modules/form-template/components/molecules/RHFPasswordInput.tsx"
import {
  changePasswordFormSchema,
  type ChangePasswordFormValue,
  useChangePassword
} from "@/modules/settings/hooks/useChangePassword.ts"

export function ChangePassword() {
  const form = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const { isPending, mutate } = useChangePassword()

  const onSubmit = (data: ChangePasswordFormValue) => {
    mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      },
      {
        onSuccess: () => {
          handleReset()
        }
      }
    )
  }

  const handleReset = () => {
    form.reset()
  }

  return (
    <div className="flex gap-xl">
      <div className="text-sm w-[270px]">
        <p className="text-text-secondary font-medium">Password</p>
        <p className="text-text-tertiary">
          Please enter your current password to change your password.
        </p>
      </div>
      <FormLayout hideTopNavigation cardClassName="w-[650px] p-0">
        <Form {...form}>
          <div>
            <div className="grid gap-y-3xl px-8 py-6">
              <RHFPasswordInput
                label="Current password"
                name="currentPassword"
                placeholder="Current password"
                styleProps={{
                  messageClassName: "text-text-tertiary text-xs font-normal"
                }}
              />
              <RHFPasswordInput
                label="New password"
                name="newPassword"
                placeholder="New password"
                styleProps={{
                  messageClassName: "text-text-tertiary text-xs font-normal"
                }}
              />
              <RHFPasswordInput
                label="Confirm new password"
                name="confirmPassword"
                placeholder="Confirm new password"
                styleProps={{
                  messageClassName: "text-text-tertiary text-xs font-normal"
                }}
              />
            </div>
            <Separator />
            <div className="flex justify-end space-x-2 my-4 mx-8">
              <Button type="button" variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <ButtonLoading
                disabled={!form.formState.isValid}
                isLoading={isPending}
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
              >
                Update password
              </ButtonLoading>
            </div>
          </div>
        </Form>
      </FormLayout>
    </div>
  )
}
