import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { CustomLabelKey, buildCustomLabel, buildIds } from "@/utils/crumb.utils"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { TopNav } from "../molecules/TopNav"
import { BasicInformation } from "../organisms/BasicInformation"
import { useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { loanKybDetail } = useLoanApplicationDetailContext()
  const { id, documentId } = useParams()

  const crumbs = useBreadcrumb({
    customLabel: buildCustomLabel(
      CustomLabelKey.loanApplicationDetail,
      loanKybDetail?.businessDetails?.name?.value ?? ""
    ),
    ids: Object.assign(
      {},
      buildIds(CustomLabelKey.loanApplicationDetail, id),
      buildIds(CustomLabelKey.documentDetail, documentId)
    )
  })

  return (
    <div className="flex flex-col w-full h-full pt-4xl">
      <Breadcrumbs breads={crumbs} />
      <div className="flex flex-col space-y-3xl border-b mt-xl">
        <BasicInformation />
        <TopNav />
      </div>
      <div
        className={cn(
          "p-4xl pt-3xl flex-1 overflow-auto",
          isEnableCashFlowV2() && "bg-gray-50"
        )}
      >
        {children}
      </div>
    </div>
  )
}
