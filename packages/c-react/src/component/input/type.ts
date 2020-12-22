import { ChangeEvent, CSSProperties, FormEvent } from 'react'
import { BaseEventOrig } from '@tarojs/components'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

interface InputMaxLengthProps extends Omit<InputProps, 'onInput'> {
  maxLength: number
}

type InputPasswordProps = Omit<InputProps, 'onInput'>

interface InputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isForm?: boolean
  className?: string
  focus?: boolean
  type?: 'text' | 'password' | 'number' | 'idcard' | 'digit' | 'search'
  placeholder?: string
  disabled?: boolean
  style?: CSSProperties
  autoFocus?: boolean
  onConfirm?: (e: FormEvent<HTMLFormElement>) => void
  adjustPosition?: boolean

  /* 小程序特有 */
  onInput?: (e: BaseEventOrig<TaroInputProps.inputEventDetail>) => void
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  password?: boolean
}

export type { InputProps, InputMaxLengthProps, InputPasswordProps }
