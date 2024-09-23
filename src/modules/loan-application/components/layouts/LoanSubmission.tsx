import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ArrowDownToLine, ArrowRight, CheckCircle } from "lucide-react"
import backgroundPatternDecorative from "@/assets/background-pattern-decorative.svg"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { ButtonDownloadESignDocument } from "../atoms/ButtonDownloadESignDocument"

const LoanSubmissionWithDocument = () => {
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
    <div className="p-4 lg:p-8 h-full w-full flex">
      <div
        className={"m-auto flex w-full flex-col space-y-8 md:w-[640px] px-2"}
      >
        <div className="flex flex-col text-center gap-4xl">
          <div className="flex justify-center relative">
            <div className="w-14 self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-success-secondary">
                  <CheckCircle className="w-7 h-7 text-success" />
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

          <div className="text-black flex flex-col gap-2 md:gap-3">
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

          <div className="flex gap-4 justify-center flex-wrap mx-20">
            {documentId && (
              <ButtonDownloadESignDocument
                documentId={documentId}
                className="border flex-1"
              >
                Download Copy <ArrowDownToLine className="ml-2 w-4 h-4" />
              </ButtonDownloadESignDocument>
            )}

            <Button onClick={handleGoToDetail} className="flex-1">
              <div>
                Review Submission
                <ArrowRight className="ml-2 w-4 h-4 inline-block" />
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

  if (documentId) return <LoanSubmissionWithDocument />

  return (
    <div className="p-4 lg:p-8 h-full w-full flex">
      <div className="m-auto flex w-full flex-col space-y-8 sm:w-[360px]">
        <div className="flex flex-col text-center gap-4xl">
          <div className="flex justify-center relative">
            <img
              className="max-w-[100vw] absolute w-[756px] h-[756px] -z-10 left-1/2 -translate-x-1/2 top-[28px] -translate-y-1/2 dark:opacity-15"
              src={backgroundPatternDecorative}
              alt="Pattern decorative"
              width={756}
              height={756}
            />
            <div className="w-14 self-center">
              <AspectRatio ratio={1 / 1}>
                <div className="w-full h-full flex justify-center items-center rounded-full bg-success-secondary">
                  <CheckCircle className="w-7 h-7 text-success" />
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
