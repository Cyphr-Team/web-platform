import useCanAccess, { type FeatureKey } from "@/hooks/useCanAccess"
import type { PropsWithChildren } from "react"

interface IFeatureRendererProps extends PropsWithChildren {
  featureKey: FeatureKey
}

export function FeatureRenderer({
  featureKey,
  children
}: IFeatureRendererProps) {
  const { getCanAccess } = useCanAccess({ featureKey })

  return getCanAccess() ? children : null
}
