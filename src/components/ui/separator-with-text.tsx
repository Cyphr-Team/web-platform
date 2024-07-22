type SeparatorWithTextProps = {
  text: string
}

export function SeparatorWithText({ text }: SeparatorWithTextProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-background px-2 text-muted-foreground">{text}</span>
      </div>
    </div>
  )
}
