/// <reference types="vite/client" />
import "@tanstack/react-table"

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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    columnViewName?: string
    /**
     * The ID of the filter button element, allowing us to find, focus, and click it.
     * @see src/components/ui/multi-select-round.tsx
     * @see src/modules/loan-application-management/components/table/applications-scores/workspace-admin-application-score-columns.tsx
     * @see src/shared/molecules/table/column-filter.tsx
     */
    filterID?: string
  }
}
