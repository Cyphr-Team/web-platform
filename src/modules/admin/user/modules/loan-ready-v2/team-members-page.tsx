import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { FormFieldNames } from "@/modules/admin/user/table/loan-ready-v2/team-member-filter-search-bar.tsx"
import { type Option, SortOrder } from "@/types/common.type.ts"
import { type UserRoles, type UserDetailInfo } from "@/types/user.type.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type PaginationState,
  type RowSelectionState,
  type SortingState
} from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { type ChangeEvent, useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import DialogDeleteUser from "../../components/DialogDeleteUser.tsx"
import {
  useQueryListPaginateUser,
  UserFilterSchema,
  type UserFilterValues
} from "../../hooks/useQuery/useQueryListPaginateUser"
import { UserTableHeader } from "../../table/loan-ready-v2/team-member-table-header.tsx"
import { columns } from "./columns"

export function Component() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [searchField, setSearchField] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
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
      roles: mapOnly(
        filterForm.watch(FormFieldNames.Roles) as unknown as Option[]
      ) as UserRoles[],
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
        filterForm={filterForm}
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
      {/* TODO: Implement get users (include invited team members) */}

      <DataTable
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

Component.displayName = "TeamMembersPage"
