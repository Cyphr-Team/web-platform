import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { type UserDetailInfo, UserRoles } from "@/types/user.type.ts"
import {
  type PaginationState,
  type RowSelectionState,
  type SortingState
} from "@tanstack/react-table"
import { type ChangeEvent, useCallback, useMemo, useState } from "react"
import DialogDeleteUser from "../../components/DialogDeleteUser.tsx"
import {
  useQueryListPaginateUser,
  UserFilterSchema,
  type UserFilterValues
} from "../../hooks/useQuery/useQueryListPaginateUser"
import { columns } from "./columns"
import { UserTableHeader } from "@/modules/admin/user/table/loan-ready-v2/user-table-header.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Option, SortOrder } from "@/types/common.type.ts"
import { FormFieldNames } from "@/modules/admin/user/table/loan-ready-v2/user-filter-search-bar.tsx"
import { debounce } from "lodash"

export function Component() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  // Pagination state
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

  const getFilter = useCallback(() => {
    const mapOnly = (options?: Option[]) => options?.map((item) => item.value)

    return {
      roles: [UserRoles.APPLICANT],
      statuses: mapOnly(filterForm.watch(FormFieldNames.Statuses)),
      accountTypes: mapOnly(filterForm.watch(FormFieldNames.Accounts))
    }
  }, [filterForm])

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc ? SortOrder.DESC : SortOrder.ASC
    }
  }, [sorting])

  // Search state
  const [searchField, setSearchField] = useState("")
  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTableToFirstPage()
    },
    400
  )

  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  const { data, isFetching } = useQueryListPaginateUser({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    filter: getFilter(),
    sort: getSort(),
    searchFieldByNameAndEmail: searchField
  })

  const selectedUser = useMemo(() => {
    return data?.data.filter((user) => rowSelection[user.id]) ?? []
  }, [data, rowSelection])

  const userDetailInfos: UserDetailInfo[] = data?.data ?? []
  const getRowId = (row: UserDetailInfo) => row.id

  const renderUserTableHeader = useMemo(
    () => (
      <UserTableHeader
        description="Manage your platform users and their account permissions here."
        filterForm={filterForm}
        title="Users"
        totalSelectedUsers={selectedUser.length}
        totalUsers={data?.total ?? 0}
        onDelete={() => setOpenDeleteDialog(true)}
        onSearch={handleSearch}
      />
    ),
    [data?.total, filterForm, handleSearch, selectedUser]
  )

  return (
    <div className="mx-auto py-2">
      <DataTable
        manualSorting
        columns={columns}
        data={userDetailInfos}
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

Component.displayName = "UserPage"
