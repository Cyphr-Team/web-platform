import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Icon } from "@/components/ui/icons"
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
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="leading-tight">
          Not sure if this is right for you?
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          <ContactItem Icon={Mail} content="coaches@altcap.org" />
          <ContactItem Icon={Phone} content="(833) 549-2890" />
          <ContactItem
            Icon={Map}
            content="300 E 39th St, Suite 3G, Kansas City, MO 64111"
          />
        </ul>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="outline">
          Contact Us
        </Button>
      </CardFooter>
    </Card>
  )
}
