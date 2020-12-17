import { ChangeEvent } from 'react'
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
  type?: 'text' | 'password'
  placeholderClass?: string
  placeholder?: string
  disabled?: boolean
}

export type { InputProps, InputMaxLengthProps, InputPasswordProps }
