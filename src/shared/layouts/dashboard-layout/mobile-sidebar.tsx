import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoHeader } from "@/shared/atoms/LogoHeader"
import { type NavItem } from "@/types/common.type"
import { MenuIcon } from "lucide-react"
import { useState } from "react"
import { DashboardNav } from "./dashboard-nav"

interface MobileSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
}

export function MobileSidebar({ items }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="!px-0" side="left">
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4 px-3 py-2">
            <LogoHeader className="ml-2" />

            <div className="space-y-1">
              <DashboardNav items={items} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
