import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import {
  disclaimerAndDisclosureFormSchema,
  DisclaimerAndDisclosureFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"

interface DisclaimerAndDisclosure {
  wrapperClassName?: string
  defaultChecked?: boolean
}
export const DisclaimerAndDisclosure = ({
  wrapperClassName,
  defaultChecked
}: DisclaimerAndDisclosure) => {
  const { dispatchFormAction, disclaimerAndDisclosure } =
    useLoanApplicationFormContext()
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const form = useForm<DisclaimerAndDisclosureFormValue>({
    resolver: zodResolver(disclaimerAndDisclosureFormSchema),
    values: {
      acknowledge:
        disclaimerAndDisclosure?.acknowledge ?? defaultChecked ?? false
    },
    mode: "onBlur"
  })

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE,
      state: data
    })
    finishCurrentStep()
  })

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE,
    true,
    true
  )

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm text-sm",
        wrapperClassName
      )}
      id={LOAN_APPLICATION_STEPS.DISCLAIMER_AND_DISCLOSURE}
    >
      <h5 className="text-lg font-semibold">
        SBB E-Sign Disclosure and Consent
      </h5>
      <p>
        This disclosure documents your consent to electronically receive all
        communications, disclosures, notices, advisories, and periodic
        statements, relative to certain deposit accounts, services, and loans
        you maintain or for which you have submitted an application with Small
        Business Bank ("Bank"). This disclosure also describes your rights
        relative to receiving disclosures, notices, and advisories
        electronically, as well as the effects of withdrawing your consent. We
        recommend you print and retain a copy of this disclosure and all the
        disclosures and agreements related to this transaction.
      </p>
      <p>
        You consent to receive one or more of the following documents
        electronically, depending on the type of accounts, services, and loans
        you obtain from the Bank, including any legal disclosures, loan
        disclosures, loan documents, service agreements, account agreements,
        periodic account statements and related disclosures, notices, and
        appraisals or valuations.
      </p>
      <p>
        You have the right to have these document(s) provided to you on paper.
        To receive paper copies of any document(s), you must submit a written
        request to 13423 W. 92nd Street Lenexa, KS 66215. Future notices will
        continue to be delivered electronically unless otherwise specified. As a
        mobile bank, Small Business Bank reserves the right to close your
        account if you are unable to receive electronic communications.
      </p>
      <p>
        If you consent to receive documents electronically, this will replace
        traditional paper documents mailed to you. Electronic statements will be
        delivered to you electronically in Portable Document Format (“PDF”) that
        you can view online, save to your computer, or print at your
        convenience.
      </p>
      <p>
        You understand and agree that by consenting to receive electronic
        statements, you will not receive paper account statements by mail.
      </p>
      <p>
        You have the right to withdraw consent for electronic delivery of all
        document(s) and communications. To withdraw this consent, you must
        contact the Bank in writing at 13423 W. 92nd Street, Lenexa, KS 66215.
        If you withdraw consent of electronic delivery you will receive
        documents and communications by mail.We will not impose a fee to process
        the withdrawal of your consent to receive electronic communications. Any
        withdrawal of your consent to receive electronic communications will be
        effective only after we have a reasonable time period to process your
        withdrawal.
      </p>
      <p>
        It is your responsibility to provide the Bank with accurate and complete
        contact information, including e-mail address, and any other information
        related to the accounts. You may update such information by contacting
        the Bank at the address or telephone number listed below:
      </p>
      <div>
        <p>Small Business Bank</p>
        <p>13423 W. 92nd Street</p>
        <p>Lenexa, KS 66215</p>
        <p>1-855-635-9696</p>
      </div>
      <p>
        To receive an electronic copy of disclosures, notices, and advisories
        you must have the following minimum hardware and software to access and
        retain the electronic document(s)
      </p>
      <p>
        Personal computer or other device capable of internet access and
        retention/printing the document; internet access; internet web browser
        capable of supporting TLS 1.2 or greater encrypted communications;
        current web browser, and a system/device with TLS 1.2 or greater
        encryption software: software permitting receipt and access to Portable
        Document Format files, such as the current Adobe Acrobat Reader. If the
        Bank changes the hardware or software requirements, the Bank will
        provide you with a statement of the revised hardware and software
        requirements.
      </p>
      <p>
        I request the Bank to provide me with the applicable communications,
        disclosures, advisories, documents, or periodic statements in electronic
        format. By checking the box below, I confirm that I meet, at a minimum,
        the hardware and software requirements listed above to receive and
        retain electronic disclosures, advisories, and documents.
      </p>

      <Form {...form}>
        <FormField
          control={form.control}
          name="acknowledge"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <div className="flex gap-2 mt-1 items-center">
                  <Checkbox
                    id="acknowledge-disclosure"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-5 w-5"
                  />
                  <label
                    className="text-xs text-text-primary"
                    htmlFor="acknowledge-disclosure"
                  >
                    I agree to the SBB E-Sign disclosure and to sign documents
                    electronically with Small Business Bank.
                  </label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            onSubmit={onSubmit}
            isDisabled={!form.formState.isValid}
          />
        )}
      </Form>
    </Card>
  )
}
