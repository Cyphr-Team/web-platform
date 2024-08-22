import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"
import { Button } from "@/components/ui/button.tsx"
import { DataTable } from "@/components/ui/data-table.tsx"
import { ColumnDef } from "@tanstack/react-table"
import { DirectCost } from "@/modules/financial-projection/types"
import { useCallback, useMemo, useState } from "react"
import ActionCell from "@/modules/financial-projection/components/molecules/ActionCell.tsx"
import DirectCostDialog from "@/modules/financial-projection/components/molecules/DirectCostDialog.tsx"
import { SCREEN } from "@/modules/financial-projection/constants"
import { FieldValues } from "react-hook-form"
import { Progress } from "@/components/ui/progress.tsx"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MM_YYYY } from "@/constants/date.constants.ts"

const enum DIALOG {
  ADD = "add",
  EDIT = "edit"
}

const DirectCostForm = () => {
  const directCosts = useFinancialToolkitStore.use.directCosts()
  const { setDirectCost, setCurrentScreen } =
    useFinancialToolkitStore.use.action()

  const addDirectCost = useCallback(
    (directCost: DirectCost) => {
      setDirectCost([...directCosts, directCost])
    },
    [directCosts, setDirectCost]
  )

  const editDirectCost = useCallback(
    (directCost: DirectCost) => {
      const idx = directCosts.findIndex((value) => value.id === directCost.id)
      directCosts[idx] = directCost
      setDirectCost([...directCosts])
    },
    [directCosts, setDirectCost]
  )

  const [dialog, setDialog] = useState<DIALOG>()

  const [selectedValue, setSelectedValue] = useState<DirectCost | undefined>()

  const setDialogFactory = useCallback(
    (target?: DIALOG) => () => {
      setDialog(target)
    },
    []
  )

  const handleOpenChange = useCallback(
    (dialog: DIALOG) => (open: boolean) => {
      setDialog(open ? dialog : undefined)
    },
    []
  )

  const onAdd = useCallback(
    (values: FieldValues) => {
      addDirectCost(values as DirectCost)
      setDialog(undefined)
    },
    [addDirectCost]
  )

  const onEdit = useCallback(
    (values: FieldValues) => {
      editDirectCost(values as DirectCost)
      setDialog(undefined)
    },
    [editDirectCost]
  )

  const columns: ColumnDef<DirectCost>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Direct cost",
        size: 100,
        cell: ({ row }) => {
          return <div className="text-left">{row.original.name}</div>
        }
      },
      {
        id: "percentageCost",
        accessorKey: "percentageCost",
        header: "Percentage cost",
        cell: ({ row }) => {
          return (
            <div className="flex flex-row items-center gap-2 w-full">
              <Progress value={row.original.percentageCost} />
              <div>{row.original.percentageCost}%</div>
            </div>
          )
        }
      },
      {
        id: "startingMonth",
        accessorKey: "startingMonth",
        header: "Starting month",
        cell: ({ row }) => (
          <div className="text-left">
            {formatDate(row.original.startingMonth, FORMAT_DATE_MM_YYYY)}
          </div>
        )
      },
      {
        id: "action",
        header: "",
        cell: ({ row }) => {
          const onEdit = () => {
            setSelectedValue(row.original)
            setDialog(DIALOG.EDIT)
          }
          const onDelete = () => {
            setDirectCost(
              directCosts.filter((value) => value.name !== row.original.name)
            )
          }
          return (
            <div className="w-full flex flex-row justify-end">
              <ActionCell onEdit={onEdit} onDelete={onDelete} />
            </div>
          )
        },
        size: 10
      }
    ],
    [directCosts, setDirectCost]
  )

  return (
    <>
      <div className="w-full flex flex-col items-center p-2">
        <div className="p-2 px-10 w-full overflow-y-auto">
          <DataTable
            columns={columns}
            data={directCosts}
            total={directCosts.length}
          />
        </div>
        <div className="self-end flex flex-row gap-4 m-8">
          <Button
            className="w-56"
            variant="outline"
            onClick={setDialogFactory(DIALOG.ADD)}
          >
            + Add new direct cost
          </Button>
          <Button
            className="w-56"
            // TODO: handle screen using custom hooks
            onClick={() => setCurrentScreen(SCREEN.INPUT_UNIT_SALES)}
          >
            Next
          </Button>
        </div>
      </div>

      <DirectCostDialog
        open={dialog === DIALOG.ADD}
        confirmText="Add"
        title="Add direct cost"
        onOpenChange={handleOpenChange(DIALOG.ADD)}
        onConfirm={onAdd}
        onAbort={setDialogFactory(undefined)}
      />
      <DirectCostDialog
        open={dialog === DIALOG.EDIT}
        title="Edit direct cost"
        confirmText="Edit"
        onOpenChange={handleOpenChange(DIALOG.EDIT)}
        onConfirm={onEdit}
        onAbort={setDialogFactory(undefined)}
        defaultValues={selectedValue}
      />
    </>
  )
}

export default DirectCostForm
