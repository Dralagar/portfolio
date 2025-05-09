/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  // Add other env variables here if needed
  readonly VITE_SANITY_PROJECT_ID: string
  readonly VITE_SANITY_DATASET: string
  readonly VITE_SANITY_API_VERSION: string
  readonly VITE_SANITY_USE_CDN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  
} 