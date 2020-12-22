import { ChangeEvent, CSSProperties } from 'react'

interface BaseTextareaProps {
  value: string
  placeholder?: string
  /** web独有 */
  rows?: number
  disabled?: boolean
  maxLength?: number
  /** 小程序独有 */
  autoHeight?: boolean
  /** 小程序 onInput => onChange */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  /** 仅用在小程序 */
  onInput?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  style?: CSSProperties
}

interface TextareaProps extends Omit<BaseTextareaProps, 'onInput'> {
  isForm?: boolean
}

export type { BaseTextareaProps, TextareaProps }
