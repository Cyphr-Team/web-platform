import { Button } from "@/components/ui/button"
import { Dot } from "@/components/ui/dot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { LoanDecisionEnum } from "../../../constants"

export const ChangeApplicationStatusButton = () => {
  return (
    <div className="flex items-center gap-2 self-start md:self-center">
      <div className="flex items-center text-sm font-medium">Status:</div>

      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full px-10">
              <Dot variantColor="green" />
              Approve <ChevronDown className="ml-1 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 m-0">
            {Object.keys(LoanDecisionEnum).map((decision) => {
              return (
                <DropdownMenuItem
                  className="cursor-pointer py-2 font-medium"
                  key={decision}
                >
                  <Dot variantColor="green" />
                  Approve
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </div>
  )
}
