import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import {
  isCyphrBank,
  isKccBank,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { Loader2 } from "lucide-react"
import { ApplicationDetails } from "../components/organisms/loan-application-details/ApplicationDetails"
import { DocumentationDetails } from "../components/organisms/loan-application-details/DocumentationDetails"
import { SignatureDetails } from "../components/organisms/loan-application-form/confirmation/SignatureDetails"
import { LaunchKCBusinessDocumentsDetails } from "../components/organisms/loan-application-form/custom-form/launchkc/BusinessDocumentsDetails"
import { useBRLoanApplicationDetailsContext } from "../providers"
import { SbbApplicantSubmittedDocuments } from "../components/organisms/loan-application-form/custom-form/sbb/SubmittedDocument"

export function Component() {
  const { isFetchingDetails, confirmationFormData } =
    useBRLoanApplicationDetailsContext()

  return (
    <>
      <ApplicationDetailsHeader />
      {isFetchingDetails ? (
        <div className="flex size-full items-center justify-center">
          <Loader2 className="m-2 size-8 animate-spin text-primary transition-all ease-out" />
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
          {isSbb() && (
            <>
              <Separator />
              <SbbApplicantSubmittedDocuments />
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
