import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import { UserNav } from "./user-nav"
import { type NavItem } from "@/types/common.type"

interface HeaderSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

export function Header({ items }: HeaderSidebarProps) {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed inset-x-0 top-0 z-20 block border-b bg-background/95 backdrop-blur md:hidden">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className={cn("block md:!hidden")}>
          <MobileSidebar items={items} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  )
}
