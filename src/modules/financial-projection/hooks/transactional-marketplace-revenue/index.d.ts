/**
 * @namespace TransactionalMarketplaceRevenue: a wrapper for custom hook with useQuery, useMutation with an alias
 * Usage:
 * import { useTransactionalMarketplaceRevenue } from "@/modules/financial-projection/hooks/transactional-marketplace-revenue"
 * const Component = () => {
 *   const { submitLoanBusinessModelForm } = useTransactionalMarketplaceRevenue.submit()
 *   // or
 *   const { submit } = useTransactionalMarketplaceRevenue
 *
 *   // the rest of code...
 *   return <Something>{something}</Something>;
 * }
 */
export namespace useTransactionalMarketplaceRevenue {
  export { useMutateTransactionalMarketplaceRevenue as submit } from "./useMutateTransactionalMarketplaceRevenueForm"
  export { useQueryTransactionalMarketplaceRevenueById as getById } from "./useQueryTransactionalMarketplaceRevenue"
  export { useQueryTransactionalMarketplaceRevenueFinancialProjectionId as getByFinancialProjectId } from "./useQueryTransactionalMarketplaceRevenue"
}
