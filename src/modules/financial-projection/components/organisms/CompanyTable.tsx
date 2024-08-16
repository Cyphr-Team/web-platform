import { FC, useCallback, useMemo } from "react"
import { FinancialCompany } from "@/modules/financial-projection/types"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button.tsx"
import { ArrowRight } from "lucide-react"
import { APP_PATH } from "@/constants"
import useRouter from "@/hooks/useRouter.ts"

interface Props {
  data: FinancialCompany[]
}

const CompanyTable: FC<Props> = ({ data }) => {
  const { replace } = useRouter()

  const onClickCompany = useCallback(
    (companyId: string) => () => {
      replace(
        APP_PATH.LOAN_APPLICATION.FINANCIAL.company.scenarios.list(companyId)
      )
    },
    [replace]
  )

  const columns: ColumnDef<FinancialCompany>[] = useMemo(
    () => [
      {
        id: "companyName",
        accessorKey: "companyName",
        header: "Company Name",
        size: 100,
        cell: ({ row }) => {
          return <div className="text-left">{row.original.companyName}</div>
        },
        enableSorting: true
      },
      {
        id: "action",
        header: "",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col items-end">
              <Button variant="ghost" onClick={onClickCompany(row.original.id)}>
                Continue <ArrowRight className="ml-2" />
              </Button>
            </div>
          )
        }
      }
    ],
    [onClickCompany]
  )

  return <DataTable columns={columns} data={data} total={data.length} />
}

export default CompanyTable
