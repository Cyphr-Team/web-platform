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
import React, { useCallback, useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.tsx"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header.tsx"
import { MOCK_TRANSACTION_DATA } from "@/modules/loan-application/[module]-data-enrichment/components/store/mock-data.ts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx"
import { cn } from "@/lib/utils.ts"
import {
  Category,
  CategoryToFinancialCategoryMapper,
  CategoryToPrimaryMapper
} from "@/modules/loan-application/[module]-data-enrichment/constants"
import { Icons } from "@/modules/loan-application/components/atoms/icon.tsx"

export interface Transaction {
  id: string
  category: string
  accounts: string
  transaction: string
  primary: string
  total: string
  financialCategory: string
}

export function TransactionTable() {
  const [data, setData] = useState(MOCK_TRANSACTION_DATA)
  const [sorting, setSorting] = useState<SortingState>([
    { id: "category", desc: false }
  ])
  const [grouping, setGrouping] = useState<GroupingState>(["category"])
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const handleUpdateValue = useCallback(
    (key: keyof Transaction) => (transactionId: string, value: string) => {
      setData((prev) =>
        prev.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, [key]: value }
            : transaction
        )
      )
      setUpdateTrigger((prev) => prev + 1)
    },
    []
  )

  const columns = React.useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="p-0"
            column={column}
            title="Accounts"
          />
        ),
        cell: ({ row, getValue }) => {
          if (row.getIsGrouped()) {
            return (
              <div className="flex items-center gap-2">
                {getValue() as string}
              </div>
            )
          }

          return row.original.accounts
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          if (
            rowA.original.category.localeCompare(rowB.original.category) == 0
          ) {
            return rowA.original.accounts.localeCompare(rowB.original.accounts)
          }

          return 0
        }
      },
      {
        accessorKey: "transaction",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Transaction" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true
      },
      {
        accessorKey: "accounts",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return
          }

          return (
            <SelectableCell
              defaultValue={row.original}
              options={Object.values(Category)}
              onValueChange={handleUpdateValue("category")}
            />
          )
        }
      },
      {
        accessorKey: "total",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total $ Amount" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true
      },
      {
        accessorKey: "primary",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Primary" />
        ),
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return
          }

          return (
            <SelectableCell
              defaultValue={row.original}
              options={Object.values(
                CategoryToPrimaryMapper[row.original.category]
              )}
              onValueChange={handleUpdateValue("primary")}
            />
          )
        },
        enableSorting: true
      },
      {
        accessorKey: "financialCategory",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Financial Category" />
        ),
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return (
              <div className="flex items-center gap-2 cursor-pointer">
                <Icons.Union />
                Display more transactions
              </div>
            )
          }

          if (
            [Category.Assets, Category.Liabilities, Category.Other].some(
              (value) => value === row.original.category
            )
          ) {
            return ""
          }

          return (
            <SelectableCell
              defaultValue={row.original}
              options={Object.values(
                CategoryToFinancialCategoryMapper[row.original.category]
              )}
              onValueChange={handleUpdateValue("financialCategory")}
            />
          )
        },
        enableSorting: true
      }
    ],
    [handleUpdateValue]
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
      setGrouping(["category"])
    }
  }, [updateTrigger])

  useEffect(() => {
    setSorting((prev) => {
      const hasCategorySorting = prev.some((sort) => sort.id === "category")

      if (!hasCategorySorting) {
        return [{ id: "category", desc: false }, ...prev]
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
                  <TableCell className="text-sm">
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
                      ? "bg-table-gray-feldgrau text-white text-sm p-3"
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
  defaultValue: Transaction
  onValueChange: (transactionId: string, value: string) => void
  options: string[]
}

function SelectableCell({
  defaultValue,
  onValueChange,
  options
}: SelectableCellProps) {
  const [category, setCategory] = useState(defaultValue.category)

  return (
    <Select
      value={category}
      onValueChange={(value) => {
        setCategory(value)
        onValueChange(defaultValue.id, value)
      }}
    >
      <SelectTrigger className="text-sm border-none bg-transparent">
        <SelectValue
          placeholder={
            <p className="text-sm text-text-placeholder">Please select</p>
          }
        />
      </SelectTrigger>
      <SelectContent className={cn("max-w-screen-sm xl:!max-w-full")}>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            <span className={cn("text-sm")}>{option}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
