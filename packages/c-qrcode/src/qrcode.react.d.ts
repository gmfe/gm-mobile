/**
 * qrcode.react@1.x 类型声明（该版本未自带 d.ts，仓库也未安装 @types/qrcode.react）
 * 仅声明本仓库用到的 props。
 */
declare module 'qrcode.react' {
  import { Component } from 'react'

  interface QRCodeReactProps {
    value: string
    size?: number
    level?: 'L' | 'M' | 'Q' | 'H'
    bgColor?: string
    fgColor?: string
    includeMargin?: boolean
    imageSettings?: {
      src: string
      height: number
      width: number
      excavate: boolean
      x?: number
      y?: number
    }
  }

  class QRCodeReact extends Component<QRCodeReactProps> {}

  export default QRCodeReact
}
