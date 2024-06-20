type FeatureFlag = {
  id: string
  key: string
  description?: string
  tags?: string[]
  status: FeatureFlagStatus
  rolloutType: FeatureFlagRolloutType
  createdAt: string
  updatedAt: string
}

enum FeatureFlagStatus {
  ON = "on",
  OFF = "off"
}

enum FeatureFlagRolloutType {
  WHITELIST = "whitelist",
  FULL = "full"
}

export type { FeatureFlag }
export { FeatureFlagStatus, FeatureFlagRolloutType }
