import { memo } from "react"
import { FinancialToolkitTemplate } from "@/modules/financial-projection/components/templates"
import { useQueryFinancialCompany } from "@/modules/financial-projection/hooks/useQueryFinancialCompany.ts"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay.tsx"
import { useFinancialToolkitStore } from "@/modules/financial-projection/store/useFinancialToolkitStore.ts"

const FinancialToolkitPage = () => {
  // fetch data region
  const { isLoading } = useQueryFinancialCompany()
  // end region

  // get data from store
  const companies = useFinancialToolkitStore.use.companies()

  return (
    <LoadingOverlay isLoading={isLoading} className="w-full">
      <FinancialToolkitTemplate data={companies} />
    </LoadingOverlay>
  )
}
export default memo(FinancialToolkitPage)
