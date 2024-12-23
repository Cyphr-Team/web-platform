import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"
import { CustomLabelKey, buildCustomLabel, buildIds } from "@/utils/crumb.utils"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider"

import { sanitizeDOM } from "@/utils/file.utils"
import { TopBarDetail } from "@/modules/loan-application/components/layouts/TopBarDetail"
import { LoanProgramDetailWelcomeLine } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { random } from "lodash"
import { LoanProgramDetailApply } from "@/modules/loan-application/components/organisms/loan-program-detail/LoanProgramDetailApply"

const ELEMENTS_TYPE = {
  title: "title",
  subtitle: "subtitle",
  text: "text",
  list: "list",
  divider: "divider",
  numberList: "numberList"
}

interface Element {
  id: string
  type: string
  content?: string | string[]
  size?: string
  className?: string
}

const loanProgramText: Element[] = [
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "Why Capital Collab?",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    className: "my-2",
    content:
      "Navigating business financing can be complex, but <b>Capital Collab</b> makes it seamless. With access to <b>300+ bank and non-bank lenders</b>, we offer tailored solutions for nearly every business scenario. From <b>$25,000 loans to $5M</b> working capital options and up to <b>$25M for larger growth and expansion</b>, we provide funding that fits your unique needs."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    className: "my-1",
    content:
      "For more complex transactions, our <b>white-glove consultancy investment banking division</b> specializes in financing from $5M to $250M, delivering high-touch advisory to help you confidently execute strategic initiatives."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    className: "my-1",
    content:
      "Whether you need <b>working capital, equipment financing, SBA loans, real estate funding, revenue-based financing, or acquisition capital,</b> we have multiple options to meet your goals—all under one roof."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    content:
      "Upon applying, you’ll receive initial approvals or term sheets within 24 hours if you do not receive a call with from your dedicated Capital Advisor within one business hour if additional questions arise."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "How It Works:",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    className: "list-none pl-0",
    content: [
      "<b>1.  Assess Your Readiness:</b> Our intuitive AI tool evaluates your financial profile, identifying strengths and opportunities for improvement. You’ll know exactly how lenders view your business and where you stand.",
      "<b>2. Receive Personalized Coaching:</b> We provide a <b>dynamic, step-by-step action plan</b> tailored to strengthen your financial readiness—covering cash flow, credit positioning, and documentation preparation.",
      "<b>3. AI-Powered Lender Matching:</b> With our extensive network of <b>300+ lenders</b>, we match you to the right funding products, including:"
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    content: [
      "<b>Working Capital or Revenue-Based Financing (up to $5M)</b>",
      "<b>Equipment Financing</b>",
      "<b>SBA Loans (7a and 504)</b>",
      "<b>Commercial Real Estate Financing</b>",
      "<b>Term Loans & Lines of Credit</b>",
      "<b>Invoice / Purchase Order / Inventory Financing – Supply Chain Financing Solutions</b>",
      "<b>Acquisition & Expansion Capital</b>"
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    className: "list-none pl-0",
    content: [
      "<b>4. Quick Approvals & Support:</b> With our extensive network of <b>300+ lenders</b>, we match you to the right funding products, including:"
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    content: [
      "<b>Approvals in as quick as 1 hour up to 24 hours!</b>",
      "<b>Dedicated Capital Advisor:</b> A real human, ready to assist you within <b>1 business hour</b> to ensure your questions are answered and your path forward is clear."
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    className: "list-none pl-0",
    content: [
      "<b>5. White-Glove Investment Banking:</b> For deals between <b>$5M and $250M</b>, our team offers hands-on consultancy and custom solutions to handle complex financing with precision."
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    className: "mt-8",
    content: "Unlock More with Capital Collab+ (Coming Soon!)",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.subtitle,
    content: "Take your loan readiness to the next level with advanced tools:"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    content: [
      "<b>Generate Professional Financials:</b> Create lender-ready income statements, cash flow reports, and balance sheets—instantly.",
      "<b>Track Your Progress:</b> Use dynamic insights to measure improvements and refine your funding strategy."
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    className: "mt-8",
    content: "What sets us apart?",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    content:
      "Capital Collab isn’t just about securing loans—it’s about <b>empowering businesses to thrive:</b>"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.list,
    className: "-mt-8 list-none pl-0 space-y-4 pt-2",
    content: [
      "<b>✅  300+ Lender Network:</b> From $25K to $5M (and up to $250M), we have solutions for every stage of your business.",
      "<b>✅  Fast, Personalized Service:</b> Term sheets within 24 hours and access to your Capital Advisor within 1 hour.",
      "<b>✅  Tailored Insights & Support:</b> Dynamic coaching to help you improve and grow—long term. Whether you’re seeking your first loan, scaling operations, or preparing for a major expansion, Capital Collab is your trusted partner in achieving smarter, faster funding."
    ]
  }
]

export function ComponentWithProvider() {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  const crumbs = useBreadcrumb({
    customLabel: buildCustomLabel(
      CustomLabelKey.documentDetail,
      "Capital Collab"
    ),
    ids: Object.assign(
      {},
      buildIds(CustomLabelKey.documentDetail, loanProgramDetails?.id)
    )
  })

  const renderElement = (element: Element, className?: string) => {
    switch (element.type) {
      case ELEMENTS_TYPE.title:
        return (
          <h2 className={cn("mb-2 text-xl font-semibold", className)}>
            {element.content}
          </h2>
        )
      case ELEMENTS_TYPE.subtitle:
        return (
          <h2 className={cn("whitespace-pre-wrap text-base", className)}>
            {element.content}
          </h2>
        )
      case ELEMENTS_TYPE.text:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: !Array.isArray(element.content)
                ? sanitizeDOM(element.content)
                : ""
            }}
            className={cn("mb-10 whitespace-pre-wrap text-base", className)}
          />
        )
      case ELEMENTS_TYPE.list:
        return (
          <ul
            className={cn(
              "list-inside list-disc whitespace-pre-wrap pl-5 text-base",
              className
            )}
          >
            {Array.isArray(element.content) &&
              element.content.map((item) => (
                <li
                  dangerouslySetInnerHTML={{
                    __html: !Array.isArray(item) ? sanitizeDOM(item) : ""
                  }}
                  key={`${element.id}-${item}`}
                />
              ))}
          </ul>
        )
      case ELEMENTS_TYPE.numberList:
        return (
          <ol
            className={cn(
              "mb-10 list-outside list-decimal whitespace-pre-wrap pl-5 text-base",
              className
            )}
          >
            {Array.isArray(element.content) &&
              element.content.map((item) => (
                <li
                  dangerouslySetInnerHTML={{
                    __html: !Array.isArray(item) ? sanitizeDOM(item) : ""
                  }}
                  key={item}
                />
              ))}
          </ol>
        )
      case ELEMENTS_TYPE.divider:
        return <Separator className={cn("my-6", className)} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <div className={cn("col-span-10", "md:col-span-8")}>
          <TopBarDetail
            leftFooter={
              <div className="hidden md:block">
                <Breadcrumbs breads={crumbs} />
              </div>
            }
            rightFooter={
              <LoanProgramDetailApply
                btnText="Start application"
                className="bg-lime-400 font-bold text-black hover:bg-lime-300"
              />
            }
          />
        </div>

        <section className={cn("col-span-10", "md:col-span-8")}>
          {isLoading ? (
            <Skeleton className="align-center flex h-36 w-screen items-center md:h-60 md:w-[calc(100vw-15rem)] lg:max-h-64" />
          ) : (
            <Image
              alt="Cover Photo for Loan Program"
              className="mx-auto max-h-72 w-full max-w-full border-b object-cover"
              height={359}
              placeholderClassName="mx-auto max-h-64 max-w-full bg-slate-600"
              src={getImageURL(loanProgramDetails?.coverPhotoUrl)}
            />
          )}
        </section>

        <section
          className={cn(
            "col-span-10 p-6 pt-8",
            "md:col-span-6 md:col-start-2 md:px-0"
          )}
        >
          <LoanProgramDetailWelcomeLine />

          <br className="my-6" />

          {loanProgramText.map((element) => (
            <div key={element.id} className="mb-2">
              {renderElement(element, element.className)}
            </div>
          ))}
          <section className="mt-16 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary-solid px-8 py-9">
            <h2 className="mx-auto text-3xl font-semibold text-white md:mx-0 md:text-3xl">
              Ready to apply?
            </h2>
            <div className="mx-auto md:mx-0">
              <LoanProgramDetailApply
                btnText="Start application"
                className="bg-lime-400 font-bold text-black hover:bg-lime-300"
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default function CapitalCollabProgramDetail() {
  return (
    <LoanProgramDetailProvider>
      <ComponentWithProvider />
    </LoanProgramDetailProvider>
  )
}
