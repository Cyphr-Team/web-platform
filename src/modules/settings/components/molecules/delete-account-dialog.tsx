import { CustomAlertDialog } from "@/shared/molecules/AlertDialog"
import React, { useEffect } from "react"
import { RHFProvider } from "@/modules/form-template/providers"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import {
  type ConfirmDeleteWithPasswordFormValue,
  useConfirmUserDeletionWithPassword
} from "@/modules/settings/hooks/useConfirmUserDeletion.ts"
import { Button } from "@/components/ui/button.tsx"
import { useBoolean } from "@/hooks"
import PasswordConfirmationForm from "@/modules/settings/components/molecules/password-confirmation-form.tsx"
import { VerifyWithGoogleForm } from "@/modules/settings/components/molecules/google-confirmation-form.tsx"
import {
  useDeleteUser,
  useDeleteGoogleLinkedAccount
} from "@/modules/settings/hooks/useDeleteUser.ts"
import { UserAuthProvider } from "@/modules/settings/constants"
import { Separator } from "@/components/ui/separator.tsx"

interface Props {
  authProvider: string
}

export const DeleteAccountDialog: React.FC<Props> = ({ authProvider }) => {
  const isGoogleAccount = authProvider === UserAuthProvider.GOOGLE
  // State control for the dialog
  const isDialogOpen = useBoolean(false)
  // State control for "Delete account" in the dialog
  const isEligibleToDelete = useBoolean(false)

  // Controls to Delete Account
  const {
    mutateAsync: mutateDeleteAccount,
    isPending: isPendingToDeleteNormal
  } = useDeleteUser()

  const {
    mutateAsync: mutateDeleteGoogleLinkedAccount,
    isPending: isPendingToDeleteGoogleLinkedAccount
  } = useDeleteGoogleLinkedAccount()

  // Controls for Verify with Password flow
  const { mutate: mutateConfirmWithPassword, isPending: isPendingToConfirm } =
    useConfirmUserDeletionWithPassword()
  const method = useForm<ConfirmDeleteWithPasswordFormValue>({
    mode: "onBlur",
    defaultValues: {
      inputPassword: ""
    }
  })
  const isPendingToDelete =
    isPendingToDeleteNormal || isPendingToDeleteGoogleLinkedAccount

  useEffect(() => {
    if (!isGoogleAccount) {
      isEligibleToDelete.setValue(method.formState.isValid)
    }
  }, [isEligibleToDelete, isGoogleAccount, method.formState.isValid])

  // Handle permanent delete action
  const handleVerify = async () => {
    if (!isEligibleToDelete.value || isPendingToDelete || isPendingToConfirm)
      return
    if (isGoogleAccount) {
      await mutateDeleteGoogleLinkedAccount()
      isDialogOpen.onFalse()
    } else {
      mutateConfirmWithPassword(
        {
          inputPassword: method.watch("inputPassword")
        },
        {
          async onSuccess() {
            await mutateDeleteAccount()
            isDialogOpen.onFalse()
          }
        }
      )
    }
  }

  return (
    <CustomAlertDialog
      actionClassName={cn(
        "bg-red-500 text-white hover:bg-red-900",
        isEligibleToDelete.value && !isPendingToDelete && !isPendingToConfirm
          ? ""
          : "cursor-not-allowed opacity-50"
      )}
      cancelText="Cancel"
      confirmText="Delete account"
      description={
        <RHFProvider methods={method}>
          <div className="static flex flex-col space-y-3 mb-12 text-[#252828]">
            <p>Are you sure you want to permanently delete your data?</p>
            <p>
              This action cannot be undone. All personal information, stored
              data, and linked services will be removed from our system, and any
              ongoing processes or reviews may be impacted.
            </p>
            {isGoogleAccount ? (
              <VerifyWithGoogleForm onSuccess={isEligibleToDelete.onTrue} />
            ) : (
              <PasswordConfirmationForm />
            )}
          </div>
          <Separator className="absolute -mx-6" />
        </RHFProvider>
      }
      isOpen={isDialogOpen.value}
      title="You’re about to delete your account"
      onCanceled={() => {
        isDialogOpen.onFalse()
      }}
      onConfirmed={handleVerify}
    >
      <Button
        className="border-red-500 hover:border-red-600 bg-white text-red-500 hover:text-red-600 w-fit"
        variant="outline"
        onClick={() => {
          isDialogOpen.onTrue()
        }}
      >
        Delete account
      </Button>
    </CustomAlertDialog>
  )
}
