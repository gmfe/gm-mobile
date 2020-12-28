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
declare module 'weapp-cookie' {
  export function initDomain(domain: string): void
  export function get(key: string, domain: string): any
  export function set(key: string, value: string, options: any): void
  export function remove(key: string, domain: string): void
}

/** 其它需要后续添加 */
interface Window {
  __NAME__: string
}

declare const __NAME__ = 'mobile'
