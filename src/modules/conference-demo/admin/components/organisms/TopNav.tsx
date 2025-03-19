import { ScrollArea, ScrollBar } from "@/components/ui/scroll"
import { cn } from "@/lib/utils"
import { Link, useLocation, useParams } from "react-router-dom"
import { APPLICATION_MENU } from "../../constants"

export function TopNav() {
  const pathname = useLocation().pathname
  const { id = "" } = useParams()

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center space-x-lg px-4xl")}>
          {APPLICATION_MENU.map((example, index) => (
            <Link
              key={example.href(id)}
              className={cn(
                "flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-xs pb-lg text-center text-sm font-semibold transition-colors",
                "hover:border-primary hover:text-primary",
                pathname?.startsWith(example.href(id)) ||
                  (index === 0 && pathname === "/")
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              )}
              to={example.href(id)}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
