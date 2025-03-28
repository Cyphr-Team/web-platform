import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import pdfFileIcon from "@/assets/pdf-file.svg"
import { type PropsWithChildren, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { RHFCheckbox } from "@/modules/form-template/components/molecules"
import { Button } from "@/components/ui/button.tsx"
import {
  SBB_PRE_APPLICATION_DISCLOSURES,
  sbbPreApplicationDisclosuresSchema,
  type SbbPreApplicationDisclosuresValue
} from "./const"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

const PRIVACY_POLICY_URL =
  "https://www.smallbusinessbank.com/wp-content/uploads/2019/07/Privacy-Notice-022018.pdf"

function SbbPrivacyPolicy() {
  const { dispatchFormAction, privacyPolicy } = useLoanApplicationFormContext()
  const { finishCurrentStep } = useLoanApplicationProgressContext()
  const form = useForm<SbbPreApplicationDisclosuresValue>({
    mode: "onChange",
    resolver: zodResolver(sbbPreApplicationDisclosuresSchema),
    values: privacyPolicy,
    defaultValues: {
      [SBB_PRE_APPLICATION_DISCLOSURES.PRIVACY_POLICY]: false
    }
  })

  const onSubmit = (data: SbbPreApplicationDisclosuresValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.PRIVACY_POLICY,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.PRIVACY_POLICY)

  return (
    <FormLayout title="Privacy Policy">
      <h5 className="text-lg font-semibold">Privacy Policy</h5>
      <Separator />
      <section>
        <div className="text-sm">
          There are important documents related to opening an account at Small
          Business Bank. You must download and review our SBB Privacy Policy
        </div>
      </section>

      <WhyWhatHow />
      <TableInformation />
      <QuestionAndCall />

      <Card className="flex items-center gap-2xl p-xl shadow-none">
        <img alt="file" className="size-6" src={pdfFileIcon} />
        <div className="flex h-full items-center text-sm">
          SBB Privacy Notice.pdf
        </div>
        <Button className="ml-auto" type="button">
          <a href={PRIVACY_POLICY_URL} rel="noreferrer" target="_blank">
            Download now
          </a>
        </Button>
      </Card>
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2xl">
          <RHFCheckbox
            control={form.control}
            label="I acknowledge receipt of Small Business Bank’s Privacy Policy."
            name={SBB_PRE_APPLICATION_DISCLOSURES.PRIVACY_POLICY}
            styleProps={{
              checkboxClassName: "w-5 h-5",
              labelClassName: "text-xs text-primary"
            }}
          />

          <Button
            disabled={
              !form?.getValues(SBB_PRE_APPLICATION_DISCLOSURES.PRIVACY_POLICY)
            }
          >
            Next
          </Button>
        </div>
      </RHFProvider>
    </FormLayout>
  )
}

export default SbbPrivacyPolicy

function WhyWhatHow() {
  return (
    <section>
      <div className="grid grid-cols-12 items-center text-sm">
        <div className="col-span-1 font-bold">WHY?</div>
        <div className="col-span-11 p-4">
          Financial companies choose how they share your personal information.
          Federal law gives consumers the right to limit some but not all
          sharing. Federal law also requires us to tell you how we collect,
          share, and protect your personal information. Please read this notice
          carefully to understand what we do.
        </div>
        <Separator className="col-span-12" />
        <div className="col-span-1 font-bold">WHAT?</div>
        <div className="col-span-11 p-4">
          The types of personal information we collect and share depends on the
          product or service you have with us. This information can include:
          <div className="grid grid-cols-2 px-4 py-2">
            <ul className="list-inside list-disc">
              <li>Social Security number</li>
              <li>Account balances</li>
              <li>Transaction history</li>
            </ul>
            <ul className="list-inside list-disc">
              <li>Credit history</li>
              <li>Payment history</li>
              <li>Credit scores</li>
            </ul>
          </div>
          When you are no longer our customer, we continue to share your
          information as described in this notice.
        </div>
        <Separator className="col-span-12" />
        <div className="col-span-1 font-bold">HOW?</div>
        <div className="col-span-11 p-4">
          All financial companies need to share customers' personal information
          to run their everyday business. In the section below, we list the
          reasons financial companies can share their customers' personal
          information; the reasons Small Business Bank chooses to share; and
          whether you can limit this sharing.
        </div>
        <Separator className="col-span-12" />
      </div>
    </section>
  )
}

function TableInformation() {
  return (
    <section>
      <Row
        isHeader
        data={[
          "Reasons we can share your personal information",
          "Does SBB share?",
          "Can you limit this sharing?"
        ]}
        variant="three"
      />
      <Row
        data={[
          "For our everyday business purposes—such as to process your transactions, maintain your account(s), respond to court orders and legal investigations, or report to credit bureaus",
          "Yes",
          "No"
        ]}
        variant="three"
      />
      <Row
        data={[
          "For our marketing purposes—to offer our products and services to you",
          "No",
          "We don't share"
        ]}
        variant="three"
      />
      <Row
        data={[
          "For joint marketing with other financial companies",
          "No",
          "We don't share"
        ]}
        variant="three"
      />
      <Row
        data={[
          "For our affiliates’ everyday business purposes— information about your transactions and experiences",
          "No",
          "We don't share"
        ]}
        variant="three"
      />
      <Row
        data={[
          "For our affiliates’ everyday business purposes— information about your creditworthiness",
          "No",
          "We don't share"
        ]}
        variant="three"
      />
      <Row
        data={["For nonaffiliates to market to you", "No", "We don't share"]}
        variant="three"
      />

      <Row isHeader data={["What we do"]} variant="one" />
      <Row variant="two">
        <Cell
          className="font-medium"
          value="How does Small Business Bank protect my personal information?"
        />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col gap-2xl">
              <div>
                To protect your personal information from unauthorized access
                and use, we use security measures that comply with federal law.
                These measures include computer safeguards and secured files and
                buildings.
              </div>
              <div>
                Access to your personal information is restricted to those
                employees who need to know to provide products and services to
                you.
              </div>
            </div>
          }
        />
      </Row>
      <Row variant="two">
        <Cell
          className="font-medium"
          value="How does Small Business Bank collect my personal information?"
        />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col gap-xl">
              We collect your personal information, for example, when you:
              <ul className="list-inside list-disc">
                <li>Apply for a loan</li>
                <li>Pay us by check</li>
                <li>Provide employment information</li>
                <li>Give us your income information</li>
                <li>Give us your contact information</li>
              </ul>
              We also collect your personal information from others such as
              credit bureaus, affiliates, or other companies.
            </div>
          }
        />
      </Row>
      <Row variant="two">
        <Cell className="font-medium" value="Why can’t I limit all sharing?" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col gap-md">
              Federal laws give you the right to limit only:
              <ul className="list-inside list-disc">
                <li>
                  Sharing for affiliates’ everyday business purposes-information
                  about your creditworthiness
                </li>
                <li>Affiliates from using your information to market to you</li>
                <li>Sharing for nonaffiliates to market to you</li>
              </ul>
              State laws and individual companies may give you additional rights
              to limit sharing.
            </div>
          }
        />
      </Row>
      <Row isHeader data={["Definitions"]} variant="one" />
      <Row variant="two">
        <Cell className="font-medium" value="Affiliates" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col">
              Companies related by common ownership or control. They can be
              financial and nonfinancial companies.
              <ul className="list-inside list-disc">
                <li>
                  Small Business Bank has affiliates, but does not share your
                  information with its affiliates.
                </li>
              </ul>
            </div>
          }
        />
      </Row>
      <Row variant="two">
        <Cell className="font-medium" value="Nonaffiliates" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col">
              Companies not related by common ownership or control. They can be
              financial and nonfinancial companies.
              <ul className="list-inside list-disc">
                <li>
                  Small Business Bank does not share with nonaffiliates so they
                  can market to you.
                </li>
              </ul>
            </div>
          }
        />
      </Row>
      <Row isFinal variant="two">
        <Cell className="font-medium" value="Joint marketing" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col">
              A formal agreement between nonaffiliated financial companies that
              together market financial products or services to you.
              <ul className="list-inside list-disc">
                <li>Small Business Bank does not jointly market.</li>
              </ul>
            </div>
          }
        />
      </Row>
    </section>
  )
}

function QuestionAndCall() {
  return (
    <section>
      <div className="flex flex-row gap-xl bg-[#EAECF0] px-3 py-2 text-sm">
        <div className="font-semibold">Questions?</div>
        <div>Call 855-635-9696</div>
      </div>
    </section>
  )
}

interface RowProps extends PropsWithChildren {
  variant: "one" | "two" | "three"
  data?: ReactNode[]
  isHeader?: boolean
  isFinal?: boolean
  className?: string
}

function Row(props: RowProps) {
  const {
    data = [],
    isHeader = false,
    isFinal = false,
    variant,
    className,
    children
  } = props

  const renderOne = variant === "one" && (
    <Cell className="col-span-10" value={data.at(0)} />
  )
  const renderTwo = variant === "two" && (
    <>
      <Cell className="col-span-4" value={data.at(0)} />
      <Cell className="col-span-6" value={data.at(1)} />
    </>
  )
  const renderThree = variant === "three" && (
    <>
      <Cell className="font-medium" value={data.at(0)} />
      <Cell className="col-span-3 border-x" value={data.at(1)} />
      <Cell className="col-span-3" value={data.at(2)} />
    </>
  )

  return (
    <div
      className={cn(
        "grid grid-cols-10 items-center border border-b-0 text-sm",
        isHeader && "bg-table-heading font-semibold",
        isFinal && "border-b",
        className
      )}
    >
      {children ? children : null}
      {!children && renderOne}
      {!children && renderTwo}
      {!children && renderThree}
    </div>
  )
}

interface CellProps {
  value: ReactNode
  className?: string
}

function Cell({ value, className }: CellProps) {
  return (
    <div className={cn("col-span-4 flex h-full items-center p-3", className)}>
      {value}
    </div>
  )
}
