import { Separator } from "@/components/ui/separator"
import { ApplicationDetails } from "../components/organisms/loan-application-details/ApplicationDetails"
import { SignatureDetails } from "../components/organisms/loan-application-details/SignatureDetails"
import { DocumentationDetails } from "../components/organisms/loan-application-details/DocumentationDetails"
import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { useBRLoanApplicationDetailsContext } from "../providers/BRLoanApplicationDetailsProvider"
import { Loader2 } from "lucide-react"
import { isLoanReady } from "@/utils/domain.utils"

export const Component = () => {
  const { isFetchingDetails, confirmationFormData } =
    useBRLoanApplicationDetailsContext()
  return (
    <>
      <ApplicationDetailsHeader />
      {isFetchingDetails ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="m-2 h-8 w-8 transition-all ease-out animate-spin text-primary" />
        </div>
      ) : (
        <div className="w-full flex flex-col p-4xl gap-8">
          <ApplicationDetails />
          {!isLoanReady() && (
            <>
              <Separator />
              <DocumentationDetails />
            </>
          )}
          <Separator />
          <SignatureDetails confirmationFormData={confirmationFormData} />
        </div>
      )}
    </>
  )
}
