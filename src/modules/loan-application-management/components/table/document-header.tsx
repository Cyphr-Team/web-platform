"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useDebounce } from "react-use"

const FormSchema = z.object({
  search: z.string().optional()
})

type Props = {
  onSearch: (keyword: string) => void
}

export const DocumentTableHeader: React.FC<Props> = ({ onSearch }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: ""
    }
  })

  const formValues = form.watch()

  const onSubmit = form.handleSubmit(() => {})

  useDebounce(
    () => {
      onSearch(formValues.search ?? "")
    },
    500,
    [formValues.search]
  )

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="flex w-full items-center flex-wrap gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-shrink-0 min-w-[300px]">
                <FormControl>
                  <Input
                    prefixIcon={<Search className="h-5 w-5 opacity-50" />}
                    type="text"
                    placeholder="Search for documents"
                    className="pl-9"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
