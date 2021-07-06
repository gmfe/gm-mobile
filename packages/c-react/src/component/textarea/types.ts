import { ChangeEvent, CSSProperties, LegacyRef, Ref, RefObject } from 'react'

interface BaseTextareaProps {
  value?: string
  placeholder?: string
  /** web独有 */
  rows?: number
  disabled?: boolean
  maxLength?: number
  /** 小程序独有 */
  autoHeight?: boolean
  /** 小程序 onInput => onChange */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  style?: CSSProperties
  childRef?: RefObject<HTMLTextAreaElement>
}

interface TextareaProps extends BaseTextareaProps {
  isForm?: boolean
}

export type { BaseTextareaProps, TextareaProps }
