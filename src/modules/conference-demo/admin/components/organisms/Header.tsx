import { ChangeApplicationStatusButton } from "../molecules/button/ChangeApplicationStatusButton"

export function Header() {
  return (
    <div className="flex gap-2 lg:gap-4 flex-1 w-full px-4xl items-center flex-wrap justify-between">
      <div className="flex gap-2 lg:gap-4 flex-1 items-center flex-wrap">
        <h1 className="text-3xl font-semibold whitespace-nowrap">
          Finovate Demo
        </h1>
      </div>

      <ChangeApplicationStatusButton />
    </div>
  )
}
