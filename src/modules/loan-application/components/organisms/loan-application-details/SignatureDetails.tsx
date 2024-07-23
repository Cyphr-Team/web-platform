import { Card } from "@/components/ui/card"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { cn } from "@/lib/utils"
import { getConfirmationTexts } from "@/modules/loan-application/constants"
import { ConfirmationFormResponse } from "@/modules/loan-application/constants/type"
import { useTenant } from "@/providers/tenant-provider"
import { format } from "date-fns"
import { ESignTable } from "./ESignTable"
import { isEnablePandaDocESign } from "@/utils/feature-flag.utils"

interface SignatureDetailsProps {
  confirmationFormData?: ConfirmationFormResponse
  hasTitle?: boolean
}

export const SignatureDetails: React.FC<SignatureDetailsProps> = ({
  confirmationFormData,
  hasTitle = true
}) => {
  const tenant = useTenant()

  const CONFIRMATION_TEXTS = getConfirmationTexts(
    tenant?.tenantData?.name ?? ""
  )

  const signatureSection = isEnablePandaDocESign() ? (
    <ESignTable />
  ) : (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto shadow-none">
      {CONFIRMATION_TEXTS.map((text, index) => (
        <p key={index} className="text-sm text-text-secondary">
          <strong>{text.title}</strong> {text.content}
        </p>
      ))}
      <div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Signature of Authorized Individual</p>
          <p className="text-3xl island-moments-regular">
            {confirmationFormData?.printName ?? "-"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-2xl gap-x-4xl">
        <div className="flex flex-col gap-1">
          <p className="text-sm">Print Name</p>
          <p className="text-lg">{confirmationFormData?.printName ?? "N/A"}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Signature Date</p>
          <p className="text-lg">
            {confirmationFormData?.createdAt
              ? format(confirmationFormData?.createdAt, FORMAT_DATE_MM_DD_YYYY)
              : "N/A"}
          </p>
        </div>
      </div>
    </Card>
  )

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        "md:grid md:grid-cols-4",
        "loan-application-item"
      )}
    >
      {hasTitle && (
        <div className="col-span-1">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Signature</h3>
          </div>
        </div>
      )}
      <div
        className={cn("col-span-4", hasTitle && "col-span-3 max-w-screen-sm")}
      >
        {signatureSection}
      </div>
    </div>
  )
}
