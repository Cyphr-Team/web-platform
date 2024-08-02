import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb.ts"
import { cn } from "@/lib/utils.ts"
import { UserDetailInfo } from "@/types/user.type.ts"
import {
  checkIsForesightAdmin,
  checkIsWorkspaceAdmin
} from "@/utils/check-roles.ts"
import { isLaunchKC } from "@/utils/domain.utils.ts"
import { PaginationState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"
import { DialogSendBulkInvite } from "./components/DialogSendBulkInvitation.tsx"
import { DialogSendInvite } from "./components/DialogSendInvitation"
import { TopNav } from "./components/molecules/TopNav.tsx"
import { useQueryGetListAllInstitution } from "./hooks/useQuery/useQueryGetListAllInstitution.ts"
import {
  FilterParams,
  useQueryListPaginateUser
} from "./hooks/useQuery/useQueryListPaginateUser"
import { columns } from "./table/columns"
import { UserTableHeader } from "./table/user-table-header.tsx"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs.tsx"

export function Component() {
  const breadcrumbs = useBreadcrumb()

  const [filterParams, setFilterParams] = useState<FilterParams>()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  const isForesightAdmin = checkIsForesightAdmin()
  const isWorkspaceAdmin = checkIsWorkspaceAdmin()

  const listInstitution = useQueryGetListAllInstitution({
    enabled: isForesightAdmin
  })

  const mapInstitutionNames = (user: UserDetailInfo) => {
    return {
      ...user,
      institutionName:
        listInstitution.data?.find(
          (institution) => institution.id === user.institutionId
        )?.name ?? "Unknown"
    }
  }

  const { data, isFetching } = useQueryListPaginateUser({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    ...filterParams
  })

  // Will be created only once initially
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

  const userDetailInfos: UserDetailInfo[] = data?.data ?? []

  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <TopNav />
      <div
        className={cn(
          "flex flex-auto items-end justify-end",
          isForesightAdmin && "justify-between"
        )}
      >
        {isForesightAdmin && <UserTableHeader onSearch={handleSearch} />}
        {isLaunchKC() && isWorkspaceAdmin ? (
          <DialogSendBulkInvite />
        ) : (
          <DialogSendInvite />
        )}
      </div>
      {/* TODO: Implement get users (include invited users) */}
      <DataTable
        columns={
          isForesightAdmin
            ? columns.filter((column) => {
                return column.accessorKey !== "edit"
              })
            : columns.filter((column) => {
                return column.accessorKey !== "institution"
              })
        }
        data={
          isForesightAdmin
            ? userDetailInfos.map(mapInstitutionNames)
            : userDetailInfos
        }
        total={data?.total ?? 0}
        pagination={pagination}
        isLoading={isFetching}
        setPagination={setPagination}
      />
    </div>
  )
}

Component.displayName = "UserPage"
