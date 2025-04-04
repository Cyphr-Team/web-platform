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
import { Skeleton } from "@/components/ui/skeleton"
import { useGetUserInformation } from "@/hooks/useGetUserInformation"
import { useLogout } from "@/hooks/useLogout"

interface AccountProps {
  isCollapsed?: boolean
}

export function Account(
  { isCollapsed }: AccountProps = { isCollapsed: false }
) {
  const { signOut } = useLogout()
  const { data, isLoading } = useGetUserInformation()

  return (
    <DropdownMenu>
      <div className="flex items-center justify-center gap-3">
        <DropdownMenuTrigger asChild>
          <Button className="relative size-10 rounded-full" variant="ghost">
            <Avatar className="flex size-10 shrink-0 items-center justify-center space-y-0 rounded-full border">
              <AvatarImage alt={data?.name} src={data?.avatar ?? ""} />
              <AvatarFallback>{data?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {!isCollapsed && (
          <div className="w-full min-w-0 space-y-1">
            {isLoading ? (
              <Skeleton className="h-4 w-full border" />
            ) : (
              <p
                className="truncate text-sm font-medium leading-none"
                title={data?.name}
              >
                {data?.name}
              </p>
            )}
            {isLoading ? (
              <Skeleton className="h-4 w-full border" />
            ) : (
              <p
                className="truncate text-sm text-muted-foreground"
                title={data?.email}
              >
                {data?.email}
              </p>
            )}
          </div>
        )}
      </div>
      <DropdownMenuContent forceMount align="start" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex w-full flex-col space-y-1">
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p className="truncate text-sm font-medium leading-none">
                {data?.name}
              </p>
            )}
            <p className="truncate text-xs leading-none text-muted-foreground">
              {data?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
