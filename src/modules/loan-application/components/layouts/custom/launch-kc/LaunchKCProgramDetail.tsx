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

const ELEMENTS_TYPE = {
  title: "title",
  text: "text",
  list: "list",
  divider: "divider"
}

type Element = {
  type: string
  content?: string | string[]
  size?: string
}

const loanProgramText: Element[] = [
  {
    type: ELEMENTS_TYPE.title,
    content: "Funding & Support",
    size: "3xl"
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "For nearly a decade, LaunchKC has provided early-stage startups with the tools, resources, capital, and talent they need to thrive and grow. If you are accepted into the 2025 LaunchKC Grants Program cohort, you will receive:"
  },
  {
    type: ELEMENTS_TYPE.list,
    content: [
      "$55,000 in equity-free funding",
      "Mentorship and networking opportunities",
      "Customized educational programming",
      "Support with office space in Downtown Kansas City for the year"
    ]
  },
  {
    type: ELEMENTS_TYPE.divider
  },
  {
    type: ELEMENTS_TYPE.title,
    content: "Eligibility Requirements",
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
      "U.S.-based, for-profit, pre-seed, and seed-stage with under $1 million in revenue",
      "Creating technology-enabled products or services with at least an MVP",
      "Innovative with a scalable business model",
      "Created with diversity and inclusion in mind",
      "Willing to locate their business headquarters, significant operations, and 51% of the founding team in Kansas City, Missouri for at least one year"
    ]
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "To be considered, please complete the application in its entirety by <b>September 16, 2024.</b>"
  },
  {
    type: ELEMENTS_TYPE.title,
    content: "Selection Process and Timeline"
  },
  {
    type: ELEMENTS_TYPE.list,
    content: [
      "Application Period: August 14th - September 16th, 2024",
      "Initial Review for Eligibility: September",
      "Round 1 Application Review: September - October",
      "Round 2: Second Application Review: October",
      "Round 3: In-person Interview: Week of October 28th",
      "Winners Notified: Early November",
      "Winners Announced: November 19th at LaunchKC event",
      "Program Year: January 2025 - December 2025"
    ]
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "<b>Please note, in-person attendance is required for Round 3 interviews the week of October 28th, the LaunchKC event on November 19th, and quarterly programming events throughout 2025.</b>"
  },
  {
    type: ELEMENTS_TYPE.title,
    content: "Application Requirements"
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "We have partnered with Cyphr to ensure a secure and efficient application submission experience."
  },
  {
    type: ELEMENTS_TYPE.text,
    content: "To submit your application, you will need to:"
  },
  {
    type: ELEMENTS_TYPE.list,
    content: [
      "Upload a pitch deck",
      "Upload a photo of your ID to verify your identity",
      "Connect your business bank account"
    ]
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "Cyphr ensures the confidentiality and security of your personal information. Access to your financial data is limited to LaunchKC’s administrative staff and will not be sold to third parties. Cyphr employs robust security measures, including encryption, secure servers, and access controls, to protect your data from unauthorized access, alteration, disclosure, or destruction."
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "To process your application, Cyphr may share your data with trusted third-party vendors who assist with application processing, legal diligence, identity verification, and customer support. You have the right to access or delete your personal information, and to object to or restrict its processing. For any inquiries or to exercise these rights, please contact us or the Cyphr team at support@cyphrai.com."
  },
  {
    type: ELEMENTS_TYPE.text,
    content:
      "Only complete applications submitted by <b>11:59 PM EST on September 16, 2024,</b> will be considered."
  },
  {
    type: ELEMENTS_TYPE.text,
    content: "We look forward to your application!"
  }
]

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

  const renderElement = (element: Element) => {
    switch (element.type) {
      case ELEMENTS_TYPE.title:
        return (
          <h2 className="text-2xl font-semibold mb-6">{element.content}</h2>
        )
      case ELEMENTS_TYPE.text:
        return (
          <div
            className="text-base whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: !Array.isArray(element.content)
                ? sanitizeDOM(element.content)
                : ""
            }}
          />
        )
      case ELEMENTS_TYPE.list:
        return (
          <ul className="list-disc list-inside text-base whitespace-pre-wrap pl-8">
            {Array.isArray(element.content) &&
              element.content.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        )
      case ELEMENTS_TYPE.divider:
        return <Separator className="my-6" />
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

          <br className="my-6" />

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
                  className="bg-lime-400 text-black hover:bg-lime-300"
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
