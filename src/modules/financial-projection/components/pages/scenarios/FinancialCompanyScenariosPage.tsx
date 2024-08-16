import { FC, useCallback, useMemo, useState } from "react"
import { FinancialScenario } from "@/modules/financial-projection/types"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button.tsx"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { APP_PATH } from "@/constants"
import useRouter from "@/hooks/useRouter.ts"
import { CreateScenarioModal } from "../../molecules/scenarios/CreateScenariosModal"

const FAKE_DATA = [
  {
    id: "1",
    name: "Company A",
    financialCompanyId: "1"
  },
  {
    id: "2",
    name: "Company B",
    financialCompanyId: "2"
  },
  {
    id: "3",
    name: "Company C",
    financialCompanyId: "3"
  }
]
const FinancialCompanyScenariosPage: FC = () => {
  const { replace } = useRouter()
  const [detailId, setDetailId] = useState<string>("")

  const onClickScenario = useCallback(
    (scenarioId: string) => () => {
      replace(APP_PATH.LOAN_APPLICATION.FINANCIAL.details(scenarioId))
    },
    [replace]
  )

  const columns: ColumnDef<FinancialScenario>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Scenario",
        size: 100,
        cell: ({ row }) => {
          return <div className="text-left">{row.original.name}</div>
        },
        enableSorting: true
      },
      {
        id: "action",
        header: "",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col items-end">
              <Button
                variant="ghost"
                onClick={onClickScenario(row.original.id)}
              >
                Detail <ArrowRight className="ml-2" />
              </Button>
            </div>
          )
        }
      }
    ],
    [onClickScenario]
  )

  const goBack = useCallback(() => {
    replace(APP_PATH.LOAN_APPLICATION.FINANCIAL.index)
  }, [replace])

  return (
    <div className="w-full flex flex-col p-4xl">
      <div>
        <Button variant="ghost" onClick={goBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
      </div>
      <div className="flex w-full justify-center mt-4">
        <div className="flex flex-col gap-2 w-full max-w-screen-md">
          {/* TODO: UPDATE WITH REAL DATA FROM API */}
          <h5 className="text-lg font-semibold text-left">Company</h5>
          <div className="flex justify-between items-center">
            <h5 className="text-base font-semibold text-left">
              Forecast Scenarios
            </h5>
            <CreateScenarioModal setDetailId={setDetailId} id={detailId} />
          </div>
          <DataTable
            columns={columns}
            data={FAKE_DATA}
            total={FAKE_DATA.length}
          />
        </div>
      </div>
    </div>
  )
}

export default FinancialCompanyScenariosPage
