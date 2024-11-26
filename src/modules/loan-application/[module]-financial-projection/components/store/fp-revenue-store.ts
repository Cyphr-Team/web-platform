import { z } from "zod"
import { createDateSchema, createNumberSchema } from "@/constants/validate.ts"
import {
  type BillableHour,
  type Contract,
  type RecurringCharge,
  type UnitSale
} from "@/modules/loan-application/[module]-financial-projection/types/revenue-form.ts"
import { formatToISOString } from "@/utils/date.utils.ts"

export const emptyUnitSale: UnitSale = {
  name: "",
  estimateMonthlyUnitSales: undefined,
  estimateMonthlySalesIncreaseRate: undefined,
  unitPrice: undefined,
  startDate: ""
}

export const emptyBillableHour: BillableHour = {
  name: "",
  startDate: "",
  monthlyNewCustomers: undefined,
  monthlyNewCustomerIncreaseRate: undefined,
  averageMonthlyHourBilledPerCustomer: undefined,
  hourlyRate: undefined
}

export const emptyRecurringCharge: RecurringCharge = {
  name: "",
  startDate: "",
  monthlyNewCustomer: undefined,
  recurringCharge: undefined,
  frequency: undefined,
  churnRate: 10,
  hasUpfrontFee: undefined,
  upfrontFee: undefined
}

export const emptyContract: Contract = {
  name: "",
  startDate: "",
  endDate: "",
  monthlyRevenue: undefined
}

const unitSaleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  estimateMonthlyUnitSales: createNumberSchema({ coerce: true }),
  estimateMonthlySalesIncreaseRate: createNumberSchema({
    coerce: true,
    max: 100
  }),
  unitPrice: createNumberSchema({ coerce: true }),
  startDate: createDateSchema()
})

const billableHourSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  startDate: createDateSchema(),
  monthlyNewCustomers: createNumberSchema({ coerce: true }),
  monthlyNewCustomerIncreaseRate: createNumberSchema({
    coerce: true,
    max: 100
  }),
  averageMonthlyHourBilledPerCustomer: createNumberSchema({ coerce: true }),
  hourlyRate: createNumberSchema({ coerce: true })
})

const recurringChargeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  startDate: createDateSchema(),
  monthlyNewCustomer: createNumberSchema({ coerce: true }),
  recurringCharge: createNumberSchema({ coerce: true }),
  frequency: z.string().min(1, { message: "This field is required" }),
  churnRate: createNumberSchema({ coerce: true, max: 100 }),
  hasUpfrontFee: z.string(),
  upfrontFee: createNumberSchema({ coerce: true }).optional()
})

const contractSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    startDate: createDateSchema(),
    endDate: createDateSchema(),
    monthlyRevenue: createNumberSchema({ coerce: true })
  })
  .refine(
    (data) =>
      new Date(formatToISOString(data.startDate)) <
      new Date(formatToISOString(data.endDate)),
    {
      message: "Start date must be before end date",
      path: ["endDate"]
    }
  )

export const revenueFormSchema = z
  .object({
    id: z.string().optional(),
    unitSales: z.array(unitSaleSchema),
    billableHours: z.array(billableHourSchema),
    recurringCharges: z.array(recurringChargeSchema),
    contracts: z.array(contractSchema)
  })
  .refine(
    (data) => {
      return (
        data.unitSales.length > 0 ||
        data.billableHours.length > 0 ||
        data.recurringCharges.length > 0 ||
        data.contracts.length > 0
      )
    },
    { message: "At least one of the fields is required" }
  )
