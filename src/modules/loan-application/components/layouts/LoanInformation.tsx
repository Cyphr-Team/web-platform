import { APP_PATH } from "@/constants"
import { LOAN_APPLICATION_STEPS } from "../../constants"
import { useLoanApplicationContext } from "../../providers"
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

export const Component = () => {
  const { step } = useLoanApplicationContext()

  return (
    <PlaidProvider>
      <TopBarDetail
        breads={[
          {
            to: APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
              "artcap-express"
            ),
            label: "ARTcap Express"
          },
          {
            to: "#",
            label: "Loan Application"
          }
        ]}
        rightFooter={
          <div className="flex gap-2">
            <LoanApplicationSave />
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

      <div className="flex overflow-auto h-full flex-1 py-6 flex-col">
        <div className="mx-auto max-w-[80%]">
          <LoanApplicationStepNavigate />

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
          {step === LOAN_APPLICATION_STEPS.CONFIRMATION && <ConfirmationForm />}
        </div>
      </div>
    </PlaidProvider>
  )
}
