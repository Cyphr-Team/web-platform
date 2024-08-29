import { memo, ReactNode } from "react"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"

// ----------------------------------------------------------------------

type Props<T extends FieldValues> = {
  children: ReactNode
  methods: UseFormReturn<T>
  onSubmit?: VoidFunction
}

const RHFProvider = <T extends FieldValues>({
  children,
  onSubmit,
  methods
}: Props<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  )
}

export default memo(RHFProvider) as typeof RHFProvider
