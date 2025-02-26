import { useGetUserInformation } from "@/hooks/useGetUserInformation.ts"
import { DeleteAccountDialog } from "@/modules/settings/components/molecules/delete-account-dialog.tsx"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

function DeleteAccount() {
  const { data, isLoading } = useGetUserInformation()

  return (
    <div className="flex gap-xl">
      <div className="text-sm w-[270px]">
        <p className="text-text-secondary font-medium">Delete account</p>
        <p className="text-text-tertiary">
          Permanently remove your account and all associated data
        </p>
      </div>
      <FormLayout hideTopNavigation cardClassName="w-[650px] p-0">
        <div className="grid gap-y-3xl px-8 py-6">
          <p className="text-sm font-normal">
            By deleting your data, all personal information and stored data will
            be permanently removed from our system. This action is irreversible
            and your account, preferences, and any linked services will be fully
            disconnected and deleted.
          </p>
          {!isLoading && data ? (
            <DeleteAccountDialog authProvider={data?.authProvider} />
          ) : null}
        </div>
      </FormLayout>
    </div>
  )
}

export default DeleteAccount
