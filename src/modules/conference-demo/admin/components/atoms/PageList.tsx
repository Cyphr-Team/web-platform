import { type VisualizationPage } from "@/modules/loan-application-management/constants/type"
import { PagePreview } from "./PagePreview"

interface Props {
  visualizationsByPage: VisualizationPage[]
}

export function PageList({ visualizationsByPage }: Props) {
  return (
    <div className="flex h-full w-48 flex-col gap-2 overflow-auto">
      {visualizationsByPage
        ? visualizationsByPage.map((pagePreview, index) => (
            <PagePreview key={index} pagePreview={pagePreview} />
          ))
        : null}
    </div>
  )
}

export default PageList
