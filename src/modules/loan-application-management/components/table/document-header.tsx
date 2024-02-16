"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const FormSchema = z.object({
  search: z.string().optional()
})

export function DocumentTableHeader() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
