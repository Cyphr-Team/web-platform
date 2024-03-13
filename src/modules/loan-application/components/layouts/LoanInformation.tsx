import { APP_PATH } from "@/constants"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import {
  useLoanApplicationContext,
  useLoanProgramDetailContext
} from "../../providers"
import { PlaidProvider } from "../../providers/PlaidProvider"
import { BusinessInformationForm } from "../organisms/BusinessInformationForm"
import { ConfirmationForm } from "../organisms/ConfirmationForm"
import { FinancialInformationForm } from "../organisms/FinancialInformationForm"
import { OwnerInformationForm } from "../organisms/OwnerInformationForm"
import { LoanRequest } from "./LoanRequest"
import { TopBarDetail } from "./TopBarDetail"
import { LoanApplicationStepNavigate } from "../organisms/LoanApplicationStepNavigate"
import { SideNavLoanApplication } from "@/shared/molecules/SideNavLoanApplication"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { LoanApplicationSave } from "../organisms/LoanApplicationSave"
import { LoanProgramDetailProvider } from "../../providers/LoanProgramDetailProvider"
import { AlertFinishFormBeforeLeave } from "../molecules/alerts/AlertFinishFormRequest"
import { useNavigate } from "react-router-dom"
import { isEmpty } from "lodash"
export const LoanInformationHeader = () => {
  const { loanProgramDetails } = useLoanProgramDetailContext()
  const { draftForm } = useLoanApplicationContext()

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
          {isEmpty(draftForm) ? (
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
  const { step } = useLoanApplicationContext()

  return (
    <PlaidProvider>
      <LoanProgramDetailProvider>
        <LoanInformationHeader />
        <div className="flex h-full overflow-auto flex-1 py-6 pt-0 flex-col">
          <div className="pt-2 sticky top-0 z-10 bg-white shadow-md mb-4 px-2">
            <LoanApplicationStepNavigate />
          </div>
          <div className="grid grid-cols-8">
            {step === LOAN_APPLICATION_STEPS.LOAN_REQUEST && <LoanRequest />}
            {step === LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION && (
              <BusinessInformationForm />
            )}
            {step === LOAN_APPLICATION_STEPS.OWNER_INFORMATION && (
              <OwnerInformationForm />
            )}
            {step === LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION && (
              <FinancialInformationForm />
            )}
            {step === LOAN_APPLICATION_STEPS.CONFIRMATION && (
              <ConfirmationForm />
            )}
          </div>
        </div>
        <AlertFinishFormBeforeLeave />
      </LoanProgramDetailProvider>
    </PlaidProvider>
  )
}
