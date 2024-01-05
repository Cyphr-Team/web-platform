import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import { ThemeToggle } from "./theme-toggle"
import { UserNav } from "./user-nav"
import foresightLogo from "/foresight.svg"

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden md:block">
          <img src={foresightLogo} className="logo" alt="Foresight logo" />
        </div>
        <div className={cn("block sm:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}
