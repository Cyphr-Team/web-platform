import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useLoanDocumentDetailsContext } from "@/modules/loan-application-management/providers/LoanDocumentDetailsProvider"
import { convertToCamelCase } from "@/utils"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

export const PageViewerPanel: React.FC = () => {
  const {
    selectedPage,
    selectedVisualization,
    visualizationDetails,
    handleSelectVisualization
  } = useLoanDocumentDetailsContext()

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
        visualizationIdentifier
      ) as keyof typeof visualizationDetails.visualizationsDescription
    ]
  }

  const visualizationDescription = getVisualizationDescription(
    selectedVisualization?.visualizationIdentifier
  )
  return (
    <div className="flex justify-between w-full py-2 bg-gray-100">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex gap-2 items-center">
              <HelpCircle className="w-8 h-8 text-text-secondary" />
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
          <TooltipContent className="text-white bg-black p-2 max-w-60">
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
              onClick={() => handleSelectVisualization(visualization)}
              key={index}
            >
              <img
                src={visualization.thumbnailSmallUrl}
                alt="page"
                className="w-8 data-[selected=true]:border border-black"
                data-selected={selectedVisualization === visualization}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          <Button
            className="bg-black rounded-none rounded-tl-sm rounded-bl-sm px-2 disabled:opacity-50 disabled:bg-black"
            variant="link"
            onClick={handlePreviousVisualization}
            disabled={selectedVisualization === selectedPage?.visualizations[0]}
          >
            <ChevronLeft className="h-4 w-4 text-white" strokeWidth={3} />
          </Button>
          <Button
            className="bg-black rounded-none rounded-tr-sm rounded-br-sm px-2 disabled:opacity-50 disabled:bg-black"
            variant="link"
            onClick={handleNextVisualization}
            disabled={
              selectedVisualization ===
              selectedPage?.visualizations.slice(-1)[0]
            }
          >
            <ChevronRight className="h-4 w-4 text-white" strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  )
}
