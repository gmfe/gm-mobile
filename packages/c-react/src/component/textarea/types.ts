import { ChangeEvent, CSSProperties } from 'react'
// import { BaseEventOrig } from '@tarojs/components'
// import { TextareaProps as TaroTextareaProps } from '@tarojs/components/types/Textarea'

interface BaseTextareaProps {
  value: string
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  /** 小程序独有 */
  // onInput?: (e: BaseEventOrig<TaroTextareaProps.onInputEventDetail>) => void
  /** 小程序独有 */
  autoHeight?: boolean
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

interface TextareaProps extends BaseTextareaProps {
  maxLength?: number
  isForm?: boolean
}

export type { BaseTextareaProps, TextareaProps }
