import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { type FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { X } from "lucide-react"
import { FormDescription } from "../../constants"
import { get } from "lodash"

export function FormOptionCard({
  id,
  value,
  formType,
  onRemove
}: {
  id: string
  value: string
  formType: FORM_TYPE
  onRemove: VoidFunction
}) {
  return (
    <Card className="relative p-2" id={id}>
      <Button
        aria-label="Remove form"
        className="absolute right-2 top-2"
        type="button"
        variant="ghost"
        onClick={onRemove}
      >
        <X size={16} />
      </Button>
      <CardTitle className="text-sm">
        {capitalizeWords(snakeCaseToText(value))}
      </CardTitle>
      <p className="text-sm text-primary">
        {get(FormDescription, formType, "N/A")}
      </p>
    </Card>
  )
}
