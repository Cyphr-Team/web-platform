import { Separator } from "@/components/ui/separator"
import { ApplicationDetails } from "../components/organisms/loan-application-details/ApplicationDetails"
import { SignatureDetails } from "../components/organisms/loan-application-form/confirmation/SignatureDetails"
import { DocumentationDetails } from "../components/organisms/loan-application-details/DocumentationDetails"
import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { Loader2 } from "lucide-react"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { cn } from "@/lib/utils"
import { useBRLoanApplicationDetailsContext } from "../providers"
import { LaunchKCBusinessDocumentsDetails } from "../components/organisms/loan-application-form/custom-form/launchkc/BusinessDocumentsDetails"

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
        <div
          className={cn(
            "w-full flex flex-col p-2xl gap-4",
            "md:p-4xl md:gap-8"
          )}
        >
          <ApplicationDetails />
          {!(
            isLoanReady() ||
            isKccBank() ||
            isCyphrBank() ||
            isSbb() ||
            isLaunchKC()
          ) && (
            <>
              <Separator />
              <DocumentationDetails />
            </>
          )}
          {isLaunchKC() && (
            <>
              <Separator />
              <LaunchKCBusinessDocumentsDetails />
            </>
          )}
          <Separator />
          <SignatureDetails confirmationFormData={confirmationFormData} />
        </div>
      )}
    </>
  )
}

Component.displayName = "LoanApplicationDetailsReview"

export default Component
