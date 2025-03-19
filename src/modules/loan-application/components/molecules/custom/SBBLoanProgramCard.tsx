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
import { SBB_LOAN_PROGRAMS } from "@/modules/loan-application/constants/loan-program.constants"
import { Badge } from "@/components/ui/badge"

//THIS COMPONENT IS ONLY USED FOR SBB
type CardProps = React.ComponentProps<typeof Card> & {
  loanProgram: BaseLoanProgramType
}

export function SBBLoanProgramCard({
  className,
  loanProgram,
  ...props
}: CardProps) {
  const foundLoanProgram = SBB_LOAN_PROGRAMS.find(
    (program) => loanProgram.name === program.name
  )

  return (
    <Card className={cn(className, "flex flex-col rounded-2xl")} {...props}>
      <CardHeader className="space-y-5 pb-0 md:pb-0">
        <CardTitle className="tracking-normal">
          <p className="mb-0.5 text-sm capitalize" id="loan-type">
            {foundLoanProgram?.type}
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
        <Badge
          className="border-gray h-7 px-lg py-xs text-sm font-semibold"
          variant="outline"
        >
          {foundLoanProgram?.type}
        </Badge>
        <Button asChild className="ml-auto">
          <Link
            state={{ loanProgram }}
            to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
              loanProgram.id
            )}
          >
            Learn more
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
