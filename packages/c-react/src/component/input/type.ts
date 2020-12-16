import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
interface InputMaxLengthProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  maxLength: number
}

export type { InputProps, InputMaxLengthProps }
