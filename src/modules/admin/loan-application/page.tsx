import { json, useLoaderData } from "react-router-dom"
import { LoanApplication, columns } from "./table/columns"
import { DataTable } from "@/components/ui/data-table"
import { LoanApplicationTableHeader } from "./table/header"

async function getData(): Promise<LoanApplication[]> {
  return [
    {
      username: "Olivia Rhye",
      email: "olivia@untitledui.com",
      loanProduct: "Revenue Share",
      loanAmount: "1000000",
      currency: "USD",
      status: "Flagged",
      progress: "30"
    },
    {
      username: "Latte Larry",
      email: "larry@borrower.com",
      loanProduct: "Microloan",
      loanAmount: "25000",
      currency: "USD",
      status: "Ready",
      progress: "100"
    },
    {
      username: "Phoenix Baker",
      email: "phoenix@untitledui.com",
      loanProduct: "Emergency",
      loanAmount: "5000",
      currency: "USD",
      status: "Closed",
      progress: "70"
    },
    {
      username: "Candice Wu",
      email: "candice@untitledui.com",
      loanProduct: "Credit Line",
      loanAmount: "75000",
      currency: "USD",
      status: "In Progress",
      progress: "80"
    }
  ]
}

export async function loader() {
  const data = await getData()

  return json(data)
}

export function Component() {
  const data = useLoaderData() as LoanApplication[]

  return (
    <div className="container mx-auto py-10">
      <LoanApplicationTableHeader />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

Component.displayName = "LoanApplication"
