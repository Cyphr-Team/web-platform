import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowRight, CheckCircle, Download } from "lucide-react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ButtonDownloadESignDocument } from "@/modules/loan-application/components/atoms/ButtonDownloadESignDocument.tsx"

export function CapitalCollabLoanSubmission() {
  const navigate = useNavigate()

  // Get applicationId from state
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Get e-sign document if have
  const documentId = searchParams.get("documentId")

  const handleGoToAssessmentSummaryDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(
        location.state?.applicationId as string,
        location.state?.loanProgramId as string
      )
    )
  }

  const btnIcon = {
    className: "ml-2 w-4 h-4 inline-block"
  }
  const btnShadow = "shadow-[0px_4px_12px_0px_#00000026]"

  return (
    <div className="flex size-full p-4 lg:p-8">
      <div className="m-auto flex w-full flex-col space-y-8 px-2 md:w-[640px]">
        <div className="flex flex-col gap-4xl text-center">
          <div className="relative flex justify-center">
            <div className="w-14 self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="flex size-full items-center justify-center rounded-full bg-success-secondary">
                  <CheckCircle className="size-7 text-success" />
                </div>
              </AspectRatio>
            </div>
          </div>

          <div className="flex flex-col space-y-lg">
            <h1 className="text-[1.75rem] font-semibold tracking-tight">
              Assessment Submitted
            </h1>
          </div>

          <div className="flex flex-col gap-2 text-sm text-black md:gap-3">
            <p>
              <span className="font-bold">Congratulations!</span> Your
              assessment has been successfully submitted.
            </p>
            <p>
              For your records, you can download a copy of your assessment. You
              can also review your submission in the “Assessment” tab.
            </p>
          </div>

          <div className="mx-20 flex flex-wrap justify-center gap-4 lg:flex-nowrap">
            {/* TODO: Download PDF without e-sign */}
            {documentId ? (
              <ButtonDownloadESignDocument
                className={btnShadow}
                documentId={documentId}
                variant="outline"
              >
                <div>
                  <Download {...btnIcon} />
                  <span className="ml-2">Download copy</span>
                </div>
              </ButtonDownloadESignDocument>
            ) : null}

            <Button onClick={handleGoToAssessmentSummaryDetail}>
              <div>
                Review Submission
                <ArrowRight {...btnIcon} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
