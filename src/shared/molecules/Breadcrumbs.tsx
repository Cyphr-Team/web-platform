import { ChevronRight, HomeIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function Breadcrumbs() {
  return (
    <div className="flex space-x-lg items-center px-4xl">
      <Link to="/">
        <HomeIcon className="h-5 w-5" />
      </Link>
      <ChevronRight className="text-text-senary" />
      <Link to="/">
        <p className="text-sm font-medium">Applications</p>
      </Link>{" "}
      <ChevronRight className="text-text-senary" />
      <Link to="/">
        <p className="text-sm font-medium text-primary">Latte Larry</p>
      </Link>{" "}
    </div>
  )
}
