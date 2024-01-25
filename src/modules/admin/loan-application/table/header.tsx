"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { LOAN_AMOUNT, LOAN_PRODUCTS, LOAN_STATUS } from "../constants"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const FormSchema = z.object({
  status: z.array(
    z.object({
      label: z.string().optional(),
      value: z.string().optional()
    })
  ),
  loanProducts: z.array(
    z.object({
      label: z.string().optional(),
      value: z.string().optional()
    })
  ),
  loanAmounts: z.array(
    z.object({
      label: z.string().optional(),
      value: z.string().optional()
    })
  ),
  search: z.string().optional()
})

export function LoanApplicationTableHeader() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: [],
      loanProducts: [],
      loanAmounts: [],
      search: ""
    }
  })

  function onSubmit() {
    // Fetch data
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex w-full items-center flex-wrap gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1 flex-shrink-0 min-w-[200px]">
                <FormLabel className="whitespace-nowrap">
                  Search for application
                </FormLabel>
                <FormControl>
                  <Input
                    prefixIcon={<Search className="h-5 w-5 opacity-50" />}
                    type="text"
                    placeholder="Search"
                    className="pl-9"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <MultiSelect
                label="Status"
                name="status"
                field={field}
                options={LOAN_STATUS}
              />
            )}
          />
          <FormField
            control={form.control}
            name="loanProducts"
            render={({ field }) => (
              <MultiSelect
                label="Loan Product"
                name="loanProducts"
                field={field}
                options={LOAN_PRODUCTS}
              />
            )}
          />
          <FormField
            control={form.control}
            name="loanAmounts"
            render={({ field }) => (
              <MultiSelect
                label="Loan Amount"
                name="loanAmounts"
                field={field}
                options={LOAN_AMOUNT}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
