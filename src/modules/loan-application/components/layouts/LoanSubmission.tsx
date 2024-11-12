import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { LoanReadyLoanSubmission } from "@/modules/loan-application/components/layouts/LoanReady/LoanSubmission"
import { isLoanReady } from "@/utils/domain.utils"
import { ArrowDownToLine, ArrowRight, CheckCircle } from "lucide-react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ButtonDownloadESignDocument } from "../atoms/ButtonDownloadESignDocument"

function LoanSubmissionWithDocument() {
  const navigate = useNavigate()
  // Get applicationId from state
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Get e-sign document if have
  const documentId = searchParams.get("documentId")

  const handleGoToDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(
        location.state?.applicationId,
        location.state?.loanProgramId
      )
    )
  }

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
            <p className="text-2xl font-normal">
              {location?.state?.businessName}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Application Submitted
            </h1>
          </div>

          <div className="flex flex-col gap-2 text-black md:gap-3">
            <p>
              Congratulations! Your application has been successfully submitted.
            </p>
            <p>
              For your records, you can download a copy of your application.
            </p>
            <p>
              You can also review your submission in the “Applications” tab.
            </p>
          </div>

          <div className="mx-20 flex flex-wrap justify-center gap-4">
            {documentId ? (
              <ButtonDownloadESignDocument
                className="flex-1 border"
                documentId={documentId}
              >
                Download Copy <ArrowDownToLine className="ml-2 size-4" />
              </ButtonDownloadESignDocument>
            ) : null}

            <Button className="flex-1" onClick={handleGoToDetail}>
              <div>
                Review Submission
                <ArrowRight className="ml-2 inline-block size-4" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Component() {
  const navigate = useNavigate()
  // Get applicationId from state
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Get e-sign document if have
  const documentId = searchParams.get("documentId")

  const handleGoToDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(
        location.state?.applicationId,
        location.state?.loanProgramId
      )
    )
  }

  if (isLoanReady()) return <LoanReadyLoanSubmission />

  if (documentId) return <LoanSubmissionWithDocument />

  return (
    <div className="flex size-full p-4 lg:p-8">
      <div className="m-auto flex w-full flex-col space-y-8 sm:w-[360px]">
        <div className="flex flex-col gap-4xl text-center">
          <div className="relative flex justify-center">
            <img
              alt="Pattern decorative"
              className="absolute left-1/2 top-[28px] -z-10 size-[756px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 dark:opacity-15"
              height={756}
              src={backgroundPatternDecorative}
              width={756}
            />
            <div className="w-14 self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="flex size-full items-center justify-center rounded-full bg-success-secondary">
                  <CheckCircle className="size-7 text-success" />
                </div>
              </AspectRatio>
            </div>
          </div>
          <div className="flex flex-col space-y-lg">
            <p className="text-2xl font-normal">
              {location?.state?.businessName}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Submitted</h1>
          </div>

          <div className="text-muted-foreground">
            <p>
              Your business details have been submitted. Your assigned loan
              officer will review your application and reach out soon for next
              steps.
            </p>
          </div>
          <Button onClick={handleGoToDetail}>Go to details</Button>
        </div>
      </div>
    </div>
  )
}
