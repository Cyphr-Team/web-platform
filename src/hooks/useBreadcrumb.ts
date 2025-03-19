import { type CrumbData, type HandleCrumb } from "@/utils/crumb.utils"

import { type UIMatch, useMatches } from "react-router-dom"

export const useBreadcrumb = (data?: CrumbData) => {
  const matches = useMatches() as UIMatch<unknown, HandleCrumb>[]

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(data ?? {}))

  return crumbs
}
