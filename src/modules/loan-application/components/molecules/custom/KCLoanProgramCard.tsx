import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { APP_PATH } from "@/constants"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { sanitizeDOM } from "@/utils/file.utils"
import { type BaseLoanProgramType } from "@/types/loan-program.type"
import { KCC_LENDER_FORUM_PROGRAM } from "@/modules/loan-application/constants/loan-program.constants"

//THIS COMPONENT IS ONLY USED FOR KC CHAMBER
type CardProps = React.ComponentProps<typeof Card> & {
  loanProgram: BaseLoanProgramType
}

export function KCLoanProgramCard({
  className,
  loanProgram,
  ...props
}: CardProps) {
  return (
    <Card className={cn(className, "flex flex-col rounded-2xl")} {...props}>
      <CardHeader className="space-y-5 pb-0 md:pb-0">
        <CardTitle className="tracking-normal">
          <p className="mb-0.5 text-sm capitalize" id="loan-type">
            {KCC_LENDER_FORUM_PROGRAM.name}
          </p>
          <p className="font-bold">{loanProgram.name}</p>
        </CardTitle>

        {!!loanProgram.description && (
          <CardDescription className="flex items-center text-foreground">
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizeDOM(loanProgram.description)
              }}
              className="whitespace-pre-wrap text-lg"
            />
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="mt-5">
        <Button asChild className="ml-auto">
          <Link
            to={APP_PATH.LOAN_APPLICATION.INFORMATION.detailWithId(
              loanProgram.id
            )}
          >
            Start Application
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
