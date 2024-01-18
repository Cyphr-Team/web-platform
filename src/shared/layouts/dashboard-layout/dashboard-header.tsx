import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import { ThemeToggle } from "./theme-toggle"
import { UserNav } from "./user-nav"
import foresightLogo from "/foresight.svg"
import foresightLogoText from "@/assets/foresight-text.svg"

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden md:block">
          <div className="flex items-center space-x-3">
            <img src={foresightLogo} alt="Foresight logo" width={32} />

            <img
              src={foresightLogoText}
              alt="Foresight logo"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className={cn("block md:!hidden")}>
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
