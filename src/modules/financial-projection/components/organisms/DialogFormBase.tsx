import { Button } from "@/components/ui/button.tsx"
import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx"
import RHFProvider from "@/modules/form-template/providers/RHFProvider.tsx"
import { cn } from "@/lib/utils.ts"
import {
  Block,
  renderBlockComponents
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import ActionCell from "@/modules/financial-projection/components/molecules/ActionCell.tsx"
import { DataTable } from "@/components/ui/data-table.tsx"

const enum DIALOG_MODE {
  ADD = "add",
  EDIT = "edit"
}

export interface DialogFormBaseProps<TData> {
  modelName: string
  data: TData[]
  columns: ColumnDef<TData>[]

  form: UseFormReturn
  blocks: Block[]
  onAdd: (data: TData) => void
  onEdit: (data: TData) => void
  onDelete: (data: TData) => void

  onNextStep: VoidFunction
}

const DialogFormBase = <TData,>(props: DialogFormBaseProps<TData>) => {
  const {
    data,
    columns,
    modelName,
    form,
    blocks,
    onAdd,
    onDelete,
    onEdit,
    onNextStep
  } = props

  const [dialog, setDialog] = useState<DIALOG_MODE | undefined>(undefined)

  const setCurrentDialog = useCallback(
    // if the target is undefined, no dialog will show
    (target?: DIALOG_MODE) => () => {
      setDialog(target)
    },
    []
  )

  const handleOpenChange = useCallback(
    (dialog: DIALOG_MODE) => (open: boolean) => {
      setDialog(open ? dialog : undefined)
    },
    []
  )

  const handleAdd = useCallback(
    (values: FieldValues) => {
      onAdd(values as TData)
      setDialog(undefined)
    },
    [onAdd]
  )

  const handleClickAdd = useCallback(() => {
    form.reset(undefined)
    setDialog(DIALOG_MODE.ADD)
  }, [form])

  const handleEdit = useCallback(
    (values: FieldValues) => {
      onEdit(values as TData)
      setDialog(undefined)
    },
    [onEdit]
  )

  const columnsWithAction: ColumnDef<TData>[] = useMemo(
    () => [
      ...columns,
      {
        id: "action",
        header: "",
        cell: ({ row }) => {
          const handleEdit = () => {
            form.reset(row.original as FieldValues)
            setDialog(DIALOG_MODE.EDIT)
          }
          const handleDelete = () => {
            onDelete(row.original as TData)
          }
          return (
            <div className="w-full flex flex-row justify-end">
              <ActionCell onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          )
        },
        size: 10
      }
    ],
    [columns, form, onDelete]
  )

  const renderDialog = useCallback(
    (
      dialogType: DIALOG_MODE,
      onConfirm: (values: FieldValues) => void,
      confirmText: string,
      title: string
    ) => (
      <Dialog
        form={form}
        blocks={blocks}
        onConfirm={onConfirm}
        open={dialog === dialogType}
        confirmText={confirmText}
        title={`${title} ${modelName}`}
        onOpenChange={handleOpenChange(dialogType)}
        onAbort={setCurrentDialog(undefined)}
      />
    ),
    [blocks, dialog, form, handleOpenChange, modelName, setCurrentDialog]
  )

  return (
    <div className="w-full flex flex-col items-center p-2">
      <div className="p-2 px-10 max-w-6xl overflow-x-auto">
        <DataTable
          columns={columnsWithAction}
          data={data}
          total={data.length}
          tableCellClassName="whitespace-nowrap"
          tableHeaderClassName="whitespace-nowrap"
        />
      </div>
      <div className="self-end flex flex-row gap-4 m-8">
        <Button className="w-56" variant="outline" onClick={handleClickAdd}>
          + Add new {modelName}
        </Button>
        <Button className="w-56" onClick={onNextStep}>
          Next
        </Button>
      </div>
      {renderDialog(DIALOG_MODE.ADD, handleAdd, "Add", "Add")}
      {renderDialog(DIALOG_MODE.EDIT, handleEdit, "Edit", "Edit")}
    </div>
  )
}

export default DialogFormBase

interface DialogProps {
  title: string
  confirmText: string

  open: boolean
  onOpenChange: (open: boolean) => void

  form: UseFormReturn
  blocks: Block[]
  onAbort: VoidFunction
  onConfirm: (formValues: FieldValues) => void
}

const Dialog = (props: DialogProps) => {
  const {
    title,
    open,
    onOpenChange,
    form,
    onConfirm,
    blocks,
    onAbort,
    confirmText
  } = props

  const onSubmit = useCallback(
    (formValues: FieldValues) => {
      onConfirm(formValues)
      form.reset()
    },
    [form, onConfirm]
  )

  const handleAbort = useCallback(() => {
    form.reset()
    onAbort()
  }, [form, onAbort])

  // use AlertDialog to prevent close dialog when user click outside the dialog
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[40rem] max-w-[40rem] max-h-[60vh] overflow-y-auto">
        <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl mb-2">
              {title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className={cn("grid grid-cols-12 gap-4")}>
            {renderBlockComponents(blocks)}
          </div>
          <AlertDialogFooter className="mt-8">
            <AlertDialogCancel type="reset" onClick={handleAbort}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="w-20"
              disabled={!form.formState.isValid}
            >
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </RHFProvider>
      </AlertDialogContent>
    </AlertDialog>
  )
}
