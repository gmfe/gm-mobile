import { ChangeEvent, CSSProperties, FormEvent } from 'react'
import { BaseEventOrig } from '@tarojs/components'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

interface InputMaxLengthProps extends InputPasswordProps {
  maxLength: number
}

type InputPasswordProps = Omit<InputProps, 'onInput' | 'value' | 'onChange'> &
  Partial<Pick<InputProps, 'value' | 'onChange'>>

interface InputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isForm?: boolean
  focus?: boolean
  /** 注意部分小程序特有 */
  type?: 'text' | 'password' | 'number' | 'idcard' | 'digit' | 'search'
  placeholder?: string
  disabled?: boolean

  /** 小程序特有 */
  autoFocus?: boolean
  /** 小程序特有 */
  onConfirm?: (e: FormEvent<HTMLFormElement>) => void
  /** 小程序特有 */
  adjustPosition?: boolean

  /** 小程序特有 */
  onInput?: (e: BaseEventOrig<TaroInputProps.inputEventDetail>) => void
  /** 小程序特有 */
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  /** 小程序特有 */
  password?: boolean

  className?: string
  style?: CSSProperties
}

export type { InputProps, InputMaxLengthProps, InputPasswordProps }
