import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import {
  type UserDetailInfo,
  UserRoles,
  type UserStatus
} from "@/types/user.type.ts"
import {
  type PaginationState,
  type RowSelectionState
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import DialogDeleteUser from "../../components/DialogDeleteUser.tsx"
import {
  useQueryListPaginateUser,
  UserFilterSchema,
  type UserFilterValues
} from "../../hooks/useQuery/useQueryListPaginateUser"
import { columns } from "./invitation-columns"
import { useQueryListPaginateInvitation } from "../../hooks/useQuery/useQueryListPaginateInvitation.ts"
import { type Invitation } from "@/types/invitation.type.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserTableHeader } from "@/modules/admin/user/table/loan-ready-v2/user-table-header.tsx"

const usePrefetchUsers = () => {
  const { data, isFetching } = useQueryListPaginateUser({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0,
    filter: {
      roles: [UserRoles.WORKSPACE_ADMIN, UserRoles.REVIEWER]
    }
  })

  return { total: data?.total ?? 0, isFetching }
}

export function Component() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  // Filter state
  const filterForm = useForm<UserFilterValues>({
    resolver: zodResolver(UserFilterSchema),
    defaultValues: {
      filter: {
        roles: [UserRoles.APPLICANT],
        statuses: [],
        accountTypes: []
      }
    }
  })

  const { total } = usePrefetchUsers()

  const { data: invitations, isFetching: isFetchingInvitations } =
    useQueryListPaginateInvitation({
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize
    })

  // BEGIN mock combine data
  const isEnoughData = isFetchingInvitations
    ? true
    : pagination.pageIndex * pagination.pageSize +
        (invitations?.data?.length ?? 0) <
      (invitations?.total ?? 0)
  const userLimit = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize -
      (invitations?.total ?? 0),
    REQUEST_LIMIT_PARAM
  )
  const userOffset = Math.max(
    0,
    pagination.pageIndex * pagination.pageSize - (invitations?.total ?? 0)
  )

  const { data: users } = useQueryListPaginateUser({
    limit: userLimit,
    offset: userOffset,
    filter: {
      roles: [UserRoles.WORKSPACE_ADMIN, UserRoles.REVIEWER]
    },
    enabled: !isEnoughData
  })

  const selectedUser = useMemo(() => {
    return users?.data.filter((user) => rowSelection[user.id]) ?? []
  }, [users, rowSelection])

  const combinedData: (UserDetailInfo & {
    invitation?: Invitation
  })[] = useMemo(() => {
    const invitationData = invitations?.data ?? []
    const userData = users?.data ?? []
    const data: UserDetailInfo[] = [
      ...invitationData.map((invitation) => ({
        ...invitation,
        name: "",
        email: invitation.recipientEmail,
        authProvider: "---",
        loggedInAt: "---",
        avatar: "",
        authId: "",
        createdAt: invitation.sentAt,
        status: invitation.status as UserStatus,
        invitation
      }))
    ]

    if (isEnoughData) {
      return data
    }

    data.push(...userData)

    return data
  }, [invitations?.data, users?.data, isEnoughData])

  const combineTotal = (total ?? 0) + (invitations?.total ?? 0)
  // END mock combine data

  const handleSearch = () => {
    // TODO: Implement search after fixing the combine data logic
  }

  const getRowId = (row: UserDetailInfo) => row.id

  return (
    <div className="mx-auto py-2">
      <DataTable
        columns={columns}
        data={combinedData}
        getRowId={getRowId}
        headerSearch={() =>
          UserTableHeader({
            description:
              "Manage your team members and their account permissions here.",
            filterForm: filterForm,
            title: "Team Members",
            totalUsers: combineTotal,
            totalSelectedUsers: selectedUser.length,
            onDelete: () => setOpenDeleteDialog(true),
            onSearch: handleSearch,
            allowInvite: true
          })
        }
        isLoading={isFetchingInvitations}
        pagination={pagination}
        rowSelection={rowSelection}
        setPagination={setPagination}
        setRowSelection={setRowSelection}
        tableCellClassName="bg-white"
        total={combineTotal}
      />

      <DialogDeleteUser
        listUser={selectedUser}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
    </div>
  )
}

Component.displayName = "TeamMembersPage"
