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
        "-ml-0.5 size-7 overflow-hidden rounded-full bg-white outline outline-1 outline-slate-400"
      )}
    >
      <AvatarFallback className="flex h-full flex-row items-center justify-center bg-slate-300 align-middle">
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
          className="relative transition-transform hover:-translate-y-1"
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
          <div className="text-xs text-text-tertiary">{email}</div>
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
          "size-8 rounded-full border border-slate-400 bg-white",
          className
        )}
      >
        <AvatarImage alt={email ?? ""} src={avatar ?? ""} />
        <AvatarFallback className="flex h-full cursor-default flex-row items-center justify-center bg-gray-100 align-middle text-black">
          {getAbbreviationForName(name)}
        </AvatarFallback>
      </Avatar>

      {isScored ? (
        <Check className="absolute left-1/2 top-0 size-3 shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 bg-opacity-80 p-0.5 text-white" />
      ) : null}
    </div>
  )
}
