import {
  type DocumentDetailsType,
  type Visualization,
  type VisualizationPage,
  type VisualizationType
} from "@/modules/conference-demo/admin/constants/type"
import { useQueryGetDocumentDetails } from "@/modules/conference-demo/admin/hooks/conference/useQuery"
import { VISUALIZATION_DESCRIPTION } from "@/modules/loan-application-management/constants"
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useParams } from "react-router-dom"
import { createContext, useContext } from "use-context-selector"

interface LoanDocumentDetailsContextType {
  scale: number
  zoomIn: () => void
  zoomOut: () => void
  visualizationDetails?: VisualizationType
  documentDetails?: DocumentDetailsType
  selectedVisualization: Visualization | null
  selectedPage: VisualizationPage | null
  handleSelectPage: (page: VisualizationPage) => void
  handleSelectVisualization: (visualization: Visualization) => void
  isLoadingDetail?: boolean
}

export const LoanDocumentDetailsContext =
  createContext<LoanDocumentDetailsContextType>({
    scale: 1,
    zoomIn: () => ({}),
    zoomOut: () => ({}),
    visualizationDetails: {} as VisualizationType,
    documentDetails: {} as DocumentDetailsType,
    selectedVisualization: null,
    selectedPage: null,
    handleSelectPage: () => ({}),
    handleSelectVisualization: () => ({}),
    isLoadingDetail: true
  })

export function LoanDocumentDetailsProvider({ children }: PropsWithChildren) {
  const [selectedPage, setSelectedPage] = useState<VisualizationPage | null>(
    null
  )
  const params = useParams()

  const [selectedVisualization, setSelectedVisualization] =
    useState<Visualization | null>(selectedPage?.visualizations[0] ?? null)

  const [visualizationDetails, setVisualizationDetails] = useState<
    VisualizationType | undefined
  >(undefined)

  const [scale, setScale] = useState(1)

  const zoomIn = useCallback(() => {
    if (scale > 4) return
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

  const documentDetails = useQueryGetDocumentDetails()

  const transformVisualizationData = useCallback(
    async (data: DocumentDetailsType): Promise<VisualizationType> => {
      const visualizationsByPage = data.detect?.visualizations.length
        ? data.detect?.visualizations?.map(async (page) => {
            return {
              pageNumber: page.pageNumber,
              visualizations: await Promise.all(
                page.pageVisualizations?.map(async (visualization) => {
                  const imageUrl = `${visualization.imageUrl}.png`
                  const thumbnailSmallUrl = `${visualization.imageUrl}_sm.png`
                  const thumbnailMediumUrl = `${visualization.imageUrl}_md.png`

                  return {
                    visualizationIdentifier: visualization.visualType,
                    imageUrl: imageUrl,
                    thumbnailSmallUrl: thumbnailSmallUrl,
                    thumbnailMediumUrl: thumbnailMediumUrl
                  }
                }) ?? []
              ),
              pageDocPk: page.pageNumber.toString(),
              pageSignalCount: page.pageVisualizations.length
            } as VisualizationPage
          })
        : []

      return {
        formUuid: params.documentId ?? "",
        formType: data.documentType,
        totalSignalCount: data.detect?.signals?.length ?? 0,
        visualizationsByPage: visualizationsByPage.length
          ? await Promise.all(visualizationsByPage)
          : [],
        visualizationsDescription: VISUALIZATION_DESCRIPTION
      }
    },
    [params.documentId]
  )

  useEffect(() => {
    if (documentDetails.data) {
      transformVisualizationData(documentDetails.data).then((data) => {
        setVisualizationDetails(data)
        setSelectedPage(data.visualizationsByPage[0])
        if (data.visualizationsByPage[0]?.visualizations[0]) {
          setSelectedVisualization(
            data.visualizationsByPage[0].visualizations[0]
          )
        }
      })
    }
  }, [documentDetails.data, transformVisualizationData])

  const providerValue = useMemo(
    () => ({
      scale,
      zoomIn,
      zoomOut,
      visualizationDetails: visualizationDetails,
      documentDetails: documentDetails.data,
      isLoadingDetail: documentDetails.isLoading,
      selectedVisualization,
      selectedPage,
      handleSelectPage,
      handleSelectVisualization
    }),
    [
      documentDetails.data,
      documentDetails.isLoading,
      scale,
      selectedPage,
      selectedVisualization,
      visualizationDetails,
      zoomIn,
      zoomOut
    ]
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
