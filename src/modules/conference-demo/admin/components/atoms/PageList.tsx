import { type VisualizationPage } from "@/modules/loan-application-management/constants/type"
import { PagePreview } from "./PagePreview"

interface Props {
  visualizationsByPage: VisualizationPage[]
}

export function PageList({ visualizationsByPage }: Props) {
  return (
    <div className="flex flex-col h-full overflow-auto gap-2 w-48">
      {visualizationsByPage
        ? visualizationsByPage.map((pagePreview, index) => (
            <PagePreview key={index} pagePreview={pagePreview} />
          ))
        : null}
    </div>
  )
}

export default PageList
