import { Button } from "@/components/ui/button"
import { ChevronRight, Mail } from "lucide-react"
import { ReactNode } from "react"

export const ButtonContactForMoreUsage = ({
  content
}: {
  content: ReactNode
}) => {
  return (
    <Button
      variant="link"
      size="sm"
      className="px-0 h-7 text-text-secondary w-full flex justify-between text-xs"
      asChild
    >
      <a href="mailto:info@cyphrai.com?subject=Contact%20Sales">
        <span className="flex items-center">
          <Mail className="mr-0.5 h-4" />
          {content}
        </span>
        <ChevronRight className="h-3" />
      </a>
    </Button>
  )
}
