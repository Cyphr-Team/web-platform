import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { WhitelistedUser } from "@/types/user.type"
import { useQueryWhitelistedUsers } from "../hooks/useQuery/useQueryWhitelistedUsers"
import { useQueryGetListAllInstitution } from "@/modules/admin/user/hooks/useQuery/useQueryGetListAllInstitution"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import { PaginationState } from "@tanstack/react-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useCallback, useState } from "react"
import { whitelistedUsersColumns } from "../constants/columns"
import { DataTable } from "@/components/ui/data-table"
import { UserTableHeader } from "@/modules/admin/user/table/user-table-header"
import { DialogAddWhitelistedUser } from "../components/AddWhitelistedUserModal"
import { FilterParams } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateUser"
import debounce from "lodash.debounce"

export function Component() {
  const crumbs = useBreadcrumb()
  const [filterParams, setFilterParams] = useState<FilterParams>()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  const isForesightAdmin = checkIsForesightAdmin()

  const listInstitution = useQueryGetListAllInstitution({
    enabled: isForesightAdmin
  })

  const mapInstitutionNames = (user: WhitelistedUser) => {
    return {
      ...user,
      institutionName:
        listInstitution.data?.find(
          (institution) => institution.id === user.institutionId
        )?.name ?? "Unknown"
    }
  }

  const { data, isFetching } = useQueryWhitelistedUsers({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  const whitelistedUsers: WhitelistedUser[] = data?.data ?? []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((formValues: FilterParams) => {
      setPagination((preState) => ({
        ...preState,
        pageIndex: 0
      }))
      setFilterParams(formValues)
    }, 400),
    []
  )

  console.log("whitelistedUsers", filterParams)

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="mb-3xl">
        <Breadcrumbs breads={crumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Whitelisted users</h1>
      <div
        className={cn(
          "flex flex-auto items-end justify-end",
          isForesightAdmin && "justify-between"
        )}
      >
        {isForesightAdmin && <UserTableHeader onSearch={handleSearch} />}
        <DialogAddWhitelistedUser />
      </div>
      <div className="mx-auto p-6 pt-6 md:p-8">
        <DataTable
          columns={whitelistedUsersColumns}
          data={whitelistedUsers.map(mapInstitutionNames)}
          total={0}
          pagination={pagination}
          isLoading={isFetching}
          setPagination={setPagination}
        />
      </div>
    </div>
  )
}
