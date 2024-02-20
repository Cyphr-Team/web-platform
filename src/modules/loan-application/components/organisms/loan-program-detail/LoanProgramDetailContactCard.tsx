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
import { Mail, Map, Phone } from "lucide-react"

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
  const { loanProgramDetail } = useLoanProgramDetailContext()

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="leading-tight">
          Not sure if this is right for you?
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          <ContactItem Icon={Mail} content={loanProgramDetail?.contact?.mail} />
          <ContactItem
            Icon={Phone}
            content={loanProgramDetail?.contact?.phone}
          />
          <ContactItem
            Icon={Map}
            content={loanProgramDetail?.contact?.location}
          />
        </ul>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <a href={`mailto:${loanProgramDetail?.contact?.mail}`}>Contact Us</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
