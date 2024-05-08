import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormField } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { useEffect } from "react"

import { Option } from "@/types/common.type"
import { useQueryGetListInstitution } from "../hooks/useQuery/useQueryGetListInstitution"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import {
  FilterParams,
  UserFilterSchema,
  UserFilterValues
} from "../hooks/useQuery/useQueryListPaginateUser"

type Props = {
  onSearch: (formValues: FilterParams) => void
}

export function UserTableHeader({ onSearch }: React.PropsWithChildren<Props>) {
  const form = useForm<UserFilterValues>({
    resolver: zodResolver(UserFilterSchema),
    defaultValues: {
      institutionIds: []
    }
  })

  const isForesightAdmin = checkIsForesightAdmin()

  const listInstitutionQuery = useQueryGetListInstitution({
    enabled: isForesightAdmin
  })
  const institutionOptions: Option[] =
    listInstitutionQuery.data?.data.map((institution) => ({
      label: institution.name,
      value: institution.id.toLowerCase()
    })) ?? []

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearch({
        institutionIds: value.institutionIds?.map((v) => v?.value ?? "") ?? []
      })
    })

    return () => subscription.unsubscribe()
  }, [form, onSearch])

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex w-full items-center flex-wrap gap-3">
          <FormField
            control={form.control}
            name="institutionIds"
            render={({ field }) => (
              <MultiSelect
                label="Institution"
                name="institutionIds"
                field={field}
                options={institutionOptions}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
