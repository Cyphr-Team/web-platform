import { memo, type ReactNode } from "react"
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn
} from "react-hook-form"

// ----------------------------------------------------------------------

interface RHFProviderProps<T extends FieldValues> {
  children: ReactNode
  methods: UseFormReturn<T>
  onSubmit?: VoidFunction
  className?: string
}

function RHFProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  className
}: RHFProviderProps<T>) {
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

export default memo(RHFProvider) as typeof RHFProvider
