declare module 'next/dist/lib/metadata/types/metadata-interface.js' {
  import type { Metadata, Viewport } from 'next'

  export type ResolvingMetadata = Promise<Metadata>
  export type ResolvingViewport = Promise<Viewport>
}
