import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { X } from "lucide-react"
import { FormDescription } from "../../constants"
import { get } from "lodash"
export const FormOptionCard = ({
  id,
  value,
  formType,
  onRemove
}: {
  id: string
  value: string
  formType: FORM_TYPE
  onRemove: VoidFunction
}) => {
  return (
    <Card className="p-2 relative" id={id}>
      <Button
        type="button"
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={onRemove}
        aria-label="Remove form"
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
