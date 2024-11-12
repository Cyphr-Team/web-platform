import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toCurrency } from "@/utils"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { APP_PATH } from "@/constants"
import { type MicroLoanProgramType } from "@/types/loan-program.type"

type MicroLoanProgramCardProps = React.ComponentProps<typeof Card> & {
  loanProgram: MicroLoanProgramType
  additionalInfo?: string[]
}

export function MicroLoanProgramCard({
  className,
  loanProgram,
  additionalInfo,
  ...props
}: MicroLoanProgramCardProps) {
  return (
    <Card className={cn(className, "flex flex-col rounded-2xl")} {...props}>
      <CardHeader className="space-y-2 pb-0 md:pb-0">
        <CardTitle>
          <p className="mb-0.5 text-sm capitalize" id="loan-type">
            {loanProgram.type}
          </p>
          {loanProgram.name}
        </CardTitle>
        <CardDescription className="flex items-center text-foreground">
          <span className="mr-2 align-middle">Up to</span>
          <span className="text-3xl font-semibold text-primary">
            {toCurrency(loanProgram.maxLoanAmount, 0)}
          </span>
        </CardDescription>
      </CardHeader>

      <div className="mx-6">
        <Separator className="my-5" />
      </div>

      <CardContent className="grid gap-4">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center text-sm font-semibold">
            <span className="mr-1.5">
              <Icons.greenCheckCircle />
            </span>
            {loanProgram.minTermInMonth} - {loanProgram.maxTermInMonth} months
          </li>
          <li className="flex items-center text-sm font-semibold">
            <span className="mr-1.5">
              <Icons.greenCheckCircle />
            </span>
            {loanProgram.interestRateDescription}
          </li>
          {additionalInfo?.map((info) => (
            <li key={info} className="flex items-center text-sm font-semibold">
              <span className="mr-1.5">
                <Icons.greenCheckCircle />
              </span>
              {info}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link
            state={{ loanProgram }}
            to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
              loanProgram.id
            )}
          >
            Learn More
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
