import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormField } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { useEffect } from "react"

import { Option } from "@/types/common.type"
import { checkIsForesightAdmin } from "@/utils/check-roles"
import {
  FilterParams,
  UserFilterSchema,
  UserFilterValues
} from "../hooks/useQuery/useQueryListPaginateUser"
import { useQueryGetListAllInstitution } from "../hooks/useQuery/useQueryGetListAllInstitution"

type Props = {
  onSearch: (formValues: FilterParams) => void
}

const allOption: Option = {
  label: "All",
  value: ""
}

export function UserTableHeader({ onSearch }: React.PropsWithChildren<Props>) {
  const form = useForm<UserFilterValues>({
    resolver: zodResolver(UserFilterSchema),
    defaultValues: {
      institutionIds: [allOption]
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
        institutionIds:
          value.institutionIds
            ?.map((v) => v?.value ?? "")
            ?.filter((v) => v !== allOption.value) ?? []
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
            name="institutionIds"
            render={({ field }) => (
              <MultiSelect
                label="Institution"
                name="institutionIds"
                field={field}
                options={institutionOptions}
                defaultValue={allOption}
              />
            )}
          />
        </div>
      </form>
    </Form>
  )
}
