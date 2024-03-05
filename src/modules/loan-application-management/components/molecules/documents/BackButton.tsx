import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export const BackButton = () => {
  const { id } = useParams()

  return (
    <Button type="button" variant="link" className="p-0 text-dark" asChild>
      <Link to={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(id!)}>
        <ArrowLeft className="w-5 h-4.5" /> Back
      </Link>
    </Button>
  )
}
