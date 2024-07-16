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
import { TopBarDetail } from "../../TopBarDetail"
import { LoanProgramDetailApply } from "../../../organisms/loan-program-detail/LoanProgramDetailApply"
import { LoanProgramDetailUnderConstruction } from "../../../organisms/loan-program-detail/LoanProgramDetailUnderConstruction"
import { LoanProgramDetailWelcomeLine } from "../../../organisms/loan-program-detail/LoanProgramDetailWelcomeLine"
import { sanitizeDOM } from "@/utils/file.utils"

export const ComponentWithProvider = () => {
  const { loanProgramInfo, isLoading, loanProgramDetails } =
    useLoanProgramDetailContext()

  const crumbs = useBreadcrumb({
    customLabel: buildCustomLabel(
      CustomLabelKey.documentDetail,
      loanProgramDetails?.name ?? ""
    ),
    ids: Object.assign(
      {},
      buildIds(CustomLabelKey.documentDetail, loanProgramDetails?.id)
    )
  })

  const ELEMENTS_TYPE = {
    title: "title",
    text: "text",
    list: "list"
  }

  type Element = {
    type: string
    content: string | string[]
    size?: string
  }

  const loanProgramText: Element[] = [
    {
      type: ELEMENTS_TYPE.title,
      content: "About",
      size: "3xl"
    },
    {
      type: ELEMENTS_TYPE.text,
      content:
        "We believe the promise of tomorrow starts with championing the people building it today. At LaunchKC, we look for companies that are:"
    },
    {
      type: ELEMENTS_TYPE.list,
      content: [
        "Founders with pre-seed and seed stage companies",
        "Companies with an innovative and scalable business model",
        "Technology-enabled solutions",
        "Diverse founder teams with a desire to help Kansas City’s ecosystem grow",
        "A strong desire to grow your business in Kansas City"
      ]
    },
    {
      type: ELEMENTS_TYPE.title,
      content: "Funding & Support",
      size: "3xl"
    },
    {
      type: ELEMENTS_TYPE.text,
      content:
        "For nearly a decade, LaunchKC has given early-stage startups the tools, resources, capital, and talent they need to thrive and grow. Each year, our grant recipients receive a share of a $500,000 investment and also receive:"
    },
    {
      type: ELEMENTS_TYPE.list,
      content: [
        "One-on-one mentorship with industry experts",
        "Curated programming, fundraising support, and access to the LaunchKC network",
        "Free office space in Downtown Kansas City"
      ]
    },
    {
      type: ELEMENTS_TYPE.title,
      content: "Eligibility Requirements",
      size: "3xl"
    },
    {
      type: ELEMENTS_TYPE.text,
      content:
        "Thank you for your interest in applying to the 2024 LaunchKC Grants Program! To be considered, please complete the application in its entirety by <strong>September 16, 2024</strong>."
    },
    {
      type: ELEMENTS_TYPE.title,
      content: "Awardees will receive:",
      size: "3xl"
    },
    {
      type: ELEMENTS_TYPE.list,
      content: [
        "$50,000 in equity-free funding",
        "Office space in Downtown Kansas City",
        "Customized quarterly programming",
        "Mentorship and networking opportunities"
      ]
    },
    {
      type: ELEMENTS_TYPE.title,
      content: "Eligibility Criteria:",
      size: "3xl"
    },
    {
      type: ELEMENTS_TYPE.list,
      content: [
        "Must be a for-profit entity",
        "Provide a technology-based product, service, or solution",
        "Have a scalable business model",
        "Be an early-stage company (validated idea stage through seed stage funding; less than $1 million in revenue)",
        "Be a US based company",
        "Willing to relocate to Kansas City, Missouri for at least one year. This includes business headquarters, significant operations, and 51% of the founding team (or 1 Founder and 51% of the team). Your HQ must be within Kansas City county lines."
      ]
    },
    {
      type: ELEMENTS_TYPE.title,
      content: "Selection Process and Timeline:"
    },
    {
      type: ELEMENTS_TYPE.list,
      content: [
        "Initial Review for Eligibility (September)",
        "Round 1: Application Review (September - October)",
        "Round 2: Second Application Review (October)",
        "Round 3: In-person Interview (Week of October 30th)",
        "Winners notified (Early November)",
        "Winners announced to public at LaunchKC event (November 14th)",
        "Program year runs January 2024 - December 2024"
      ]
    },
    {
      type: ELEMENTS_TYPE.title,
      content: "Important Notes:"
    },
    {
      type: ELEMENTS_TYPE.list,
      content: [
        "In-person participation is required for Round 3 interviews the week of October 28th, the LaunchKC event on November 19th, and quarterly programming events throughout 2025.",
        "The application consists of multiple choice, short answer, and short essay questions. All questions are required.",
        "You will need to upload a one-page executive summary and a pitch deck.",
        "Ensure you have your driver’s license or government ID and access to your bank statements.",
        "Only complete applications submitted by 11:59 PM EST on September 16, 2024 will be considered."
      ]
    }
  ]

  const renderElement = (element: Element) => {
    switch (element.type) {
      case ELEMENTS_TYPE.title:
        return (
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            {element.content}
          </h2>
        )
      case ELEMENTS_TYPE.text:
        return (
          <div
            className="text-lg whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: !Array.isArray(element.content)
                ? sanitizeDOM(element.content)
                : ""
            }}
          />
        )
      case ELEMENTS_TYPE.list:
        return (
          <ul className="list-disc list-inside text-lg whitespace-pre-wrap">
            {Array.isArray(element.content) &&
              element.content.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="overflow-auto flex flex-col flex-1">
      <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
        <div className={cn("col-span-10", "md:col-span-8")}>
          <TopBarDetail
            leftFooter={
              <div className="hidden md:block">
                {<Breadcrumbs breads={crumbs} />}
              </div>
            }
            rightFooter={
              loanProgramInfo?.isUnderConstruction ? (
                <LoanProgramDetailUnderConstruction />
              ) : (
                <LoanProgramDetailApply btnText={loanProgramInfo?.startBtn} />
              )
            }
          />
        </div>

        <section className={cn("col-span-10", "md:col-span-8")}>
          {isLoading ? (
            <Skeleton className="w-screen md:w-[calc(100vw-15rem)] h-36 md:h-60 lg:max-h-64 items-center align-center flex" />
          ) : (
            <Image
              className="mx-auto max-h-72 object-cover w-full max-w-full border-b"
              src={getImageURL(loanProgramDetails?.coverPhotoUrl)}
              placeholderClassName="bg-slate-600 max-h-64 mx-auto max-w-full"
              alt="Cover Photo for Loan Program"
              height={359}
            />
          )}
        </section>

        <section
          className={cn(
            "pt-8 p-6 col-span-10",
            "md:px-0 md:col-span-6 md:col-start-2"
          )}
        >
          <LoanProgramDetailWelcomeLine />

          <Separator className="my-6" />

          {loanProgramText.map((element, index) => (
            <div key={index} className="mb-6">
              {renderElement(element)}
            </div>
          ))}
          <section className="mt-8 px-8 py-9 bg-primary-solid rounded-2xl flex justify-between flex-wrap gap-4 items-center w-full">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mx-auto md:mx-0">
              Ready to Apply?
            </h2>
            <div className="mx-auto md:mx-0">
              {loanProgramInfo?.isUnderConstruction ? (
                <LoanProgramDetailUnderConstruction />
              ) : (
                <LoanProgramDetailApply
                  className="bg-lime-300 text-black"
                  btnText={loanProgramInfo?.startBtn}
                />
              )}
            </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export const Component = () => {
  return (
    <LoanProgramDetailProvider>
      <ComponentWithProvider />
    </LoanProgramDetailProvider>
  )
}

Component.displayName = "loanProgramInfo"
