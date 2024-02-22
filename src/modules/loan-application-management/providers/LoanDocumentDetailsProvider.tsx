import { useCallback, useMemo, useState } from "react"
import { createContext, useContext } from "use-context-selector"
import {
  Visualization,
  VisualizationPage,
  VisualizationType
} from "../constants/type"
import { VISUALIZATION_DESCRIPTION } from "../constants"
import { useQueryGetDocumentDetails } from "../hooks/useQuery/useQueryDocumentDetails"
import { useParams } from "react-router-dom"
import {
  DocumentDetailsType,
  DocumentVisualizationType
} from "../constants/types/document"
import { useQueryGetDocumentVisualizations } from "../hooks/useQuery/useQueryDocumentVisualizations"
import { fetchProtectedImage } from "@/utils"
import { API_PATH } from "@/constants"
import { useUpdateEffect } from "react-use"

type LoanDocumentDetailsContextType = {
  scale: number
  zoomIn: () => void
  zoomOut: () => void
  visualizationDetails?: VisualizationType
  documentDetails?: DocumentDetailsType
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
    documentDetails: {} as DocumentDetailsType,
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

  const documentVisualizationData = useQueryGetDocumentVisualizations({
    applicationId: params.id ?? "",
    documentId: params.documentId ?? ""
  })

  const transformVisualizationData = useCallback(
    async (data: DocumentVisualizationType): Promise<VisualizationType> => {
      const path = API_PATH.loanApplicationDetails.getVisualizationImage(
        params?.id ?? "",
        params?.documentId ?? ""
      )

      const visualizationsByPage = data.detect?.visualizations?.map(
        async (page) => {
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
        }
      )
      return {
        formUuid: params.documentId ?? "",
        formType: data.documentType,
        totalSignalCount: data.detect?.signals?.length ?? 0,
        visualizationsByPage: await Promise.all(visualizationsByPage),
        visualizationsDescription: VISUALIZATION_DESCRIPTION
      }
    },
    [params.documentId, params?.id]
  )

  useUpdateEffect(() => {
    if (documentVisualizationData.data) {
      transformVisualizationData(documentVisualizationData.data).then(
        (data) => {
          setVisualizationDetails(data)
          setSelectedPage(data.visualizationsByPage[0])
          setSelectedVisualization(
            data.visualizationsByPage[0].visualizations[0]
          )
        }
      )
    }
  }, [documentVisualizationData.data])

  const providerValue = useMemo(
    () => ({
      scale,
      zoomIn,
      zoomOut,
      visualizationDetails: visualizationDetails,
      documentDetails: documentDetails.data,
      selectedVisualization,
      selectedPage,
      handleSelectPage,
      handleSelectVisualization
    }),
    [
      documentDetails.data,
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
