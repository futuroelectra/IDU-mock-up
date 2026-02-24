declare module 'next/font/local' {
  type LocalFontSource =
    | string
    | {
        path: string
        weight?: string
        style?: string
      }
    | Array<{
        path: string
        weight?: string
        style?: string
      }>

  type LocalFontOptions = {
    src: LocalFontSource
    display?: string
    weight?: string
    style?: string
    variable?: string
    fallback?: string[]
    preload?: boolean
    adjustFontFallback?: string | false
  }

  type LocalFontResult = {
    className: string
    variable: string
    style: {
      fontFamily: string
      fontWeight?: number
      fontStyle?: string
    }
  }

  export default function localFont(options: LocalFontOptions): LocalFontResult
}
