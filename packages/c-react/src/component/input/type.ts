import { ChangeEvent, CSSProperties } from 'react'
import { BaseEventOrig } from '@tarojs/components'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

interface InputMaxLengthProps extends Omit<InputProps, 'onInput'> {
  maxLength: number
}

type InputPasswordProps = Omit<InputProps, 'onInput'>

type InputProps = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onInput?: (e: BaseEventOrig<TaroInputProps.inputEventDetail>) => void
  isForm?: boolean
  className?: string
  focus?: boolean
  type?: 'text' | 'password' | 'number'
  placeholderClass?: string
  placeholder?: string
  disabled?: boolean
  style?: CSSProperties
  password?: boolean
}

export type { InputProps, InputMaxLengthProps, InputPasswordProps }
