/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_MEASUREMENT_ID: string
  readonly VITE_PUBLIC_ENDPOINT: string
  readonly VITE_BASE_SUBDOMAIN: string
  readonly VITE_PERSONA_ENVIRONMENT: "sandbox" | "production"
  readonly VITE_STYTCH_PUBLIC_TOKEN: string
  readonly VITE_GOOGLE_PLACE_API_KEY: string
  readonly VITE_STRIPE_PUBLIC_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
