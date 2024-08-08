import { ExecutionFormValue } from "@/modules/loan-application/constants/form"

interface BusinessModel {
  businessModel: string
  otherMessage?: string
}

type TransformExecutionFormValueToResponse = Omit<
  ExecutionFormValue,
  "businessModels"
> & {
  businessModels: BusinessModel[]
}

/**
 * There is different between the businessModel get from the server
 * with the businessModel get from the form value
 *
 * Server: @see https://service-platform.cyphrai.dev/swagger/views/swagger-ui/index.html#/Execution%20Form/findByApplicationId
 * Form: @see ExecutionFormValue
 */
export type ExecutionFormResponse = TransformExecutionFormValueToResponse & {
  id: string
}

export type ExecutionFormRequest = Omit<
  ExecutionFormValue,
  "businessModels"
> & {
  businessModels: BusinessModel[]
}
