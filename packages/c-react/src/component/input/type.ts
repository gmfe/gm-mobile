import { InputHTMLAttributes } from 'react'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

// web Input
interface WInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isForm?: boolean
}
// 小程序 Input
type TInputProps = TaroInputProps & WInputProps

interface InputMaxLengthProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
}

type InputPasswordProps = WInputProps

type InputProps = WInputProps | TInputProps

export type {
  InputProps,
  InputMaxLengthProps,
  TInputProps,
  WInputProps,
  InputPasswordProps,
}
