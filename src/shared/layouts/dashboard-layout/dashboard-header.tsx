import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import { UserNav } from "./user-nav"
import { NavItem } from "@/types/common.type"

interface HeaderSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

export function Header({ items }: HeaderSidebarProps) {
  return (
    <div className="block md:hidden fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className={cn("block md:!hidden")}>
          <MobileSidebar items={items} />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <UserNav />
        </div>
      </nav>
    </div>
  )
}
