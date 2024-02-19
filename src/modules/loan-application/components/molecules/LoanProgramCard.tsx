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
import { LoanProgramData } from "../../constants/type"
import { Separator } from "@/components/ui/separator"
import { toCurrency } from "@/utils"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

type CardProps = React.ComponentProps<typeof Card> & {
  loanProgram: LoanProgramData
}

export const LoanProgramCard = ({
  className,
  loanProgram,
  ...props
}: CardProps) => {
  return (
    <Card className={cn(className, "flex flex-col rounded-2xl")} {...props}>
      <CardHeader className="space-y-2 pb-0 md:pb-0">
        <CardTitle>
          <p id="loan-type" className="text-sm mb-0.5">
            {loanProgram.type}
          </p>
          {loanProgram.name}
        </CardTitle>
        <CardDescription className="text-foreground flex items-center">
          {!!loanProgram.loanAmountRange && (
            <span className="mr-2 align-middle">
              {loanProgram.loanAmountRange}
            </span>
          )}
          <span className="text-primary text-3xl font-semibold">
            {typeof loanProgram.amount === "number"
              ? toCurrency(loanProgram.amount, 0)
              : loanProgram.amount}
          </span>
        </CardDescription>
      </CardHeader>

      <div className="mx-6">
        <Separator className="my-5" />
      </div>

      <CardContent className="grid gap-4">
        <ul className="flex flex-col gap-4">
          {Object.keys(loanProgram.meta).map((meta, idxKey) => (
            <li
              key={idxKey}
              className="flex items-center font-semibold text-sm"
            >
              <span className="mr-1.5">
                <Icons.greenCheckCircle />
              </span>
              {loanProgram.meta[meta]}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button className="w-full">
          Learn More
          <ArrowRight className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
