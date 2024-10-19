import { APP_CONFIGS } from "@/configs"

const awsConfig = {
  publicAssetDomain:
    APP_CONFIGS.VITE_PUBLIC_ENDPOINT ?? "https://cdn.cyphrai.dev"
}

export const publicAssetDomain = awsConfig.publicAssetDomain
