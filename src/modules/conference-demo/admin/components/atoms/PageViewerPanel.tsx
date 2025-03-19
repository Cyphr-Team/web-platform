import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useLoanDocumentDetailsContext } from "@/modules/conference-demo/admin/providers/LoanDocumentDetailsProvider"
import { convertToCamelCase } from "@/utils"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

function PageViewerPanel() {
  const {
    selectedPage,
    selectedVisualization,
    visualizationDetails,
    handleSelectVisualization
  } = useLoanDocumentDetailsContext()

  if (!visualizationDetails) return null
  const handleNextVisualization = () => {
    const index = selectedPage?.visualizations.findIndex(
      (visualization) => visualization === selectedVisualization
    )

    if (index === -1 || index === undefined) return
    const nextVisualization = selectedPage?.visualizations[index + 1]

    if (nextVisualization) handleSelectVisualization(nextVisualization)
  }

  const handlePreviousVisualization = () => {
    const index = selectedPage?.visualizations.findIndex(
      (visualization) => visualization === selectedVisualization
    )

    if (index === -1 || index === undefined) return
    const previousVisualization = selectedPage?.visualizations[index - 1]

    if (previousVisualization) handleSelectVisualization(previousVisualization)
  }

  const getVisualizationDescription = (visualizationIdentifier?: string) => {
    if (!visualizationIdentifier) return

    return visualizationDetails.visualizationsDescription[
      convertToCamelCase(
        visualizationIdentifier.toLowerCase()
      ) as keyof typeof visualizationDetails.visualizationsDescription
    ]
  }

  const visualizationDescription = getVisualizationDescription(
    selectedVisualization?.visualizationIdentifier
  )

  return (
    <div className="flex w-full justify-between bg-gray-100 py-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-2">
              <HelpCircle className="size-8 text-text-secondary" />
              <div className="flex flex-col text-left">
                <p className="text-sm font-semibold">
                  {visualizationDescription?.displayName}
                </p>
                <p className="text-xs text-text-secondary">
                  Data Visualization
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-60 bg-black p-2 text-white">
            <p className="text text-xs">
              {visualizationDescription?.description}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-1">
        <div className="flex gap-1">
          {selectedPage?.visualizations.map((visualization, index) => (
            <div
              key={index}
              onClick={() => handleSelectVisualization(visualization)}
            >
              <img
                alt="page"
                className="w-8 border-black data-[selected=true]:border"
                data-selected={selectedVisualization === visualization}
                src={visualization.thumbnailSmallUrl}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          <Button
            className="rounded-none rounded-l-sm bg-black px-2 disabled:bg-black disabled:opacity-50"
            disabled={selectedVisualization === selectedPage?.visualizations[0]}
            variant="link"
            onClick={handlePreviousVisualization}
          >
            <ChevronLeft className="size-4 text-white" strokeWidth={3} />
          </Button>
          <Button
            className="rounded-none rounded-r-sm bg-black px-2 disabled:bg-black disabled:opacity-50"
            disabled={
              selectedVisualization ===
              selectedPage?.visualizations.slice(-1)[0]
            }
            variant="link"
            onClick={handleNextVisualization}
          >
            <ChevronRight className="size-4 text-white" strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PageViewerPanel
