import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import {
  isCapitalCollab,
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
import { CapitalCollabApplicantLoanApplicationDetailsReview } from "@/modules/loan-application/capital-collab/components/pages/CapitalCollabLoanApplicationDetailsReview"

export function Component() {
  const { isFetchingDetails, confirmationFormData } =
    useBRLoanApplicationDetailsContext()

  if (isCapitalCollab()) {
    return <CapitalCollabApplicantLoanApplicationDetailsReview />
  }

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
            "flex w-full flex-col gap-4 p-2xl",
            "md:gap-8 md:p-4xl"
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
