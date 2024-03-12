import { json, useLoaderData } from "react-router-dom"
import { User, columns } from "./table/columns"
import { DataTable } from "@/components/ui/data-table"
import { DialogSendInvite } from "./components/DialogSendInvitation"
import { UserRoles } from "@/types/user.type"
import { useState } from "react"
import { PaginationState } from "@tanstack/react-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"

async function getData(): Promise<User[]> {
  return [
    {
      id: "728ed52f",
      username: "admin@tryforesight.io",
      roles: [UserRoles.FORESIGHT_ADMIN]
    }
  ]
}

export default async function ExampleTablePage() {}

export async function loader() {
  const data = await getData()

  return json(data)
}

export function Component() {
  const data = useLoaderData() as User[]

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  return (
    <div className="container mx-auto py-10">
      <DialogSendInvite />
      <DataTable
        columns={columns}
        data={data}
        total={1}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

Component.displayName = "SampleLazyRoute"
