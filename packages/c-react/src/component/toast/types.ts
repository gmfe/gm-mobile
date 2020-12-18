import { HTMLAttributes, ReactNode } from 'react'

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** 在组件上没意义，单纯给静态方法调用参考 */
  time?: number
  type?: 'success' | 'warning' | 'loading'
}

type Options =
  | string
  | {
      children?: ReactNode | string
      type?: 'success' | 'warning' | 'loading'
      time?: number
    }

interface ToastStaticsTypes {
  clear: () => void
  _tip: (options?: Options, type?: 'success' | 'warning' | 'loading') => void
  tip: (options?: Options) => void
  success: (options?: Options) => void
  warning: (options?: Options) => void
  loading: (options?: Options) => void
}

export type { ToastProps, ToastStaticsTypes }
