interface FeatureFlag {
  id: string
  key: string
  description?: string
  tags?: string[]
  enabled: boolean
  rolloutType: FeatureFlagRolloutType
  createdAt: string
  updatedAt: string
}

enum FeatureFlagRolloutType {
  WHITELIST = "whitelist",
  FULL = "full"
}

export type { FeatureFlag }

export { FeatureFlagRolloutType }
