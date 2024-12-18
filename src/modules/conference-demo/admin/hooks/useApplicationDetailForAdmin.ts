import { useParams } from "react-router-dom"
import { MOCK_APPLICATIONS } from "../constants/application-data"

export const useApplicationDetailForAdmin = () => {
  const { id } = useParams<{ id: string }>()
  const application = MOCK_APPLICATIONS.find(
    (application) => application.applicationIdNumber.toString() === id
  )

  return application
}
