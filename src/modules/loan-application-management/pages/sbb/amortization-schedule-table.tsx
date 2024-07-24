import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import * as _ from "lodash"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { toCurrency } from "@/utils"
import { get } from "lodash"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { isEqualDate } from "@/utils/date.utils"
import { isBefore } from "date-fns"

type AmortizationScheduleType = {
  date: string
  data: {
    openingBalance: number
    totalPayment: number
    principalPayment: number
    interestPayment: number
    closingBalance: number
  }
}

const FAKE_DATA_A: AmortizationScheduleType[] = _.times(12, (i) => ({
  date: `2024-${i + 1 < 10 ? 0 : ""}${i + 1}`,
  data: {
    openingBalance: 10000 + i * 1000,
    totalPayment: 1000 + i * 100,
    principalPayment: 500 + i * 50,
    interestPayment: 500 + i * 50,
    closingBalance: 10000 + i * 1000
  }
}))

const FAKE_DATA_B: AmortizationScheduleType[] = _.times(12, (i) => ({
  date: `2024-${i + 1 < 10 ? 0 : ""}${i + 1}`,
  data: {
    openingBalance: 10000 + i * 1000,
    totalPayment: 1000 + i * 100,
    principalPayment: 500 + i * 50,
    interestPayment: 500 + i * 50,
    closingBalance: 10000 + i * 1000
  }
})).concat(
  _.times(12, (i) => ({
    date: `2025-${i + 1 < 10 ? 0 : ""}${i + 1}`,
    data: {
      openingBalance: 10000 + i * 1000,
      totalPayment: 1000 + i * 100,
      principalPayment: 500 + i * 50,
      interestPayment: 500 + i * 50,
      closingBalance: 10000 + i * 1000
    }
  }))
)

const columns: ColumnDef<AmortizationScheduleType>[] = [
  {
    id: "openingBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Opening Balance"
        className="truncate"
      />
    )
  },
  {
    id: "totalPayment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Payment"
        className="truncate"
      />
    )
  },
  {
    id: "principalPayment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Principal Payment"
        className="truncate"
      />
    )
  },
  {
    id: "interestPayment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Interest Payment"
        className="truncate"
      />
    )
  },
  {
    id: "closingBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Closing Balance"
        className="truncate"
      />
    )
  }
]

const TableData = ({
  data,
  loanName
}: {
  data: AmortizationScheduleType[]
  loanName: string
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  const payments = ["totalPayment", "principalPayment", "interestPayment"]

  return (
    <div className="rounded-md border relative max-h-full overflow-auto">
      <Table isLoading={false} className="text-sm relative">
        <TableBody className="bg-white">
          <TableRow key="date" className="relative">
            <TableHead className="text-sm font-medium sticky left-0 bg-white text-black w-52 ">
              {loanName}
            </TableHead>
            {data.map((row) => (
              <TableCell
                className="text-sm font-medium border-l text-center"
                key={row.date}
              >
                {row.date}
              </TableCell>
            ))}
          </TableRow>
          <TableRow key="openingBalance" className="relative">
            <TableHead className="text-sm font-normal sticky left-0 bg-white text-black border-r">
              Opening Balance
            </TableHead>
            {data.map((row) => (
              <TableCell
                className="text-sm border-l text-center"
                key={row.date}
              >
                {toCurrency(row.data.openingBalance)}
              </TableCell>
            ))}
          </TableRow>
          {table.getFlatHeaders().map((header) => {
            return (
              payments.includes(header.id) && (
                <TableRow key={header.id} className="relative w-max">
                  <TableHead
                    key={header.id}
                    className="text-sm font-normal sticky left-0 text-black bg-white !min-w-52"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {/* Render row */}
                  </TableHead>
                  {data.map((row) => {
                    return (
                      <TableCell className="text-red-500 !min-w-52 border-l text-center">
                        {toCurrency(get(row.data, header.id, 0))}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            )
          })}
          <TableRow key="closingBalance" className="relative w-max">
            <TableHead className="text-sm font-medium sticky left-0 bg-white text-black !w-52">
              Closing Balance
            </TableHead>
            {data.map((row) => (
              <TableCell className="text-sm font-medium !w-52 border-l text-center">
                {toCurrency(row.data.closingBalance)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const calculateMonthlyPayment = (
  data: AmortizationScheduleType[][]
): {
  date: string
  totalPayment: number
}[] => {
  // We must calculate the total monthly payment
  // Create a range of month that we must pay
  // Calculate the total payment each month
  // Find the range of months
  // Create a new Set() and sort it
  if (!data.length) return []
  try {
    const months = new Set(data.map((d) => d.map((d) => d.date)).flat())

    // Create a range of months with the minimum and maximum date
    const range = Array.from(months).sort((a, b) => {
      return isBefore(new Date(a), new Date(b)) ? -1 : 1
    })
    // Calculate the total payment each month
    const totalPayment = range.map((r) => {
      return data
        .map((d) => {
          return d.find((d) => isEqualDate(d.date, r))?.data.totalPayment ?? 0
        })
        .reduce((acc, curr) => acc + curr, 0)
    })
    // return the total payment along with date
    return range.map((r, i) => ({
      date: r,
      totalPayment: totalPayment[i]
    }))
  } catch {
    return []
  }
}

export const AmortizationScheduleTable = () => {
  const data_loan_a = FAKE_DATA_A
  const data_loan_b = FAKE_DATA_B
  const totalMonthlyPayment = calculateMonthlyPayment([
    data_loan_a,
    data_loan_b
  ])

  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-2xl font-semibold ">Amortization Schedule</p>
      <div className="rounded-md border relative max-h-full overflow-auto">
        <TableData data={data_loan_a} loanName="Loan A" />
      </div>
      <div className="rounded-md border relative max-h-full overflow-auto">
        <TableData data={data_loan_b} loanName="Loan B" />
      </div>
      <div className="rounded-md border relative max-h-full overflow-auto">
        <Table className="text-sm bg-white">
          <TableHeader>
            <TableRow>
              <TableCell className="text-sm font-medium sticky left-0 bg-white text-black !min-w-52"></TableCell>
              {totalMonthlyPayment.map((payment) => {
                return (
                  <TableCell
                    className="font-medium border-l !min-w-52 text-center"
                    key={payment.date}
                  >
                    {payment.date}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-sm font-medium sticky left-0 bg-white text-black !min-w-52">
                Total Monthly Payment
              </TableCell>
              {totalMonthlyPayment.map((payment) => {
                return (
                  <TableCell
                    className="text-red-500 font-medium border-l !min-w-52 text-center"
                    key={payment.date}
                  >
                    {toCurrency(payment.totalPayment)}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
