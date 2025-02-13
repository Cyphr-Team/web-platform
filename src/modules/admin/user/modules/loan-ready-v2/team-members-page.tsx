import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { type Option } from "@/types/common.type"
import { SortOrder } from "@/types/common.type.ts"
import { UserRoles, type UserDetailInfo } from "@/types/user.type.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type PaginationState,
  type RowSelectionState,
  type SortingState
} from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { useCallback, useMemo, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form"
import DialogDeleteUser from "../../components/DialogDeleteUser.tsx"
import {
  useQueryListPaginateUser,
  UserFilterSchema,
  type UserFilterValues
} from "../../hooks/useQuery/useQueryListPaginateUser"
import { FormFieldNames } from "../../table/loan-ready-v2/team-member-filter-search-bar.tsx"
import { UserTableHeader } from "../../table/loan-ready-v2/user-table-header.tsx"

import { columns } from "./invitation-columns"

const ALLOWED_ROLES = [UserRoles.WORKSPACE_ADMIN, UserRoles.VIEWER]


export function Component() {
  const [searchField, setSearchField] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const filterForm = useForm<UserFilterValues>({
    resolver: zodResolver(UserFilterSchema),
    defaultValues: {
      filter: {
        roles: [],
        statuses: [],
        accountTypes: []
      }
    }
  })

  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTableToFirstPage()
    },
    400
  )

  const getFilter = useCallback(() => {
    const mapOnly = (options?: Option[]) => options?.map((item) => item.value)

    return {
      roles:
        (mapOnly(
          filterForm.watch(FormFieldNames.Roles) as unknown as Option[]
        ) as UserRoles[]) ?? [],
      statuses: mapOnly(filterForm.watch(FormFieldNames.Statuses)),
      accountTypes: mapOnly(filterForm.watch(FormFieldNames.Accounts))
    }
  }, [filterForm])

  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc ? SortOrder.DESC : SortOrder.ASC
    }
  }, [sorting])

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const { data: users, isFetching } = useQueryListPaginateUser({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    filter: {
      ...getFilter(),
      roles:
        getFilter()?.roles?.length === 0 ? ALLOWED_ROLES : getFilter().roles
    },
    sort: getSort(),
    searchFieldByNameAndEmail: searchField
  })

  const selectedUser = useMemo(() => {
    return users?.data.filter((user) => rowSelection[user.id]) ?? []
  }, [users, rowSelection])

  const getRowId = (row: UserDetailInfo) => row.id

  const renderUserTableHeader = useMemo(
    () => (
      <UserTableHeader
        allowInvite
        description="Manage your team members and their account permissions here."
        filterForm={filterForm}
        title="Team Members"
        totalSelectedUsers={selectedUser.length}
        totalUsers={users?.total ?? 0}
        onDelete={() => setOpenDeleteDialog(true)}
        onSearch={handleSearch}
      />
    ),
    [filterForm, handleSearch, selectedUser.length, users?.total]
  )

  return (
    <div className="mx-auto py-2">
      <DataTable
        manualSorting
        columns={columns}
        data={users?.data ?? []}
        getRowId={getRowId}
        headerSearch={() => renderUserTableHeader}
        isLoading={isFetching}
        pagination={pagination}
        rowSelection={rowSelection}
        setPagination={setPagination}
        setRowSelection={setRowSelection}
        setSorting={setSorting}
        sorting={sorting}
        tableCellClassName="bg-white"
        total={users?.total ?? 0}
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
