import { Button } from "@/components/ui/button"
import { Construction } from "lucide-react"

export function LoanProgramDetailUnderConstruction() {
  return (
    <Button disabled variant="outline">
      Under Construction <Construction className="ml-1 w-4" />
    </Button>
  )
}
