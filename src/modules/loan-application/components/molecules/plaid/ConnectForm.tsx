import { ButtonLoading } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { SearchSelect } from "@/components/ui/search-select"
import { Separator } from "@/components/ui/separator"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { usePlaidInstitutions } from "@/modules/loan-application/hooks/usePlaidInstitutions"
import { type Option } from "@/types/common.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "lucide-react"
import React, { useEffect, useMemo } from "react"
import { useForm, useFormContext } from "react-hook-form"
import * as z from "zod"

interface PlaidConnectFormProps {
  wrapperClassName?: string
}

const plaidFormSchema = z.object({
  institution: z
    .object({
      label: z.string(),
      value: z.string()
    })
    .nullable(),
  routingNumber: z
    .object({
      label: z.string(),
      value: z.string()
    })
    .nullable()
})

type PlaidFormValue = z.infer<typeof plaidFormSchema>

export const PlaidConnectForm: React.FC<PlaidConnectFormProps> = ({
  wrapperClassName
}) => {
  const form = useForm<PlaidFormValue>({
    resolver: zodResolver(plaidFormSchema),
    defaultValues: {
      institution: null,
      routingNumber: null
    }
  })

  return (
    <FormLayout wrapperClassName={wrapperClassName}>
      <FormHeader />
      <Separator />
      <Form {...form}>
        <PlaidForm />
      </Form>
    </FormLayout>
  )
}

const FormHeader: React.FC = () => (
  <div className="flex flex-col gap-2">
    <h5 className="text-lg font-semibold">Connected Accounts</h5>
    <p className="text-sm financial-projection text-muted-foreground">
      Please note that if your bank connection status is pending, you can still
      complete and submit your application. We'll notify you once your bank
      connection status has been updated.
    </p>
  </div>
)

const PlaidForm: React.FC = () => {
  const form = useFormContext<PlaidFormValue>()
  const { institutions, searchInstitutions, isLoading, total } =
    usePlaidInstitutions()

  const institutionOptions = useMemo(
    () =>
      institutions.map((institution) => ({
        label: institution.name,
        value: institution.institutionId
      })),
    [institutions]
  )

  const selectedInstitution = form.watch("institution")
  const selectedInstitutionData = institutions.find(
    (institution) => institution.institutionId === selectedInstitution?.value
  )
  const routingNumberOptions = useMemo(
    () =>
      selectedInstitutionData?.routingNumbers.map((routingNumber) => ({
        label: routingNumber,
        value: routingNumber
      })) ?? [],
    [selectedInstitutionData]
  )

  useEffect(() => {
    if (selectedInstitution?.value) {
      form.setValue("routingNumber", null)
    }
  }, [form, selectedInstitution?.value])

  return (
    <div className="w-full flex flex-col gap-5 text-secondary-700 text-sm">
      <InstitutionField
        isLoading={isLoading}
        options={institutionOptions}
        total={total}
        onSearch={searchInstitutions}
      />
      <RoutingNumberField
        disabled={!selectedInstitution}
        options={routingNumberOptions}
      />
      <ConnectButton isValid={form.formState.isValid} />
    </div>
  )
}

const InstitutionField: React.FC<{
  options: Option[]
  onSearch: (value: string) => void
  isLoading: boolean
  total?: number
}> = ({ options, onSearch, isLoading, total }) => (
  <div className="flex justify-between items-center gap-4">
    <p>Banking institution</p>
    <FormField
      name="institution"
      render={({ field }) => (
        <SearchSelect
          field={field}
          handleSearch={onSearch}
          isFetching={isLoading}
          options={options}
          placeholder="Start typing your institution"
          totalOptions={total}
        />
      )}
    />
  </div>
)

const RoutingNumberField: React.FC<{
  options: Option[]
  disabled: boolean
}> = ({ options, disabled }) => (
  <div className="flex justify-between items-center gap-4">
    <p>
      Routing number <small>(Optional)</small>
    </p>
    <FormField
      name="routingNumber"
      render={({ field }) => (
        <SearchSelect
          disabled={disabled}
          field={field}
          options={options}
          placeholder="Select a routing number"
        />
      )}
    />
  </div>
)

const ConnectButton: React.FC<{ isValid: boolean }> = ({ isValid }) => (
  <div className="self-end">
    <ButtonLoading
      className="text-sm rounded-lg"
      disabled={!isValid}
      size="sm"
      variant="outline"
    >
      <Link className="w-4 h-4 mr-1" strokeWidth={2.5} /> Connect with Plaid
    </ButtonLoading>
  </div>
)
