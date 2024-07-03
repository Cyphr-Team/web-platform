import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { FormDescription } from "@/modules/loan-application/constants/type"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { X } from "lucide-react"

export const FormOptionCard = ({
  id,
  value,
  formType,
  onRemove
}: {
  id: string
  value: string
  formType: FORM_TYPE
  onRemove: () => void
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
      <p className="text-sm text-primary">{FormDescription[formType]}</p>
    </Card>
  )
}
