import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { DataTable } from "@/components/ui/data-table.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx"
import { Form } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Separator } from "@/components/ui/separator"
import { TOAST_MSG } from "@/constants/toastMsg.ts"
import { useQueryGetListAllInstitution } from "@/modules/admin/user/hooks/useQuery/useQueryGetListAllInstitution.ts"
import { useQueryGetUsersByIds } from "@/modules/admin/user/hooks/useQuery/useQueryGetUsersByIds.ts"
import { useQueryGetListUsersByInstitution } from "@/modules/admin/user/hooks/useQuery/useQueryGetListUsersByInstitution.ts"
import { useQueryWhitelistUsersByFeatureFlagId } from "@/modules/admin/user/hooks/useQuery/useQueryGetListWhitelistUsersByFeatureFlagId.ts"
import { AutoCompleteInstitution } from "@/modules/feature-flag/components/AutoCompleteInstitution.tsx"
import { AutoCompleteUserEmail } from "@/modules/feature-flag/components/AutoCompleteUserEmail.tsx"
import {
  type WhitelistFormValue,
  whitelistFormSchema
} from "@/modules/feature-flag/constants/form.ts"
import { useUpdateWhitelistUser } from "@/modules/feature-flag/hooks/useMutation/useUpdateWhitelistUser.ts"
import { columns } from "@/modules/feature-flag/table/columns.tsx"
import { type Option } from "@/types/common.type.ts"
import { type FeatureFlag } from "@/types/feature-flag.types.ts"
import { type UserDetailInfo } from "@/types/user.type.ts"
import { toastError } from "@/utils"
import { checkIsForesightAdmin } from "@/utils/check-roles.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import debounce from "lodash.debounce"
import { PlusCircle, Search, Send } from "lucide-react"
import React, { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"

interface Props {
  featureFlag: FeatureFlag
}

/**
 * Logic flow:
 * - Add new user to 'pendingUsers' state
 * - Add remove user to 'pendingRemoveUsers' state
 * - When submit the final Users should be = serverUsers + pendingUsers - pendingRemoveUsers
 */
export const DialogModifyWhitelistUsers: React.FC<Props> = ({
  featureFlag
}) => {
  const isForesightAdmin = checkIsForesightAdmin()
  const [open, setOpen] = useState(false)

  const form = useForm<WhitelistFormValue>({
    resolver: zodResolver(whitelistFormSchema),
    defaultValues: {
      institution: { value: "", label: "" },
      user: { value: "", label: "" }
    }
  })
  const customOnChangeInstitution = () => {
    form.setValue("user", { label: "", value: "" })
  }

  // All institutions for select
  const listInstitutionQuery = useQueryGetListAllInstitution({
    enabled: isForesightAdmin
  })
  const institutionOptions: Option[] =
    listInstitutionQuery.data?.map((institution) => ({
      label: institution.name,
      value: institution.id
    })) ?? []

  // All users in selected institution for select
  const { data: usersByInstitution } = useQueryGetListUsersByInstitution({
    institutionId: form.watch("institution.value")
  })
  const usersByInstitutionOptions: Option[] =
    usersByInstitution?.users.map((user) => ({
      label: user.email,
      value: user.id
    })) ?? []

  // Added users but haven't submitted yet
  const [pendingUsers, setPendingUsers] = useState<string[]>([])
  // Removed users but haven't submitted yet
  const [pendingRemoveUsers, setPendingRemoveUsers] = useState<string[]>([])

  // All Users in the feature flag whitelist but the API is only return userId
  const { data: userIds } = useQueryWhitelistUsersByFeatureFlagId(
    featureFlag.id
  )
  // Get details of users by their Ids (used for displaying in the table)
  const { data: fullUsersInFeatureFlagWhitelist, isFetching } =
    useQueryGetUsersByIds(userIds?.map((user) => user.userId) ?? [])
  // Get details for pendingUsers because the select data doesn't enough
  const {
    data: pendingAddUsersDetail,
    isFetching: isFetchingPendingAddUsersDetail
  } = useQueryGetUsersByIds(pendingUsers)

  const isDuplicateWhitelistUser = (addedUser: WhitelistFormValue) => {
    const isServerDataDuplicate = fullUsersInFeatureFlagWhitelist?.users?.some(
      (whitelistUser) =>
        addedUser.user.value === whitelistUser.id &&
        addedUser.institution.value === whitelistUser.institutionId
    )

    const isPendingDataDuplicate = pendingUsers.includes(addedUser.user.value)

    if (isPendingDataDuplicate || isServerDataDuplicate) {
      toastError({
        ...TOAST_MSG.whitelistUser.updateDuplicatedUser
      })

      return true
    }

    return false
  }

  const handleAddPendingUser = form.handleSubmit((addedUser) => {
    if (pendingRemoveUsers.includes(addedUser.user.value)) {
      setPendingRemoveUsers((preState) =>
        preState.filter(
          (pendingRemoveUser) => pendingRemoveUser !== addedUser.user.value
        )
      )

      return
    }

    if (isDuplicateWhitelistUser(addedUser)) return
    setPendingUsers((preState) => [...preState, addedUser.user.value])
    form.setValue("user", { value: "", label: "" })
  })

  const handleRemoveUserFromWhitelist = (userId: string) => {
    setPendingRemoveUsers((preState) => [...preState, userId])
  }

  const { mutate: mutateWhitelistUser, isPending } = useUpdateWhitelistUser()
  const handleUpdatePendingUsers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutateWhitelistUser(
      {
        whitelist: whitelistUsers.map((user) => user.id),
        featureFlagId: featureFlag.id
      },
      {
        onSuccess() {
          onOpenChange(false)
        }
      }
    )
  }

  const [searchQuery, setSearchQuery] = useState("")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchQuery(value)
    }, 300),
    []
  )

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
      setPendingUsers([])
      setPendingRemoveUsers([])
      setSearchQuery("")
    }
    setOpen(open)
  }

  // TODO: Refactor API to return institutionName
  const whitelistUsers = useMemo(
    () =>
      [
        ...(fullUsersInFeatureFlagWhitelist?.users ?? []),
        ...(pendingAddUsersDetail?.users ?? [])
      ]
        .map((user: UserDetailInfo) => ({
          ...user,
          institutionName:
            listInstitutionQuery.data?.find(
              (institution) => institution.id === user.institutionId
            )?.name ?? "Unknown",
          handleRemoveUserFromWhitelist
        }))
        .filter((user) => !pendingRemoveUsers.includes(user.id)),
    [
      fullUsersInFeatureFlagWhitelist?.users,
      listInstitutionQuery.data,
      pendingAddUsersDetail?.users,
      pendingRemoveUsers
    ]
  )

  const whitelistUsersFilterBySearch = whitelistUsers.filter((user) =>
    user.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
      >
        <Button className="z-10" type="button">
          <PlusCircle className="mr-1.5 text-sm" size={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90%] min-w-[90%] flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
          <DialogTitle>Whitelist Users</DialogTitle>
          <DialogDescription>Make changes to whitelist users</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-1 flex-col overflow-hidden p-4 pt-0 sm:p-6 sm:pt-0"
            onSubmit={handleUpdatePendingUsers}
          >
            <div className="flex flex-col items-start space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
              <div className="flex w-full gap-3 lg:flex-row">
                <AutoCompleteInstitution
                  className="w-full lg:w-1/2"
                  control={form.control}
                  customOnChange={customOnChangeInstitution}
                  emptyText="No results found"
                  error={
                    form.formState.errors.institution?.label?.message ??
                    form.formState.errors.institution?.value?.message
                  }
                  label="Institution"
                  name="institution"
                  options={institutionOptions}
                  value={form.watch("institution")}
                />
                <AutoCompleteUserEmail
                  className="w-full lg:w-1/2"
                  control={form.control}
                  emptyText="No results found"
                  error={
                    form.formState.errors.user?.label?.message ??
                    form.formState.errors.user?.value?.message
                  }
                  label="User"
                  name="user"
                  options={usersByInstitutionOptions}
                  value={form.watch("user")}
                />
              </div>
              <div className="self-end lg:self-start">
                <Button
                  className="lg:mt-8"
                  type="button"
                  onClick={handleAddPendingUser}
                >
                  Add to Whitelist
                </Button>
              </div>
            </div>
            <Separator className="-mx-8 mt-4 w-[200%]" />
            <div className="mt-4">
              <Input
                className="-mb-2 pl-9 md:w-[300px]"
                placeholder="Search by Institution"
                prefixIcon={<Search className="size-5 opacity-50" />}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <DataTable
              columns={columns.map((column) => ({
                ...column,
                handleRemoveUserFromWhitelist
              }))}
              data={whitelistUsersFilterBySearch ?? []}
              isLoading={isFetching ?? isFetchingPendingAddUsersDetail}
              tableContainerClassName="flex flex-col flex-1 overflow-auto"
              total={whitelistUsersFilterBySearch.length ?? 0}
            />
            <DialogFooter className="mt-4">
              <ButtonLoading
                type="submit"
                isLoading={isPending}
                // Only able to submit if we have changes
                disabled={!pendingUsers.length && !pendingRemoveUsers.length}
              >
                Submit {!isPending && <Send className="ml-1.5" size="16" />}
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
