import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/providers/tenant-provider"
import { LoanPrograms } from "../organisms/LoanPrograms"
import { Image } from "@/shared/atoms/Image"
import { getImageURL } from "@/utils/aws.utils"
import { sanitizeDOM } from "@/utils/file.utils"
import { cn } from "@/lib/utils"
import { useQueryGetLoanPrograms } from "../../hooks/useQuery/useQueryLoanPrograms"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import { APP_PATH } from "@/constants"

function WelcomeLine() {
  const { tenantData } = useTenant()
  const { loanProgramWelcome, name } = tenantData ?? {}

  return (
    <section>
      {!isSbb() && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Welcome to {name}!
        </h2>
      )}
      <p
        dangerouslySetInnerHTML={{ __html: sanitizeDOM(loanProgramWelcome) }}
        className="text-lg whitespace-pre-wrap text-justify"
      />
    </section>
  )
}

export function Component() {
  const { tenantData } = useTenant()
  const loanPrograms = useQueryGetLoanPrograms()

  const navigate = useNavigate()

  const isPortalHasSpecialProgram = isLaunchKC() || isLoanReady()

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
      <div className="overflow-auto flex flex-col flex-1">
        <div className={cn("grid grid-cols-10", "md:grid-cols-8")}>
          <section className={cn("col-span-10", "md:col-span-8")}>
            <Image
              alt="Cover Photo for Institution"
              className="mx-auto max-h-72 object-cover w-full max-w-full border-b h-72"
              height={292}
              placeholderClassName="bg-slate-600 max-h-72 mx-auto max-w-full"
              src={getImageURL(tenantData?.loanProgramOverviewHeroImage)}
            />
          </section>

          <section
            className={cn(
              "pt-8 p-6 col-span-10",
              "md:px-0 md:col-span-6 md:col-start-2"
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
