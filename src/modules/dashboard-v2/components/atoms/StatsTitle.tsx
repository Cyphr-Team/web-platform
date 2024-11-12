import { type PropsWithChildren } from "react"

export function StatsTitle({ children }: PropsWithChildren) {
  return <h1 className="mb-2 text-2xl font-semibold">{children}</h1>
}
