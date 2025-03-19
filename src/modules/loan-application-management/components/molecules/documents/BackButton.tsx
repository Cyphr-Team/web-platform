import { Button } from "@/components/ui/button"
import { APP_PATH } from "@/constants"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export function BackButton() {
  const { id } = useParams()

  return (
    <Button asChild className="text-dark p-0" type="button" variant="link">
      <Link to={APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENTS.details(id!)}>
        <ArrowLeft className="h-4.5 w-5" /> Back
      </Link>
    </Button>
  )
}
