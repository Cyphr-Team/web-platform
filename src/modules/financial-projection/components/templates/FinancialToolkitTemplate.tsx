import { memo } from "react"
import { CompanyTable } from "@/modules/financial-projection/components/organisms"
import { FinancialCompany } from "@/modules/financial-projection/types"
import { Separator } from "@/components/ui/separator.tsx"
import { Button } from "@/components/ui/button.tsx"

interface Props {
  data: FinancialCompany[]
}

const FinancialToolkitTemplate = ({ data }: Props) => {
  return (
    <section className="w-full h-dvh text-center mt-10">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Welcome to Financial Toolkit
      </h2>
      <Separator />
      <div className="flex flex-col justify-center items-end">
        {data.length > 0 ? (
          <div className="p-2 px-10 w-full">
            <CompanyTable data={data} />
          </div>
        ) : (
          <div className="text-xl md:text-2xl mb-6 p-2">
            Welcome! Add your company to leverage Financial Projection from our
            toolkit
          </div>
        )}
        <Button className="w-56 mr-10">Add new company</Button>
      </div>
    </section>
  )
}
export default memo(FinancialToolkitTemplate)
