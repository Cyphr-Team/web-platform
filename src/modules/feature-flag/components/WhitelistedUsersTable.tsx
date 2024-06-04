import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { PaginationState } from "@tanstack/react-table"
import { checkIsForesightAdmin } from "@/utils/check-roles.ts"
import { useState } from "react"
import { WhitelistedUser } from "@/types/user.type.ts"

import { useQueryGetListAllInstitution } from "@/modules/admin/user/hooks/useQuery/useQueryGetListAllInstitution.ts"
import { whitelistedUsersColumns } from "../constants/columns"
import { useQueryWhitelistedUsers } from "../hooks/useQuery/useQueryWhitelistedUsers"

export function Component() {
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

  return (
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
  )
}

Component.displayName = "WhitelistedUser"
