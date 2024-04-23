import { APP_PATH } from "@/constants"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext,
  useLoanProgramDetailContext
} from "../../providers"
import { PlaidProvider } from "../../providers/PlaidProvider"
import { TopBarDetail } from "./TopBarDetail"
import { LoanApplicationStepNavigate } from "../organisms/LoanApplicationStepNavigate"
import { SideNavLoanApplication } from "@/shared/molecules/SideNavLoanApplication"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { LoanApplicationSave } from "../organisms/LoanApplicationSave"
import { AlertFinishFormBeforeLeave } from "../molecules/alerts/AlertFinishFormRequest"
import { useNavigate } from "react-router-dom"
import { isEmpty } from "lodash"
import { CloseWithoutSave } from "../atoms/CloseWithoutSave"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay"
import { LoanType } from "@/types/loan-program.type"
import { getFormStrategy } from "../../services/form.services"
import { useMemo } from "react"
import { isLoanReady } from "@/utils/domain.utils"
export const LoanInformationHeader = () => {
  const { loanProgramDetails } = useLoanProgramDetailContext()
  const { loanRequest } = useLoanApplicationFormContext()

  const navigate = useNavigate()

  const backToLoanProgram = () => {
    navigate(
      APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
        loanProgramDetails?.id ?? ""
      )
    )
  }

  return (
    <TopBarDetail
      breads={[
        {
          to: APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
            loanProgramDetails?.id ?? ""
          ),
          label: loanProgramDetails?.name || ""
        },
        {
          to: "#",
          label: "Loan Application"
        }
      ]}
      rightFooter={
        <div className="flex gap-2">
          {!isEmpty(loanRequest) && <CloseWithoutSave />}
          {isEmpty(loanRequest) ? (
            <Button onClick={backToLoanProgram} variant="secondary">
              Close
            </Button>
          ) : (
            <LoanApplicationSave />
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

export const Component = () => {
  const { step } = useLoanApplicationProgressContext()
  const { loanProgramDetails } = useLoanProgramDetailContext()
  const { isSubmitting } = useLoanApplicationFormContext()
  const loanType = isLoanReady()
    ? LoanType.READINESS
    : loanProgramDetails?.type ?? LoanType.MICRO
  const formStrategy = useMemo(() => getFormStrategy(loanType), [loanType])

  return (
    <PlaidProvider>
      <LoanInformationHeader />
      <div className="flex h-full overflow-auto flex-1 py-6 pt-0 flex-col">
        <div className="pt-2 sticky top-0 z-10 bg-white shadow-md mb-4 px-2">
          <LoanApplicationStepNavigate />
        </div>
        <LoadingOverlay isLoading={isSubmitting} className="flex-1">
          <div className="grid grid-cols-8 w-full">
            {formStrategy.getFormComponent(step)?.component}
          </div>
        </LoadingOverlay>
      </div>
      <AlertFinishFormBeforeLeave />
    </PlaidProvider>
  )
}
