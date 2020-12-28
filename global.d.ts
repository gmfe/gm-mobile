/**
 * 图片
 */
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'

/** cookie */
declare module 'weapp-cookie'

/** 其它需要后续添加 */
interface Window {
  __NAME__: string
}

declare const __NAME__ = 'mobile'
