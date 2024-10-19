import { Button } from "@/components/ui/button"
import { ChevronRight, Mail } from "lucide-react"
import { type ReactNode } from "react"

export function ButtonContactForMoreUsage({ content }: { content: ReactNode }) {
  return (
    <Button
      asChild
      className="px-0 h-7 text-text-secondary w-full flex justify-between text-xs"
      size="sm"
      variant="link"
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
