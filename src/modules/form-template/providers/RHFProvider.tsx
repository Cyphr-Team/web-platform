import { memo, type ReactNode } from "react"
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn
} from "react-hook-form"

// ----------------------------------------------------------------------

interface Props<T extends FieldValues> {
  children: ReactNode
  methods: UseFormReturn<T>
  onSubmit?: VoidFunction
}

function RHFProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods
}: Props<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  )
}

export default memo(RHFProvider) as typeof RHFProvider
