/** cookie */
declare module 'weapp-cookie' {
  export function initDomain(domain: string): void
  export function get(key: string, domain: string): any
  export function set(key: string, value: string, options: any): void
  export function remove(key: string, domain: string): void
}
