import { cn } from "@/lib/utils"

interface Props {
  label: string
  value: string
  className?: string
}
function BankAccountInformation({ label, value, className }: Props) {
  return (
    <div
      className={cn(
        "border border-l-0 border-t-0 md:grid md:grid-flow-row md:grid-cols-2",
        className
      )}
    >
      <div className="flex flex-1 py-xl pl-xl md:items-center xl:py-3xl xl:pl-3xl">
        <p className="break-words text-sm text-text-tertiary">{label}</p>
      </div>

      <div className="col-span-1 flex break-words pb-xl pl-xl pr-6 md:items-center md:justify-end md:pt-xl xl:py-3xl xl:pl-3xl">
        <p className="max-w-full overflow-visible truncate whitespace-normal break-words text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}

export default BankAccountInformation
