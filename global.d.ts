/**
 * 图片
 */
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'

/** 其它需要后续添加 */
interface Window {
  __NAME__: string
  __CLIENT_NAME__: string
  __VERSION__: string
}

declare const __NAME__ = 'mobile'
declare const __CLIENT_NAME__ = 'mobile'
declare const __VERSION__ = '1.0.0'
