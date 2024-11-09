import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import { ArrowRight, CheckCircle, Download } from "lucide-react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { ButtonDownloadESignDocument } from "@/modules/loan-application/components/atoms/ButtonDownloadESignDocument.tsx"

export function LoanReadyLoanSubmission() {
  const navigate = useNavigate()
  const location = useLocation()
  // Get e-sign document if have
  const [searchParams] = useSearchParams()
  const documentId = searchParams.get("documentId")

  const handleGoToFinancialApplicationDetail = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION.APPLICATIONS.financialApplicationDetails(
        location.state?.applicationId,
        location.state?.loanProgramId
      )
    )
  }

  const handleGoToFinancialProjectionDetail = () => {
    navigate(APP_PATH.LOAN_APPLICATION.FINANCIAL.INDEX)
  }

  const btnIcon = {
    className: "ml-2 w-4 h-4 inline-block"
  }
  const btnShadow = "shadow-[0px_4px_12px_0px_#00000026]"

  return (
    <div className="p-4 lg:p-8 h-full w-full flex shadow-[">
      <div className="m-auto flex w-full flex-col space-y-8 md:w-[640px] px-2">
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
            <h1 className="text-[1.75rem] font-semibold tracking-tight">
              Application Submitted
            </h1>
          </div>

          <div className="text-black flex flex-col gap-2 md:gap-3 text-sm">
            <p>
              <span className="font-bold">Congratulations!</span> Your
              application has been successfully submitted.
            </p>
            <p>
              For your records, you can download a copy of your application. You
              can also review your submission in the “Applications” tab.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap lg:flex-nowrap mx-20">
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

            <Button onClick={handleGoToFinancialApplicationDetail}>
              <div>
                Review Submission
                <ArrowRight {...btnIcon} />
              </div>
            </Button>

            <Button
              className={btnShadow}
              variant="success"
              onClick={handleGoToFinancialProjectionDetail}
            >
              <div>
                <Icons.financial {...btnIcon} />
                <span className="ml-2">Review financial projections</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
