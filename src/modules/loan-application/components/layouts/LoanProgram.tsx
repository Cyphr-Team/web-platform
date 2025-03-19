import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { LoanPrograms } from "../organisms/LoanPrograms"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"
import { sanitizeDOM } from "@/utils/file.utils"
import { cn } from "@/lib/utils"
import { useQueryGetLoanPrograms } from "@/modules/loan-application/hooks/program/useQueryLoanPrograms.ts"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import {
  isCapitalCollab,
  isLaunchKC,
  isLoanReady,
  isSbb
} from "@/utils/domain.utils"
import { APP_PATH } from "@/constants"

function WelcomeLine() {
  const { tenantData } = useTenant()
  const { loanProgramWelcome, name } = tenantData ?? {}

  return (
    <section>
      {!isSbb() && (
        <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
          Welcome to {name}!
        </h2>
      )}
      <p
        dangerouslySetInnerHTML={{ __html: sanitizeDOM(loanProgramWelcome) }}
        className="whitespace-pre-wrap text-justify text-lg"
      />
    </section>
  )
}

export function Component() {
  const { tenantData } = useTenant()
  const loanPrograms = useQueryGetLoanPrograms()

  const navigate = useNavigate()

  const isPortalHasSpecialProgram =
    isLaunchKC() || isLoanReady() || isCapitalCollab()

  // ONLY FOR LAUNCH KC
  // Because launch KC only has one program
  useEffect(() => {
    const loanProgramsData = loanPrograms.data?.data ?? []

    if (isPortalHasSpecialProgram && loanProgramsData?.length > 0) {
      navigate(
        APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
          loanPrograms.data?.data[0]?.id ?? ""
        )
      )
    }
  }, [isPortalHasSpecialProgram, loanPrograms.data?.data, navigate])

  return (
    !isPortalHasSpecialProgram && (
      <div className="flex flex-1 flex-col overflow-auto">
        <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
          <section className={cn("col-span-10", "md:col-span-8")}>
            <Image
              alt="Cover Photo for Institution"
              className="mx-auto h-72 max-h-72 w-full max-w-full border-b object-cover"
              height={292}
              placeholderClassName="mx-auto max-h-72 max-w-full bg-slate-600"
              src={getImageURL(tenantData?.loanProgramOverviewHeroImage)}
            />
          </section>

          <section
            className={cn(
              "col-span-10 p-6 pt-8",
              "md:col-span-6 md:col-start-2 md:px-0"
            )}
          >
            <div>
              <WelcomeLine />
            </div>

            <Separator className="my-6" />

            <div>
              <LoanPrograms loanPrograms={loanPrograms.data?.data ?? []} />
            </div>
          </section>
        </div>
      </div>
    )
  )
}

Component.displayName = "LoanProgram"
