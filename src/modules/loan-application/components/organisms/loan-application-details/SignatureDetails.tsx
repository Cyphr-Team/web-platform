import { Card } from "@/components/ui/card"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { CONFIRMATION_TEXTS } from "@/modules/loan-application/constants"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers/BRLoanApplicationDetailsProvider"
import { format } from "date-fns"

export const SignatureDetails = () => {
  const { confirmationFormData } = useBRLoanApplicationDetailsContext()
  return (
    <div className="grid grid-cols-4 ">
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Signature</h3>
        </div>
      </div>
      <div className="col-span-3">
        <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
          {CONFIRMATION_TEXTS.map((text, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <strong>{text.title}</strong> {text.content}
            </p>
          ))}
          <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
            <div className="flex flex-col gap-1">
              <p>Signature of Authorized Individual</p>
              <p className="text-3xl island-moments-regular">
                {confirmationFormData?.printName}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p>Signature Date</p>
              <p className="text-lg">
                {confirmationFormData?.createdAt
                  ? format(
                      confirmationFormData?.createdAt,
                      FORMAT_DATE_MM_DD_YYYY
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
