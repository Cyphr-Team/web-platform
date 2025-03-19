import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import {
  LoanReadyPlan,
  type LoanReadyPlanEnum
} from "@/modules/loanready/constants/package"
import { convertDateTimeToLocal, toastError } from "@/utils"
import { useNavigate } from "react-router-dom"
import { UseOfLoan } from "@/types/loan-application.type.ts"
import { useCreateLoanApplicationMutation } from "@/modules/loan-application/hooks/application/useCreateLoanApplicationMutation.ts"
import { LoanType } from "@/types/loan-program.type.ts"
import { useQueryLoanProgramDetailsByType } from "@/modules/loan-application/hooks/program/useQueryLoanProgramDetails.ts"
import { useLinkApplicationToLoanReadySubscription } from "@/modules/loanready/hooks/payment/useUpdateLinkTransactionAndApplication.ts"
import { useCallback } from "react"

export interface UnusedReportBannerProps {
  plan: LoanReadyPlanEnum
  loanProgramId?: string
  paymentTransactionId: string
  purchaseDate?: Date
}

export function UnusedReportBanner({
  plan,
  paymentTransactionId,
  purchaseDate = new Date(),
  loanProgramId = ""
}: UnusedReportBannerProps) {
  const navigate = useNavigate()

  // Loan Request v1 aka Application creation
  const { mutateAsync: mutateCreateLoanApplication } =
    useCreateLoanApplicationMutation(LoanType.MICRO)

  const loanProgramQuery = useQueryLoanProgramDetailsByType(
    LoanType.MICRO,
    loanProgramId
  )

  const { mutateLink } = useLinkApplicationToLoanReadySubscription()

  const handleStartAssessment = useCallback(async () => {
    await mutateCreateLoanApplication(
      {
        loanProgramId: loanProgramId,
        loanAmount: loanProgramQuery?.data?.minLoanAmount ?? 0,
        loanTermInMonth: loanProgramQuery?.data?.minTermInMonth ?? 0,
        proposeUseOfLoan: UseOfLoan.OTHER
      },
      {
        onSuccess: ({ data: createdApplicationData }) => {
          mutateLink(createdApplicationData.id, paymentTransactionId)

          navigate(
            APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(
              createdApplicationData.id,
              createdApplicationData.loanProgram.id
            ),
            { replace: true }
          )
        },
        onError: (err) => {
          toastError({
            title: "Failed to start assessment",
            description: "Please try again. Error: " + err.message
          })
        }
      }
    )
  }, [
    mutateCreateLoanApplication,
    loanProgramId,
    loanProgramQuery?.data?.minLoanAmount,
    loanProgramQuery?.data?.minTermInMonth,
    mutateLink,
    paymentTransactionId,
    navigate
  ])

  const PackageIcon = Icons.loanReadyPackage

  return (
    <div className="w-full my-2 align-center">
      <div className="p-3 flex flex-col lg:flex-row items-center justify-between">
        {/* Left section with icon and title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full">
            <PackageIcon />
          </div>
          <div>
            <p className="loanready-v2 text-sm text-primary">
              {LoanReadyPlan[plan].name} | An assessment is ready for you to
              start
            </p>
          </div>
        </div>

        {/* Middle section with details */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-1">
            <div className="loanready-v2 text-sm text-primary">
              Purchased on{" "}
              {convertDateTimeToLocal(
                purchaseDate.toLocaleDateString(),
                "---",
                "",
                false,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }
              )}
            </div>
          </div>
          <Button
            className="gap-2"
            type="button"
            onClick={handleStartAssessment}
          >
            Start assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
