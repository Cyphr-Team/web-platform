import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useEffect } from "react"

import { checkIsForesightAdmin } from "@/utils/check-roles"
import { useQueryGetListAllInstitution } from "../hooks/useQuery/useQueryGetListAllInstitution"
import {
  DocumentFilterSchema,
  DocumentFilterValues,
  FilterParams
} from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateDocument"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Option } from "@/types/common.type"

type Props = {
  onSearch: (formValues: FilterParams) => void
}

const allOption: Option = {
  label: "All",
  value: "all"
}

export function DocumentTableHeader({ onSearch }: Props) {
  const form = useForm<DocumentFilterValues>({
    resolver: zodResolver(DocumentFilterSchema),
    defaultValues: {
      institutionId: ""
    }
  })

  const isForesightAdmin = checkIsForesightAdmin()

  const listInstitutionQuery = useQueryGetListAllInstitution({
    enabled: isForesightAdmin
  })

  const institutionOptions: Option[] = [allOption].concat(
    listInstitutionQuery.data?.map((institution) => ({
      label: institution.name,
      value: institution.id.toLowerCase()
    })) ?? []
  )

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearch({
        institutionId:
          value.institutionId !== allOption.value ? value.institutionId : ""
      })
    })

    return () => subscription.unsubscribe()
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex w-full items-center flex-wrap gap-3">
          <FormField
            control={form.control}
            name="institutionId"
            render={({ field }) => (
              <FormItem className="w-[250px]">
                <FormLabel>Institution</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an institution" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {institutionOptions?.map((inst) => (
                      <SelectItem key={inst.value} value={inst.value}>
                        {inst.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
