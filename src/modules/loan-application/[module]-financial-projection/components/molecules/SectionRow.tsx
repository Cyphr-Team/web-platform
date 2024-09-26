import { cn } from "@/lib/utils.ts"

interface TableTitleProps {
  title: string
  className?: string
}

export const SectionRow = (props: TableTitleProps) => {
  const { title, className = "" } = props
  return (
    <div
      className={cn(
        "flex items-center p-4 text-sm font-bold border-t border-t-black",
        className
      )}
    >
      {title}
    </div>
  )
}
