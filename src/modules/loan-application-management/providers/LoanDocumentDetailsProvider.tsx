import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { createContext, useContext } from "use-context-selector"
import {
  type Visualization,
  type VisualizationPage,
  type VisualizationType
} from "../constants/type"
import { VISUALIZATION_DESCRIPTION } from "../constants"
import { useQueryGetDocumentDetails } from "../hooks/useQuery/useQueryDocumentDetails"
import { useParams } from "react-router-dom"
import { type DocumentDetailsType } from "../constants/types/document"
import { fetchProtectedImage } from "@/utils"
import { API_PATH } from "@/constants"

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

  const documentDetails = useQueryGetDocumentDetails({
    applicationId: params.id ?? "",
    documentId: params.documentId ?? ""
  })

  const transformVisualizationData = useCallback(
    async (data: DocumentDetailsType): Promise<VisualizationType> => {
      const path = API_PATH.loanApplicationDetails.getVisualizationImage(
        params?.id ?? "",
        params?.documentId ?? ""
      )

      const visualizationsByPage = data.detect?.visualizations.length
        ? data.detect?.visualizations?.map(async (page) => {
            return {
              pageNumber: page.pageNumber,
              visualizations: await Promise.all(
                page.pageVisualizations?.map(async (visualization) => {
                  const imageUrl = `data:image/jpeg;base64,${await fetchProtectedImage(
                    path,
                    visualization.imageUrl
                  )}`
                  const thumbnailSmallUrl = `data:image/jpeg;base64,${await fetchProtectedImage(
                    path,
                    `${visualization.imageUrl}?size=sm`
                  )}`
                  const thumbnailMediumUrl = `data:image/bmp;base64,${await fetchProtectedImage(
                    path,
                    `${visualization.imageUrl}?size=md`
                  )}`

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
    [params.documentId, params?.id]
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
