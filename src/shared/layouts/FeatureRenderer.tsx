import useCanAccess, { FeatureKey } from "@/hooks/useCanAccess"
import { FC } from "react"

interface IFeatureRendererProps {
  featureKey: FeatureKey
}

export const FeatureRenderer: FC<
  React.PropsWithChildren<IFeatureRendererProps>
> = ({ featureKey, children }) => {
  const { getCanAccess } = useCanAccess({ featureKey })

  return getCanAccess() ? children : null
}
