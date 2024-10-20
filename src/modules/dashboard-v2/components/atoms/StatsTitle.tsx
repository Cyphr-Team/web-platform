import { type PropsWithChildren } from "react"

export function StatsTitle({ children }: PropsWithChildren) {
  return <h1 className="text-2xl font-semibold mb-2">{children}</h1>
}
