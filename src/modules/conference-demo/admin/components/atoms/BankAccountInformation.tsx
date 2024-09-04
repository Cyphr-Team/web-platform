import { cn } from "@/lib/utils"

interface Props {
  label: string
  value: string
  className?: string
}
const BankAccountInformation = ({ label, value, className }: Props) => (
  <div
    className={cn(
      "md:grid-cols-2 md:grid md:grid-flow-row border border-t-0 border-l-0",
      className
    )}
  >
    <div className="pl-xl xl:pl-3xl py-xl xl:py-3xl flex md:items-center flex-1">
      <p className="text-sm text-text-tertiary break-words">{label}</p>
    </div>

    <div className="pb-xl md:pt-xl xl:py-3xl pl-xl xl:pl-3xl flex md:items-center col-span-1 break-words pr-6 md:justify-end">
      <p className="font-medium text-sm truncate overflow-ellipsis overflow-visible whitespace-normal break-words max-w-full">
        {value}
      </p>
    </div>
  </div>
)

export default BankAccountInformation
