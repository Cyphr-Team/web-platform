import { cn } from "@/lib/utils.ts"
import { Button, ButtonLoading } from "@/components/ui/button.tsx"
import { CustomAlertDialog } from "@/shared/molecules/AlertDialog.tsx"
import { memo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { DiscardApplication } from "../molecules/DiscardApplication"
import { Icons } from "@/components/ui/icons"
import { MOCK_APPLICATIONS } from "../../constants/data"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { capitalizeWords, snakeCaseToText } from "@/utils"
import { Badge } from "@/components/ui/badge"

function Header() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isReview = Boolean(id)

  const loanApplicationDetails = MOCK_APPLICATIONS[0]

  const status = loanApplicationDetails?.status ?? LoanApplicationStatus.DRAFT

  const description = `Are you sure you want to save and continue with this loan application?`

  const onConfirmed = () => {
    navigate(APP_PATH.CONFERENCE_DEMO.applicant.list)
  }

  return (
    <nav
      className={cn(
        "sticky top-0 flex w-full items-center justify-between border-y bg-white",
        "md:!h-20 md:border-t-0 md:pr-8"
      )}
    >
      <div className="min-w-20 truncate text-lg font-semibold md:text-2xl flex gap-2 items-center">
        <h4
          className={cn(
            "ml-0 min-w-20 truncate text-lg font-semibold md:ml-3",
            "md:text-2xl"
          )}
          title={loanApplicationDetails.loanProgram.name}
        >
          {isReview ? "Status" : loanApplicationDetails.loanProgram?.name}
        </h4>
        {isReview ? (
          <Badge
            isDot
            isDotBefore
            className="text-sm"
            variant="soft"
            variantColor={getBadgeVariantByStatus(status)}
          >
            {capitalizeWords(snakeCaseToText(status))}
          </Badge>
        ) : null}
      </div>
      {isReview ? (
        <Button variant="outline" onClick={onConfirmed}>
          Close
        </Button>
      ) : (
        <div className="flex gap-2">
          <DiscardApplication />
          <CustomAlertDialog
            actionClassName="finovate"
            cancelText="Cancel"
            confirmText="Save & Continue"
            description={<span className="break-keep">{description}</span>}
            title="Save and continue?"
            onConfirmed={onConfirmed}
          >
            <ButtonLoading isLoading={false} variant="outline">
              <Icons.saveApplication className="mr-1" />
              Save and continue
            </ButtonLoading>
          </CustomAlertDialog>
        </div>
      )}
    </nav>
  )
}

export default memo(Header)
