import { json, useLoaderData } from "react-router-dom"
import { columns } from "./table/columns"
import { DataTable } from "@/components/ui/data-table"
import { CreateLoanProgramDialog } from "./components/create-loan-program-dialog"
import { LoanProgram } from "@/common/loan-program.type"

async function getData(): Promise<LoanProgram[]> {
  return [
    {
      id: "1",
      institutionId: "",
      name: "ARTcap - Microloans for Creatives",
      type: "Microloan",
      createdAt: ""
    },
    {
      id: "2",
      institutionId: "",
      name: "Micro Loan Program",
      type: "Microloan",
      createdAt: ""
    }
  ]
}

export default async function ExampleTablePage() {}

export async function loader() {
  const data = await getData()

  return json(data)
}

export function Component() {
  const data = useLoaderData() as LoanProgram[]

  return (
    <div className="container mx-auto py-10">
      <CreateLoanProgramDialog />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

Component.displayName = "SampleLazyRoute"
