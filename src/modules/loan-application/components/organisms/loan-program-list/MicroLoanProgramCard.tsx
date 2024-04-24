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
import { MicroLoanProgramType } from "@/types/loan-program.type"

type MicroLoanProgramCardProps = React.ComponentProps<typeof Card> & {
  loanProgram: MicroLoanProgramType
  additionalInfo?: string[]
}

export const MicroLoanProgramCard = ({
  className,
  loanProgram,
  additionalInfo,
  ...props
}: MicroLoanProgramCardProps) => {
  return (
    <Card className={cn(className, "flex flex-col rounded-2xl")} {...props}>
      <CardHeader className="space-y-2 pb-0 md:pb-0">
        <CardTitle>
          <p id="loan-type" className="text-sm mb-0.5 capitalize">
            {loanProgram.type}
          </p>
          {loanProgram.name}
        </CardTitle>
        <CardDescription className="text-foreground flex items-center">
          <span className="mr-2 align-middle">Up to</span>
          <span className="text-primary text-3xl font-semibold">
            {typeof loanProgram.maxLoanAmount === "number"
              ? toCurrency(loanProgram.maxLoanAmount, 0)
              : loanProgram.maxLoanAmount}
          </span>
        </CardDescription>
      </CardHeader>

      <div className="mx-6">
        <Separator className="my-5" />
      </div>

      <CardContent className="grid gap-4">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center font-semibold text-sm">
            <span className="mr-1.5">
              <Icons.greenCheckCircle />
            </span>
            {loanProgram.minTermInMonth} - {loanProgram.maxTermInMonth} months
          </li>
          <li className="flex items-center font-semibold text-sm">
            <span className="mr-1.5">
              <Icons.greenCheckCircle />
            </span>
            {loanProgram.interestRateDescription}
          </li>
          {additionalInfo?.map((info, index) => (
            <li key={index} className="flex items-center font-semibold text-sm">
              <span className="mr-1.5">
                <Icons.greenCheckCircle />
              </span>
              {info}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button className="w-full" asChild>
          <Link
            to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.detailWithId(
              loanProgram.id
            )}
            state={{ loanProgram }}
          >
            Learn More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
