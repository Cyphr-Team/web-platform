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
import { StartApplicationButton } from "@/modules/loanready/components/molecules/StartApplicationButton"
import { random } from "lodash"

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
}

const loanProgramText: Element[] = [
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "Why LoanReady?",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    content:
      "Getting a loan can be complex. LoanReady simplifies the process, equipping you with the tools and insights you need to understand your financial readiness, boost your application success, and connect with the right resources. Whether you're applying for your first loan or looking to expand, LoanReady is designed with you in mind."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "How it works:",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.numberList,
    content: [
      "<b>Assess Your Readiness:</b> Our easy, step-by-step tool evaluates your financial profile and identifies strengths and areas for improvement, helping you see where you stand in the eyes of lenders.",
      "<b>Personalized Action Plan:</b> Based on your assessment, we create a customized plan that guides you through each step of the loan application process, from financial documentation to strategic planning.",
      "<b>Exclusive Resources & Discounts:</b> Gain access to our Resource Directory, filled with exclusive discounts from leading service providers in finance, marketing, legal, and more—everything you need to strengthen your business and prepare for growth. <b>[Coming Soon]</b>"
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "Unlock More with LoanReady+:",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.subtitle,
    content:
      "Take your loan readiness to the next level with LoanReady+. Enjoy everything LoanReady offers, plus powerful tools to give you a deeper understanding of your finances:"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.numberList,
    content: [
      "<b>Create & Download Financial Statements:</b> Easily generate professional financial statements like income statements, cash flow summaries, and more. These documents are lender-ready and available for download whenever you're prepared to apply."
    ]
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "What sets us apart?",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    content:
      "LoanReady is built for business owners like you. Unlike traditional readiness tools, we give you more than just a score; we provide actionable insights, real solutions, and a clear path forward. Think of us as your loan readiness co-pilot, with the tools, support, and partnerships to help you succeed."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content: "Start your LoanReady journey today",
    size: "3xl"
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.text,
    content:
      "Whether you’re looking for guidance on a business plan, ways to improve cash flow, or insight into how lenders view your business, LoanReady is here to help. Sign up today and take the first step toward financial empowerment and business success."
  },
  {
    id: random().toString(),
    type: ELEMENTS_TYPE.title,
    content:
      "Ready to get started? Click below to begin your journey with LoanReady."
  }
]

export function ComponentWithProvider() {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  const crumbs = useBreadcrumb({
    customLabel: buildCustomLabel(CustomLabelKey.documentDetail, "LoanReady"),
    ids: Object.assign(
      {},
      buildIds(CustomLabelKey.documentDetail, loanProgramDetails?.id)
    )
  })

  const renderElement = (element: Element) => {
    switch (element.type) {
      case ELEMENTS_TYPE.title:
        return <h2 className="mb-2 text-xl font-semibold">{element.content}</h2>
      case ELEMENTS_TYPE.subtitle:
        return (
          <h2 className="whitespace-pre-wrap text-base">{element.content}</h2>
        )
      case ELEMENTS_TYPE.text:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: !Array.isArray(element.content)
                ? sanitizeDOM(element.content)
                : ""
            }}
            className="mb-10 whitespace-pre-wrap text-base"
          />
        )
      case ELEMENTS_TYPE.list:
        return (
          <ul className="list-inside list-disc whitespace-pre-wrap pl-8 text-base">
            {Array.isArray(element.content) &&
              element.content.map((item) => (
                <li key={`${element.id}-${item}`}>{item}</li>
              ))}
          </ul>
        )
      case ELEMENTS_TYPE.numberList:
        return (
          <ol className="mb-10 list-outside list-decimal whitespace-pre-wrap pl-5 text-base">
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
        return <Separator className="my-6" />
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
              <StartApplicationButton
                showArrow
                btnText="Get my score"
                className="bg-lime-400 font-bold text-black hover:bg-lime-300"
                loanProgramId={loanProgramDetails?.id}
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
              {renderElement(element)}
            </div>
          ))}
          <section className="mt-16 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary-solid px-8 py-9">
            <h2 className="mx-auto text-3xl font-semibold text-white md:mx-0 md:text-3xl">
              Ready to get started?
            </h2>
            <div className="mx-auto md:mx-0">
              <StartApplicationButton
                showArrow
                btnText="Get my score"
                className="bg-lime-400 font-bold text-black hover:bg-lime-300"
                loanProgramId={loanProgramDetails?.id}
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default function LoanReadyV2ProgramDetail() {
  return (
    <LoanProgramDetailProvider>
      <ComponentWithProvider />
    </LoanProgramDetailProvider>
  )
}
