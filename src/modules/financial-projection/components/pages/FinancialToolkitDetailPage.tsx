import { FinancialToolkitDetailTemplate } from "@/modules/financial-projection/components/templates"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay.tsx"
import { useQueryDirectCosts } from "@/modules/financial-projection/hooks/useQueryDirectCosts.ts"

const FinancialToolkitDetailPage = () => {
  const { isLoading: isLoadingDirectCosts } = useQueryDirectCosts()

  return (
    <LoadingOverlay isLoading={isLoadingDirectCosts} className="w-full">
      <FinancialToolkitDetailTemplate />
    </LoadingOverlay>
  )
}
export default FinancialToolkitDetailPage
