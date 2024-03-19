import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { LOAN_PRODUCTS, LOAN_STATUS } from "../../constants"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect } from "react"
import {
  FilterParams,
  LoanApplicationFilterSchema,
  LoanApplicationFilterValues
} from "../../hooks/useQuery/useQueryListLoanApplication"

type Props = {
  onSearch: (formValues: FilterParams) => void
}

export function LoanApplicationTableHeader({
  onSearch
}: React.PropsWithChildren<Props>) {
  const form = useForm<LoanApplicationFilterValues>({
    resolver: zodResolver(LoanApplicationFilterSchema),
    defaultValues: {
      status: [],
      type: [],
      search: ""
    }
  })

  const onSubmit = form.handleSubmit(() => {})

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearch({
        status: value.status?.map((v) => v?.value ?? "") ?? [],
        type: value.type?.map((v) => v?.value ?? "") ?? [],
        search: value.search ?? ""
      })
    })

    return () => subscription.unsubscribe()
  }, [form, onSearch])

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="flex w-full items-center flex-wrap gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-[200px] shrink-0 min-w-[200px]">
                <FormLabel className="whitespace-nowrap">
                  Search for application
                </FormLabel>
                <FormControl>
                  <Input
                    prefixIcon={<Search className="h-5 w-5 opacity-50" />}
                    type="text"
                    placeholder="Business name or ID"
                    className="pl-9"
                    autoComplete="new-password"
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
            name="type"
            render={({ field }) => (
              <MultiSelect
                label="Loan Program"
                name="type"
                field={field}
                options={LOAN_PRODUCTS}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
