import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect } from "react"
import { z } from "zod"
import { MultiSelect } from "@/components/ui/multi-select"
import { CHAT_MESSAGE_TYPE } from "@/types/chatbot.type"

interface Props {
  onSearch: (query: FilterValues) => void
}

export interface FilterValues {
  search: string
  status: string[]
}

export const ConversationFilterSchema = z.object({
  search: z.string().optional(),
  status: z.array(z.object({ label: z.string(), value: z.string() })).optional()
})

export type ConversationFilterValues = z.infer<typeof ConversationFilterSchema>

export function ConversationTableHeader({
  onSearch
}: React.PropsWithChildren<Props>) {
  const form = useForm<ConversationFilterValues>({
    resolver: zodResolver(ConversationFilterSchema),
    defaultValues: {
      search: "",
      status: []
    }
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearch({
        status: value.status?.map((v) => v?.value ?? "") ?? [],
        search: value.search ?? ""
      })
    })

    return () => subscription.unsubscribe()
  }, [form, onSearch])

  // This function is added to prevent auto-submitting the form when pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Messages</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    className="pl-9 md:w-[300px]"
                    placeholder="Search for messages"
                    prefixIcon={<Search className="size-5 opacity-50" />}
                    type="text"
                    onKeyDown={handleKeyDown}
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
                options={CHAT_MESSAGE_TYPE}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
