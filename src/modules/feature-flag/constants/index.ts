import {
  FeatureFlag,
  FeatureFlagStatus
} from "../../../types/feature-flag.types"

export const FAKE_DATA: FeatureFlag[] = [
  {
    id: "97451829-5ea8-48f3-95d7-c0e983f02f4d",
    status: FeatureFlagStatus.OFF,
    key: "SUBSCRIPTION",
    createdAt: "2023-08-08T03:28:38.57111Z",
    updatedAt: "2024-03-11T09:13:22.751278Z"
  },
  {
    id: "bfda3127-3eaf-41f2-a6b7-07e7274acd40",
    status: FeatureFlagStatus.ON,
    key: "ONBOARDING",
    description: "Turn on onboarding feature flag",
    createdAt: "2023-10-02T08:14:54.399572Z",
    updatedAt: "2024-03-12T03:22:53.024172Z"
  },
  {
    id: "e130189c-5d05-4f03-9590-a092759a6d33",
    status: FeatureFlagStatus.ON,
    key: "CUSTOMER",
    description: "Turn on customer feature flag",
    createdAt: "2023-08-02T06:40:31.340113Z",
    updatedAt: "2023-08-02T07:13:22.761584Z"
  },
  {
    id: "57de57ae-0235-41e3-a621-a1fb35937175",
    status: FeatureFlagStatus.ON,
    key: "SETTINGS",
    description: "Allow user to view the settings related to a specific user",
    createdAt: "2023-08-28T03:33:35.27198Z",
    updatedAt: "2023-09-14T08:15:17.189692Z"
  }
]
