import { useCallback, useMemo, useState } from "react"
import { createContext, useContext } from "use-context-selector"
import {
  Visualization,
  VisualizationPage,
  VisualizationType
} from "../constants/type"
import { FAKE_VISUALIZATION_DATA } from "../constants"

type LoanDocumentDetailsContextType = {
  scale: number
  zoomIn: () => void
  zoomOut: () => void
  visualizationDetails: VisualizationType
  selectedVisualization: Visualization | null
  selectedPage: VisualizationPage | null
  handleSelectPage: (page: VisualizationPage) => void
  handleSelectVisualization: (visualization: Visualization) => void
}

export const LoanDocumentDetailsContext =
  createContext<LoanDocumentDetailsContextType>({
    scale: 1,
    zoomIn: () => {},
    zoomOut: () => {},
    visualizationDetails: {} as VisualizationType,
    selectedVisualization: null,
    selectedPage: null,
    handleSelectPage: () => {},
    handleSelectVisualization: () => {}
  })

type Props = {
  children: React.ReactNode
}

export const LoanDocumentDetailsProvider: React.FC<Props> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState<VisualizationPage | null>(
    FAKE_VISUALIZATION_DATA.visualizationsByPage[0] ?? null
  )
  const [selectedVisualization, setSelectedVisualization] =
    useState<Visualization | null>(selectedPage?.visualizations[0] ?? null)

  const [scale, setScale] = useState(1)

  const zoomIn = useCallback(() => {
    if (scale > 2) return
    setScale((scale) => scale * 1.2) // Zoom in by 20%
  }, [scale])

  const zoomOut = useCallback(() => {
    if (scale < 0.5) return
    setScale((scale) => scale / 1.2) // Zoom out by 20%
  }, [scale])

  const handleSelectPage = (page: VisualizationPage) => {
    setSelectedPage(page)
    setSelectedVisualization(page.visualizations[0])
  }

  const handleSelectVisualization = (visualization: Visualization) => {
    setSelectedVisualization(visualization)
  }

  const providerValue = useMemo(
    () => ({
      scale,
      zoomIn,
      zoomOut,
      visualizationDetails: FAKE_VISUALIZATION_DATA,
      selectedVisualization,
      selectedPage,
      handleSelectPage,
      handleSelectVisualization
    }),
    [scale, selectedPage, selectedVisualization, zoomIn, zoomOut]
  )

  return (
    <LoanDocumentDetailsContext.Provider value={providerValue}>
      {children}
    </LoanDocumentDetailsContext.Provider>
  )
}

export const useLoanDocumentDetailsContext = () => {
  return useContext(LoanDocumentDetailsContext)
}
