/**
 * @namespace useRecurringCharge: a wrapper for custom hook with useQuery, useMutation with an alias
 * Usage:
 * import { useRecurringCharge } from "@/modules/financial-projection/hooks/saas-revenue"
 * const Component = () => {
 *   const { mutateAsync } = useRecurringCharge.submit()
 *   // or
 *   const { submit: { mutateAsync } } = useRecurringCharge
 *
 *   // the rest of code...
 *   return <Something>{something}</Something>;
 * }
 */
export namespace useRecurringCharge {
  export { useMutateRecurringCharge as submit } from "./useMutateRecurringCharge"
  export { useQueryRecurringChargeById as getById } from "./useQueryRecurringCharge"
  export { useQueryRecurringChargeFinancialProjectionId as getByFinancialProjectId } from "./useQueryRecurringCharge"
}
