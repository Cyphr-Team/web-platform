import { PropsWithChildren } from "react"

export const StatsTitle = ({ children }: PropsWithChildren) => {
  return <h1 className="text-2xl font-semibold mb-2">{children}</h1>
}
