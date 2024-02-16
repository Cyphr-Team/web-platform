import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/useLogout"
import { inMemoryJWTService } from "@/services/jwt.service"

interface AccountProps {
  isCollapsed?: boolean
}

export function Account(
  { isCollapsed }: AccountProps = { isCollapsed: false }
) {
  const { signOut } = useLogout()

  const userInfo = inMemoryJWTService.getUserInfo()

  const userName = userInfo?.username.split("@")?.[0] ?? ""
  const userEmail = userInfo?.username ?? ""

  return (
    <DropdownMenu>
      <div className="flex items-center justify-center gap-3">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="flex h-10 w-10 items-center justify-center space-y-0 border rounded-full flex-shrink-0">
              <AvatarImage src={userInfo?.avatar ?? ""} alt={userName} />
              <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {!isCollapsed && (
          <div className="space-y-1 min-w-0">
            <p
              className="text-sm font-medium leading-none truncate"
              title={userName}
            >
              {userName}
            </p>
            <p
              className="text-sm text-muted-foreground truncate"
              title={userEmail}
            >
              {userEmail}
            </p>
          </div>
        )}
      </div>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
