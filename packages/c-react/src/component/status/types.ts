import { HTMLAttributes } from 'react'

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  type: 'loading' | 'error' | 'empty'
  tip?: string
  onReload?: () => void // type === error 有效
}

export type { StatusProps }
