import { HTMLAttributes } from 'react'

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  type: 'loading' | 'error' | 'empty'
  tip?: string
  /** type === error 有效 */
  onReload?: () => void
}

export type { StatusProps }
