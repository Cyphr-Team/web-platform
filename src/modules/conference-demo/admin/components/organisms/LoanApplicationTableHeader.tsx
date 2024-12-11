import { Search } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { MultiSelect } from "@/components/ui/multi-select.tsx"
import { LOAN_STATUS } from "@/modules/loan-application-management/constants"
import { useForm } from "react-hook-form"
import {
  LoanApplicationFilterSchema,
  type LoanApplicationFilterValues
} from "@/modules/loan-application-management/hooks/useQuery/useQueryListPaginateLoanApplication.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { LOAN_PLAN } from "@/modules/conference-demo/admin/constants"

export function LoanApplicationTableHeader() {
  const form = useForm<LoanApplicationFilterValues>({
    resolver: zodResolver(LoanApplicationFilterSchema),
    defaultValues: {
      status: [],
      programNames: [],
      search: ""
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="whitespace-nowrap">
                  Search for application
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    className="pl-9 md:w-[300px]"
                    placeholder="Business name or ID"
                    prefixIcon={<Search className="size-5 opacity-50" />}
                    type="text"
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
                field={field}
                label="Status"
                name="status"
                options={LOAN_STATUS}
              />
            )}
          />

          <FormField
            control={form.control}
            name="programNames"
            render={({ field }) => (
              <MultiSelect
                field={field}
                label="Loan Program"
                name="programNames"
                options={LOAN_PLAN}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
