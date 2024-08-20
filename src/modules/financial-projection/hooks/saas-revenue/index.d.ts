/**
 * @namespace useSaasRevenue: a wrapper for custom hook with useQuery, useMutation with an alias
 * Usage:
 * import { useSaasRevenue } from "@/modules/financial-projection/hooks/saas-revenue"
 * const Component = () => {
 *   const { mutateAsync } = useSaasRevenue.submit()
 *   // or
 *   const { submit: { mutateAsync } } = useSaasRevenue
 *
 *   // the rest of code...
 *   return <Something>{something}</Something>;
 * }
 */
export namespace useSaasRevenue {
  export { useMutateSaasRevenue as submit } from "./useMutateSaasRevenue"
  export { useQuerySaasRevenueById as getById } from "./useQuerySaasRevenue"
  export { useQuerySaasRevenueFinancialProjectionId as getByFinancialProjectId } from "./useQuerySaasRevenue"
}
