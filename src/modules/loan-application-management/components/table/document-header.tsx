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

interface Props {
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

  const onSubmit = form.handleSubmit(() => ({}))

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
        <div className="flex w-full flex-wrap items-center gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex min-w-[300px] shrink-0 flex-col">
                <FormControl>
                  <Input
                    className="pl-9"
                    placeholder="Search for documents"
                    prefixIcon={<Search className="size-5 opacity-50" />}
                    type="text"
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
