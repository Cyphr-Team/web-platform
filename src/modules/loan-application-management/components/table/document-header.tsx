"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useDebounce } from "react-use"
import { cn } from "@/lib/utils"

const FormSchema = z.object({
  search: z.string().optional()
})

interface DocumentTableHeaderProps {
  onSearch: (keyword: string) => void
  classNames?: {
    formWrapper?: string
    searchInput?: string
  }
  placeholder?: string
}

export const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
  onSearch,
  classNames,
  placeholder = "Search for documents"
}) => {
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
      <form
        className={cn(
          "flex w-full flex-1 flex-wrap items-center gap-3 space-y-6",
          classNames?.formWrapper
        )}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem
              className={cn(
                "flex min-w-[300px] shrink-0 flex-col",
                classNames?.searchInput
              )}
            >
              <FormControl>
                <Input
                  className="pl-9"
                  placeholder={placeholder}
                  prefixIcon={<Search className="size-5 opacity-50" />}
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
