import { createElement } from "react"
import React from "react"
import { isArray } from "lodash"

import {
  checkEnabledFeatureFlag,
  checkEnabledFeatureFlags
} from "@/utils/feature-flag.utils"
import { type FEATURE_FLAGS } from "@/constants/feature-flag.constants"

interface Props<P> {
  ffKey?: FEATURE_FLAGS | FEATURE_FLAGS[]
  component?: React.FC<P>
  fallbackComponent?: React.FC<P>
  children?: React.ReactNode
  fallBackChildren?: React.ReactNode
}

/**
 * Renders a component or fallback component based on the provided feature flag key.
 *
 * @template P - The props type for the component.
 * @param {Props<P>} props - The component props.
 * @param {string | string[]} props.ffKey - The feature flag key(s) to check.
 * @param {React.ReactNode} [props.children=null] - The children to render if the feature flag is enabled.
 * @param {React.ComponentType<P>} [props.component] - The component to render if the feature flag is enabled.
 * @param {React.ComponentType<P>} [props.fallbackComponent] - The fallback component to render if the feature flag is disabled.
 * @param {React.ReactNode} [props.fallBackChildren=null] - The fallback children to render if the feature flag is disabled and `ffKey` is provided.
 * @returns {React.ReactNode} - The rendered component or fallback component.
 */

export function FeatureFlagsRenderer<P extends object>({
  ffKey,
  children = null,
  component,
  fallbackComponent,
  fallBackChildren = null
}: Props<P>) {
  if (
    isArray(ffKey)
      ? checkEnabledFeatureFlags(ffKey)
      : ffKey && checkEnabledFeatureFlag(ffKey)
  ) {
    return <>{createElement(component ?? React.Fragment, null, children)}</>
  }

  return (
    <>
      {createElement(
        fallbackComponent ?? React.Fragment,
        null,
        ffKey ? fallBackChildren : children // if ffKey is not provided, render children
      )}
    </>
  )
}
