import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
interface AccountProps {
  isCollapsed?: boolean
}

export function Account(
  { isCollapsed }: AccountProps = { isCollapsed: false }
) {
  return (
    <div className="flex items-center justify-center pt-3xl border-t">
      <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border rounded-full">
        <AvatarImage src="/avatars/02.png" alt="Avatar" />
        <AvatarFallback>LL</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Latte Larry</p>
          <p className="text-sm text-muted-foreground"> larry@borrower.com</p>
        </div>
      )}
    </div>
  )
}
