import { json, useLoaderData } from "react-router-dom"
import { User, columns } from "./table/columns"
import { DataTable } from "@/components/ui/data-table"
import { DialogSendInvite } from "./components/DialogSendInvitation"
import { UserRoles } from "@/types/user.type"

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

  return (
    <div className="container mx-auto py-10">
      <DialogSendInvite />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

Component.displayName = "SampleLazyRoute"
