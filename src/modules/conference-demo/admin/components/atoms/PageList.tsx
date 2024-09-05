import { VisualizationPage } from "@/modules/loan-application-management/constants/type"
import { PagePreview } from "./PagePreview"

type Props = {
  visualizationsByPage: VisualizationPage[]
}

export const PageList = ({ visualizationsByPage }: Props) => {
  return (
    <div className="flex flex-col h-full overflow-auto gap-2 w-48">
      {visualizationsByPage &&
        visualizationsByPage.map((pagePreview, index) => (
          <PagePreview key={index} pagePreview={pagePreview} />
        ))}
    </div>
  )
}

export default PageList
