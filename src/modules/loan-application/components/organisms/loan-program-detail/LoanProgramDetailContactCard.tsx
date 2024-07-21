import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Icon } from "@/components/ui/icons"
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
          {loanProgramInfo?.contact?.mail && (
            <ContactItem Icon={Mail} content={loanProgramInfo?.contact?.mail} />
          )}
          {loanProgramInfo?.contact?.name && (
            <ContactItem
              Icon={UserRound}
              content={loanProgramInfo?.contact?.name}
            />
          )}
          {loanProgramInfo?.contact?.phone && (
            <ContactItem
              Icon={Phone}
              content={loanProgramInfo?.contact?.phone}
            />
          )}
          {loanProgramInfo?.contact?.location && (
            <ContactItem
              Icon={Map}
              content={loanProgramInfo?.contact?.location}
            />
          )}
        </ul>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <a href={`mailto:${loanProgramInfo?.contact?.mail}`}>Contact Us</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
