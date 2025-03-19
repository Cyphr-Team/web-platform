import { useApplicationDetailForAdmin } from "../../hooks/useApplicationDetailForAdmin"
import { ChangeApplicationStatusButton } from "../molecules/button/ChangeApplicationStatusButton"

export function Header() {
  const application = useApplicationDetailForAdmin()

  return (
    <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-2 px-4xl lg:gap-4">
      <div className="flex flex-1 flex-wrap items-center gap-2 lg:gap-4">
        <h1 className="whitespace-nowrap text-3xl font-semibold">
          {application ? application.businessName : "Finovate Demo"}
        </h1>
      </div>

      <ChangeApplicationStatusButton />
    </div>
  )
}
