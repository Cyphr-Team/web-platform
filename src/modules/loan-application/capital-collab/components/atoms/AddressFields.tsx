import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { memo } from "react"
import { useFormContext } from "react-hook-form"

interface AddressFieldsProps {
  fieldName: string
  index: number
}

function AddressFields(props: AddressFieldsProps) {
  const form = useFormContext()
  const { fieldName, index } = props

  const { handleChangeState, handleChangeCity, STATE_DATA } = useSelectCities()

  const handleChangeStateAndResetCity = (value: string) => {
    handleChangeState(value)
    form.setValue(`${fieldName}.${index}.businessCity`, "")
  }

  return (
    <>
      <AutoCompleteStates
        className="col-span-6 lg:col-span-2"
        control={form.control}
        emptyText="No results found"
        label="State"
        name={`${fieldName}.${index}.businessState`}
        options={STATE_DATA}
        value={form.getValues(`${fieldName}.${index}.businessState`)}
        onChange={handleChangeStateAndResetCity}
      />
      <AutoCompleteCities
        className="col-span-6 lg:col-span-2"
        control={form.control}
        emptyText="No results found"
        label="City"
        name={`${fieldName}.${index}.businessCity`}
        options={
          STATE_DATA.find(
            (s) =>
              s.name === form.getValues(`${fieldName}.${index}.businessState`)
          )?.cities ?? []
        }
        value={form.getValues(`${fieldName}.${index}.businessCity`)}
        onChange={handleChangeCity}
      />
    </>
  )
}

export default memo(AddressFields)
