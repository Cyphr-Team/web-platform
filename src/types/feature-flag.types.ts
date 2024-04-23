type FeatureFlag = {
  id: string
  key: string
  description?: string
  tags?: string[]
  status: FeatureFlagStatus
  createdAt: string
  updatedAt: string
}

enum FeatureFlagStatus {
  ON = "on",
  OFF = "off"
}

export type { FeatureFlag }
export { FeatureFlagStatus }
