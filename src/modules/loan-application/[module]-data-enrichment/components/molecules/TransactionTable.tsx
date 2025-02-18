/* eslint-disable react/no-unstable-nested-components */
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type GroupingState,
  type SortingState,
  useReactTable
} from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx"
import { Icons } from "@/modules/loan-application/components/atoms/icon.tsx"
import _, { startCase } from "lodash"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { type PlaidTransaction } from "@/modules/loan-application/[module]-data-enrichment/types"
import {
  type PrimaryCategory,
  UserPlaidTransactionConstant
} from "@/modules/loan-application/[module]-data-enrichment/constants"
import { Button } from "@/components/ui/button.tsx"
import { useFormContext } from "react-hook-form"
import { findByPlaidCategory } from "@/modules/loan-application/[module]-data-enrichment/constants/mapping-logic.ts"
import { currencyCellFormatter } from "@/utils/currency.utils.ts"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"

type CategoryDataState = Record<
  PrimaryCategory,
  {
    limit: number
    offset: number
    hasMore: boolean
  }
>

export function TransactionTable() {
  const { setValue, watch } = useFormContext()
  const data = watch("data") as PlaidTransaction[]

  const [sorting, setSorting] = useState<SortingState>([
    { id: "cyphrPrimaryCreditCategory", desc: false }
  ])
  const [grouping, setGrouping] = useState<GroupingState>([
    "cyphrPrimaryCreditCategory"
  ])
  const [updateTrigger, setUpdateTrigger] = useState(0)

  // TODO: implement the real logic, since it's depends on BE
  const [categoryState] = useState<CategoryDataState>(
    defaultCategoryDataState()
  )

  const onUpdateCategory = useCallback(
    (transactionId: string, key: keyof PlaidTransaction, value: string) => {
      const toUpdate = data.map((transaction) => {
        if (transaction.id === transactionId) {
          // Make sure the category is consistent
          if (key === "plaidPrimaryCreditCategory") {
            return {
              ...transaction,
              ...findByPlaidCategory(value),
              // keep cyphrFinancialCategory as user input
              cyphrPrimaryCreditCategory:
                transaction.cyphrPrimaryCreditCategory,
              cyphrFinancialCategory: transaction.cyphrFinancialCategory,
              [key]: _.snakeCase(value)
            }
          }

          return { ...transaction, [key]: _.snakeCase(value) }
        }

        return transaction
      })

      setValue("data", toUpdate)

      setUpdateTrigger((prev) => prev + 1)
    },
    [data, setValue]
  )

  const columns = useMemo<ColumnDef<PlaidTransaction>[]>(
    () => [
      {
        accessorKey: "cyphrPrimaryCreditCategory",
        header: renderFilterableHeader({ title: "Accounts" }),
        cell: ({ row, getValue }) => {
          if (row.getIsGrouped()) {
            return (
              <div className="flex items-center gap-2">
                {startCase(getValue() as string)}
              </div>
            )
          }

          return row.original.accountName
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          if (
            rowA.original.cyphrPrimaryCreditCategory.localeCompare(
              rowB.original.cyphrPrimaryCreditCategory
            ) == 0
          ) {
            return rowA.original.accountName.localeCompare(
              rowB.original.accountName
            )
          }

          return 0
        }
      },
      {
        accessorKey: "description",
        header: renderFilterableHeader({ title: "Transaction" }),
        cell: (info) => info.getValue(),
        enableSorting: true
      },
      {
        accessorKey: "amount",
        header: renderFilterableHeader({ title: "Total $ Amount" }),
        cell: (info) => {
          if (info.row.getIsGrouped()) {
            return
          }

          const customFormatter = (val: string | number) =>
            USDFormatter(val, { precision: 2 })

          return (
            <div>
              $
              {currencyCellFormatter(
                info.getValue() as number,
                customFormatter
              )}
            </div>
          )
        },
        enableSorting: true
      },
      {
        accessorKey: "accountName",
        header: renderFilterableHeader({ title: "Category" }),
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return
          }

          return (
            <SelectableCell
              defaultValue={row.original}
              options={Object.entries(
                UserPlaidTransactionConstant.primary as Record<string, string>
              ).map(sanitizeOptions)}
              type="cyphrPrimaryCreditCategory"
              onValueChange={onUpdateCategory}
            />
          )
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return (
            rowA.original.cyphrPrimaryCreditCategory.localeCompare(
              rowB.original.cyphrPrimaryCreditCategory
            ) ?? 0
          )
        }
      },
      {
        accessorKey: "plaidPrimaryCreditCategory",
        header: renderFilterableHeader({ title: "Primary" }),
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return
          }

          return (
            <SelectableCell
              defaultValue={row.original}
              options={Object.entries(
                UserPlaidTransactionConstant.detailed[
                  row.original.cyphrPrimaryCreditCategory as PrimaryCategory
                ]
              ).map(sanitizeOptions)}
              type="plaidPrimaryCreditCategory"
              onValueChange={onUpdateCategory}
            />
          )
        },
        enableSorting: true
      },
      {
        accessorKey: "cyphrFinancialCategory",
        header: renderFilterableHeader({ title: "Financial Categories" }),
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            const hasMore =
              categoryState[
                row.original.cyphrPrimaryCreditCategory as PrimaryCategory
              ]?.hasMore

            return (
              <Button
                className="flex items-center gap-2 cursor-pointer disabled:bg-transparent"
                disabled={!hasMore}
                variant="ghost"
              >
                <Icons.Union />
                <span className="text-white font-normal">
                  Display more transactions
                </span>
              </Button>
            )
          }

          // These categories did not have a financial category, so we disable it
          const exclusive: PrimaryCategory[] = ["asset", "liabilities", "other"]

          if (
            exclusive.some(
              (value) => value === row.original.cyphrPrimaryCreditCategory
            )
          ) {
            return ""
          }

          return (
            <SelectableCell
              defaultValue={row.original}
              options={Object.entries(
                UserPlaidTransactionConstant.financial[
                  row.original.cyphrPrimaryCreditCategory as PrimaryCategory
                ]
              ).map(sanitizeOptions)}
              type="cyphrFinancialCategory"
              onValueChange={onUpdateCategory}
            />
          )
        },
        enableSorting: true
      }
    ],
    [categoryState, onUpdateCategory]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      grouping,
      expanded: true,
      pagination: {
        pageIndex: 0,
        pageSize: 50 * 5 // maxEachCategory * numberOfCategory
      }
    },
    enableSorting: true,
    onSortingChange: setSorting,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  // Effect to handle re-grouping
  useEffect(() => {
    if (updateTrigger > 0) {
      setGrouping(["cyphrPrimaryCreditCategory"])
    }
  }, [updateTrigger])

  useEffect(() => {
    setSorting((prev) => {
      const hasCategorySorting = prev.some(
        (sort) => sort.id === "cyphrPrimaryCreditCategory"
      )

      if (!hasCategorySorting) {
        return [{ id: "cyphrPrimaryCreditCategory", desc: false }, ...prev]
      }

      return prev
    })
  }, [])

  return (
    <div className="overflow-x-scroll border border-1 border-black rounded-xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="whitespace-nowrap"
                  colSpan={header.colSpan}
                >
                  <TableCell className="text-sm p-0 text-black font-semibold">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="whitespace-nowrap">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={
                    cell.getIsGrouped() || cell.getIsAggregated()
                      ? "bg-table-gray-feldgrau text-white text-sm font-semibold py-0"
                      : "text-sm"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface SelectableCellProps {
  type: keyof PlaidTransaction
  defaultValue: PlaidTransaction
  onValueChange: (
    transactionId: string,
    key: keyof PlaidTransaction,
    value: string
  ) => void
  options: [string, string][]
}

function SelectableCell({
  defaultValue,
  onValueChange,
  options,
  type
}: SelectableCellProps) {
  const [value, setValue] = useState<string | undefined>(() => {
    const initialValue = defaultValue[type] as string

    if (options.some(([key]) => key === initialValue)) {
      return initialValue
    }
  })

  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        setValue(options.find(([_, v]) => v === newValue)?.at(0) ?? newValue)
        onValueChange(defaultValue.id, type, newValue)
      }}
    >
      <SelectTrigger className="text-sm border-none bg-transparent p-0 justify-start">
        <SelectValue
          placeholder={
            <p className="text-sm text-text-placeholder">Please select</p>
          }
        />
      </SelectTrigger>
      <SelectContent className="max-w-screen-sm xl:!max-w-full">
        {options.map((option) => (
          <SelectItem key={option[0]} value={option[0]}>
            <span className="text-sm">{option[1]}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function sanitizeOptions(value: [string, string]): [string, string] {
  return [_.snakeCase(value[0]), value[1]]
}

function defaultCategoryDataState(): CategoryDataState {
  return {
    asset: {
      limit: 10,
      offset: 0,
      hasMore: false
    },
    revenue: {
      limit: 10,
      offset: 0,
      hasMore: false
    },
    liabilities: {
      limit: 10,
      offset: 0,
      hasMore: false
    },
    expense: {
      limit: 10,
      offset: 0,
      hasMore: false
    },
    other: {
      limit: 10,
      offset: 0,
      hasMore: false
    }
  }
}
