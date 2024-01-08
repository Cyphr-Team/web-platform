import { json, useLoaderData } from "react-router-dom"
import { Payment, columns } from "./components/table/columns"
import { DataTable } from "./components/table/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com"
    }
    // ...
  ]
}

export default async function ExampleTablePage() {}

export async function loader() {
  const data = await getData()

  return json(data)
}

export function Component() {
  const data = useLoaderData() as Payment[]

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

Component.displayName = "SampleLazyRoute"
