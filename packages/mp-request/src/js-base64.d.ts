/**
 * js-base64 类型声明
 *
 * 仓库 yarn.lock 中暂未收录 js-base64（依赖已声明在 packages/mp-request/package.json），
 * 为避免 TS2307，这里补充最小类型声明。
 */
declare module 'js-base64' {
  /** base64 -> utf-8 字符串 */
  export function decode(input: string): string
  /** utf-8 字符串 -> base64 */
  export function encode(input: string): string
}
