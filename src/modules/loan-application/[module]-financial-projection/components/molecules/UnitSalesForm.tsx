import { memo } from "react"
import ArrayFormTemplate from "@/modules/loan-application/[module]-financial-projection/components/templates/ArrayFormTemplate.tsx"
import { FieldType } from "@/modules/form-template/components/templates/FormTemplate.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

const UnitSalesForm = () => {
  return (
    <ArrayFormTemplate
      name="unitSales"
      step={LOAN_APPLICATION_STEPS.REVENUE}
      defaultEmptyObject={{ name: "" }}
      blocks={[
        {
          name: "name",
          type: FieldType.TEXT,
          props: {
            label: "Adu vip"
          }
        }
      ]}
    />
  )
}

export default memo(UnitSalesForm)
