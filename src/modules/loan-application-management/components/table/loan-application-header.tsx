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
import { LOAN_STATUS } from "../../constants"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect } from "react"
import {
  type FilterParams,
  LoanApplicationFilterSchema,
  type LoanApplicationFilterValues
} from "../../hooks/useQuery/useQueryListLoanApplication"
import { useQueryGetLoanProgramList } from "../../hooks/useQuery/useQueryLoanProgramList"
import { type Option } from "@/types/common.type"

interface Props {
  onSearch: (formValues: FilterParams) => void
}

export function LoanApplicationTableHeader({
  onSearch
}: React.PropsWithChildren<Props>) {
  const form = useForm<LoanApplicationFilterValues>({
    resolver: zodResolver(LoanApplicationFilterSchema),
    defaultValues: {
      status: [],
      programNames: [],
      search: ""
    }
  })

  const listLoanProgramQuery = useQueryGetLoanProgramList()
  const loanProgramOptions: Option[] =
    listLoanProgramQuery.data?.loanPrograms.map((el) => ({
      label: el.name,
      value: el.name.toLowerCase()
    })) ?? []

  const onSubmit = form.handleSubmit(() => ({}))

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearch({
        status: value.status?.map((v) => v?.value ?? "") ?? [],
        programNames: value.programNames?.map((v) => v?.value ?? "") ?? [],
        search: value.search ?? ""
      })
    })

    return () => subscription.unsubscribe()
  }, [form, onSearch])

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="flex items-center gap-3 flex-wrap">
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
                    prefixIcon={<Search className="h-5 w-5 opacity-50" />}
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
                options={loanProgramOptions}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
