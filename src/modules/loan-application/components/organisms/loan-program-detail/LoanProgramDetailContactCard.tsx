import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { type Icon } from "@/components/ui/icons"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { Mail, Map, Phone, UserRound } from "lucide-react"

function ContactItem({
  Icon,
  content
}: {
  Icon: Icon
  content: React.ReactNode
}) {
  return (
    <li className="flex gap-2 text-sm items-center">
      <Icon className="shrink-0 self-start" /> {content}
    </li>
  )
}

export function LoanProgramDetailContactCard() {
  const { loanProgramInfo } = useLoanProgramDetailContext()

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="leading-tight">
          Not sure if this is right for you?
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          {loanProgramInfo?.contact?.mail ? (
            <ContactItem Icon={Mail} content={loanProgramInfo?.contact?.mail} />
          ) : null}
          {loanProgramInfo?.contact?.name ? (
            <ContactItem
              Icon={UserRound}
              content={loanProgramInfo?.contact?.name}
            />
          ) : null}
          {loanProgramInfo?.contact?.phone ? (
            <ContactItem
              Icon={Phone}
              content={loanProgramInfo?.contact?.phone}
            />
          ) : null}
          {loanProgramInfo?.contact?.location ? (
            <ContactItem
              Icon={Map}
              content={loanProgramInfo?.contact?.location}
            />
          ) : null}
        </ul>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <a href={`mailto:${loanProgramInfo?.contact?.mail}`}>Contact us</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
