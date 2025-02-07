import { Button } from "@/components/ui/button.tsx"
import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { type UserDetailInfo, UserRoles } from "@/types/user.type.ts"
import {
  type PaginationState,
  type RowSelectionState
} from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { useMemo, useState } from "react"
import DialogDeleteUser from "../../components/DialogDeleteUser.tsx"
import { useQueryListPaginateUser } from "../../hooks/useQuery/useQueryListPaginateUser"
import { columns } from "./columns"
import DrawerInviteUser from "./DrawerInviteUser.tsx"

export function Component() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { data, isFetching } = useQueryListPaginateUser({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    filter: {
      roles: [UserRoles.WORKSPACE_ADMIN, UserRoles.REVIEWER]
    }
  })

  const selectedUser = useMemo(() => {
    return data?.data.filter((user) => rowSelection[user.id]) ?? []
  }, [data, rowSelection])

  const userDetailInfos: UserDetailInfo[] = data?.data ?? []
  const getRowId = (row: UserDetailInfo) => row.id

  return (
    <div className="mx-auto py-2">
      {/* TODO: Implement get users (include invited team members) */}

      <DataTable
        columns={columns}
        data={userDetailInfos}
        getRowId={getRowId}
        headerSearch={() => (
          <div className="bg-[#F9FAFB] px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-24">
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="mb-1 text-lg font-semibold text-center">
                  Team Members
                </h3>

                <div className="text-xs py-0.5 px-2 bg-[#F2F8F8] w-max text-center rounded-lg">
                  {data?.total} users
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Manage your team members and their account permissions here.
              </p>
            </div>

            <div className="flex">
              {selectedUser.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  <Trash size={14} /> &nbsp; Delete
                </Button>
              )}

              <DrawerInviteUser />
            </div>
          </div>
        )}
        isLoading={isFetching}
        pagination={pagination}
        rowSelection={rowSelection}
        setPagination={setPagination}
        setRowSelection={setRowSelection}
        tableCellClassName="bg-white"
        total={data?.total ?? 0}
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
