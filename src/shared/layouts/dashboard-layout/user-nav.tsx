import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetUserInformation } from "@/hooks/useGetUserInformation"
import { useLogout } from "@/hooks/useLogout"

export function UserNav() {
  const { signOut } = useLogout()
  const { data, isLoading } = useGetUserInformation()

  const session = {
    user: {
      image: data?.avatar,
      name: data?.name,
      email: data?.email
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative size-8 rounded-full" variant="ghost">
          <Avatar className="size-8">
            <AvatarImage
              alt={session.user?.name ?? ""}
              src={session.user?.image ?? ""}
            />
            <AvatarFallback>{session.user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <Skeleton className="h-4 w-full border" />
            ) : (
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
