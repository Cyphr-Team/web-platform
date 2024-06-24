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
import { BaseLoanProgramType } from "@/types/loan-program.type"
import { KCC_LENDER_FORUM_PROGRAM } from "@/modules/loan-application/constants/loan-program.constants"

//THIS COMPONENT IS ONLY USED FOR KC CHAMBER
type CardProps = React.ComponentProps<typeof Card> & {
  loanProgram: BaseLoanProgramType
}

export const KCLoanProgramCard = ({
  className,
  loanProgram,
  ...props
}: CardProps) => {
  return (
    <Card className={cn(className, "flex flex-col rounded-2xl")} {...props}>
      <CardHeader className="space-y-5 pb-0 md:pb-0">
        <CardTitle className="tracking-normal">
          <p id="loan-type" className="text-sm mb-0.5 capitalize">
            {KCC_LENDER_FORUM_PROGRAM.name}
          </p>
          <p className="font-bold">{loanProgram.name}</p>
        </CardTitle>

        {!!loanProgram.description && (
          <CardDescription className="text-foreground flex items-center">
            <span
              className="text-lg whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: sanitizeDOM(loanProgram.description)
              }}
            />
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="mt-5">
        <Button className="ml-auto" asChild>
          <Link
            to={APP_PATH.LOAN_APPLICATION.INFORMATION.detailWithId(
              loanProgram.id
            )}
          >
            Start Application
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
