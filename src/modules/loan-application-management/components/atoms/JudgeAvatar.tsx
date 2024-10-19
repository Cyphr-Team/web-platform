import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { getAbbreviationForName } from "@/utils"
import { Check } from "lucide-react"

interface IListAvatar {
  name: string
  avatar?: string
  email?: string
  isScored?: boolean
  className?: string
}

export function CustomJudgeAvatar({ children }: React.PropsWithChildren) {
  return (
    <Avatar
      className={cn(
        "h-7 w-7 rounded-full overflow-hidden outline outline-1 outline-slate-400 bg-white -ml-0.5"
      )}
    >
      <AvatarFallback className="flex flex-row align-middle items-center justify-center bg-slate-300 h-full">
        {children}
      </AvatarFallback>
    </Avatar>
  )
}

export function ToolTipJudgeAvatar({
  name,
  avatar,
  email,
  isScored
}: IListAvatar) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger
          asChild
          className="hover:-translate-y-1 relative transition-transform"
        >
          <div className={cn("[&:not(:first-child)]:-ml-1.5 ")}>
            <JudgeAvatar
              avatar={avatar}
              email={email}
              isScored={isScored}
              name={name}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-text-tertiary text-xs">{email}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function JudgeAvatar({
  name,
  avatar,
  email,
  isScored,
  className
}: IListAvatar) {
  return (
    <div>
      <Avatar
        className={cn(
          "h-8 w-8 rounded-full border border-slate-400 bg-white",
          className
        )}
      >
        <AvatarImage alt={email ?? ""} src={avatar ?? ""} />
        <AvatarFallback className="flex flex-row align-middle items-center justify-center bg-gray-100 h-full cursor-default text-black">
          {getAbbreviationForName(name)}
        </AvatarFallback>
      </Avatar>

      {isScored ? (
        <Check className="w-3 h-3 p-0.5 flex-shrink-0 text-white absolute bg-green-500 bg-opacity-80 rounded-full left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
      ) : null}
    </div>
  )
}
