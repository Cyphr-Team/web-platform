import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay"
import { SideNavLoanApplication } from "@/shared/molecules/SideNavLoanApplication"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useGetFormByStep } from "../../hooks/useGetFormByStep"
import { LOAN_APPLICATION_STEPS } from "../../models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext
} from "../../providers"
import { DiscardApplication } from "../atoms/DiscardApplication"
import { LoanApplicationSave } from "../organisms/LoanApplicationSave"
import { TopBarDetail } from "./TopBarDetail"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { isCyphrBank } from "@/utils/domain.utils"
import { ChatSupportButton } from "@/modules/chat-support/components/ChatSupportButton"

export function LoanInformationHeader() {
  const { loanProgramDetails, isLoading } = useLoanProgramDetailContext()

  const navigate = useNavigate()

  const { getStepStatus } = useLoanApplicationProgressContext()

  /**
   * No need to check [LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION.REVIEW_APPLICATION]
   * Because its review step
   */
  const checkStepStatus =
    getStepStatus(LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.CURRENT_LOANS) ||
    getStepStatus(LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.OPERATING_EXPENSES) ||
    getStepStatus(LOAN_APPLICATION_STEPS.OWNER_INFORMATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.LOAN_REQUEST) ||
    getStepStatus(LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.PRODUCT_SERVICE) ||
    getStepStatus(LOAN_APPLICATION_STEPS.BUSINESS_MODEL) ||
    getStepStatus(LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY) ||
    getStepStatus(LOAN_APPLICATION_STEPS.EXECUTION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.LAUNCH_KC_BUSINESS_DOCUMENTS) ||
    getStepStatus(LOAN_APPLICATION_STEPS.LAUNCH_KC_FIT) ||
    // SBB DOCUMENTATION
    getStepStatus(LOAN_APPLICATION_STEPS.BUSINESS_EIN_LETTER) ||
    getStepStatus(LOAN_APPLICATION_STEPS.CERTIFICATE_GOOD_STANDING) ||
    getStepStatus(LOAN_APPLICATION_STEPS.FICTITIOUS_NAME_CERTIFICATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.ARTICLES_OF_ORGANIZATION) ||
    getStepStatus(LOAN_APPLICATION_STEPS.BY_LAWS) ||
    // SBB KYB FORMS
    getStepStatus(LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE) ||
    getStepStatus(LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_TWO)

  const backToLoanProgram = () => {
    navigate(-1)
  }

  return (
    <TopBarDetail
      leftFooter={
        <div className="hidden md:flex gap-2 items-center justify-center ml-4 md:ml-8 min-w-20">
          <h4
            className={cn(
              "text-lg font-semibold truncate min-w-20",
              "md:text-2xl"
            )}
          >
            {isLoading ? (
              <Skeleton className="w-40 h-8" />
            ) : (
              loanProgramDetails?.name
            )}
          </h4>
          <Badge
            isDot
            isDotBefore
            className="text-sm"
            variant="soft"
            variantColor={getBadgeVariantByStatus(LoanApplicationStatus.DRAFT)}
          >
            Draft
          </Badge>
        </div>
      }
      rightFooter={
        <div className="flex gap-2">
          {checkStepStatus ? (
            <>
              <DiscardApplication />
              <LoanApplicationSave />
            </>
          ) : (
            <Button variant="secondary" onClick={backToLoanProgram}>
              Close
            </Button>
          )}

          <div className="block md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button type="button">Open Progress</Button>
              </DrawerTrigger>
              <DrawerContent>
                <SideNavLoanApplication className="flex relative w-full" />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      }
    />
  )
}

export function Component() {
  const { step, percentComplete } = useLoanApplicationProgressContext()

  const { isSubmitting } = useLoanApplicationFormContext()

  const componentByStep = useGetFormByStep(step)

  /**
   * Implement scroll to top when navigate step
   */
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = 0
  }, [step])

  return (
    <>
      <LoanInformationHeader />

      <Progress
        className="h-2 rounded-none bg-background-disabled overflow-visible z-30 relative"
        indicatorClassName="after:hidden after:md:block after:content-[attr(data-percentvalue)] after:absolute after:right-0 after:bottom-2.5 after:text-xs after:text-text-secondary"
        value={percentComplete}
      />

      <div
        ref={containerRef}
        className="flex h-full overflow-auto flex-1 py-6 flex-col pt-10"
      >
        <LoadingOverlay className="flex-1" isLoading={isSubmitting}>
          <div className="grid grid-cols-8 w-full">{componentByStep}</div>
          {(isEnableChatSupport() || isCyphrBank()) && <ChatSupportButton />}
        </LoadingOverlay>
      </div>
    </>
  )
}
