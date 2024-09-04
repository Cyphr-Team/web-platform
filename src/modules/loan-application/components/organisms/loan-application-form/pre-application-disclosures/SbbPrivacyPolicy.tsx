import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import pdfFileIcon from "@/assets/pdf-file.svg"
import { PropsWithChildren, ReactNode } from "react"
import { useForm } from "react-hook-form"
import { RHFCheckbox } from "@/modules/form-template/components/molecules"
import { Button } from "@/components/ui/button.tsx"
import {
  SBB_PRE_APPLICATION_DISCLOSURES,
  sbbPreApplicationDisclosuresSchema,
  SbbPreApplicationDisclosuresValue
} from "./const"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { RHFProvider } from "@/modules/form-template/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"

const PRIVACY_POLICY_URL =
  "https://www.smallbusinessbank.com/wp-content/uploads/2019/07/Privacy-Notice-022018.pdf"

const SbbPrivacyPolicy = () => {
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
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
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

      <Card className="p-xl gap-2xl flex shadow-none items-center">
        <img src={pdfFileIcon} className="w-6 h-6" alt="file" />
        <div className="text-sm flex items-center h-full">
          SBB Privacy Notice.pdf
        </div>
        <Button type="button" className="ml-auto">
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">
            Download now
          </a>
        </Button>
      </Card>
      <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2xl">
          <RHFCheckbox
            control={form.control}
            name={SBB_PRE_APPLICATION_DISCLOSURES.PRIVACY_POLICY}
            label="I acknowledge receipt of Small Business Bank’s Privacy Policy."
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
    </Card>
  )
}

export default SbbPrivacyPolicy

const WhyWhatHow = () => {
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
          <div className="grid grid-cols-2 py-2 px-4">
            <ul className="list-disc list-inside">
              <li>Social Security number</li>
              <li>Account balances</li>
              <li>Transaction history</li>
            </ul>
            <ul className="list-disc list-inside">
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

const TableInformation = () => {
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
          value="How does Small Business Bank protect my personal information?"
          className="font-medium"
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
          value="How does Small Business Bank collect my personal information?"
          className="font-medium"
        />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col gap-xl">
              We collect your personal information, for example, when you:
              <ul className="list-disc list-inside">
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
        <Cell value="Why can’t I limit all sharing?" className="font-medium" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col gap-md">
              Federal laws give you the right to limit only:
              <ul className="list-disc list-inside">
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
      <Row variant="one" isHeader data={["Definitions"]} />
      <Row variant="two">
        <Cell value="Affiliates" className="font-medium" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col">
              Companies related by common ownership or control. They can be
              financial and nonfinancial companies.
              <ul className="list-disc list-inside">
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
        <Cell value="Nonaffiliates" className="font-medium" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col">
              Companies not related by common ownership or control. They can be
              financial and nonfinancial companies.
              <ul className="list-disc list-inside">
                <li>
                  Small Business Bank does not share with nonaffiliates so they
                  can market to you.
                </li>
              </ul>
            </div>
          }
        />
      </Row>
      <Row variant="two" isFinal>
        <Cell value="Joint marketing" className="font-medium" />
        <Cell
          className="col-span-6 border-l"
          value={
            <div className="flex flex-col">
              A formal agreement between nonaffiliated financial companies that
              together market financial products or services to you.
              <ul className="list-disc list-inside">
                <li>Small Business Bank does not jointly market.</li>
              </ul>
            </div>
          }
        />
      </Row>
    </section>
  )
}

const QuestionAndCall = () => {
  return (
    <section>
      <div className="flex flex-row px-3 py-2 gap-xl bg-[#EAECF0] text-sm">
        <div className="font-semibold">Questions?</div>
        <div>Call + 1 913-856-7199</div>
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

const Row = (props: RowProps) => {
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
      <Cell value={data.at(0)} className="col-span-4" />
      <Cell value={data.at(1)} className="col-span-6" />
    </>
  )
  const renderThree = variant === "three" && (
    <>
      <Cell value={data.at(0)} className="font-medium" />
      <Cell value={data.at(1)} className="border-x col-span-3" />
      <Cell value={data.at(2)} className="col-span-3" />
    </>
  )

  return (
    <div
      className={cn(
        "grid grid-cols-10 border items-center text-sm border-b-0",
        isHeader && "bg-table-heading font-semibold",
        isFinal && "border-b",
        className
      )}
    >
      {children && children}
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

const Cell = ({ value, className }: CellProps) => {
  return (
    <div className={cn("col-span-4 p-3 flex items-center h-full", className)}>
      {value}
    </div>
  )
}
